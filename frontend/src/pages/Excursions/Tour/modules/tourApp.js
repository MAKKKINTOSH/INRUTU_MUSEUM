import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import {
  BORDER_MARGIN,
  EXHIBITS,
  FLOAT_AMPL,
  FLOAT_SPEED,
  FOCUS_DISTANCE,
  GRID_STEP,
  MIN_GAP,
  PLAYER_HEIGHT,
  ROOM_HEIGHT,
  ROOM_SIZE,
  SHOW_DISTANCE,
} from './config';
import { createMovement } from './movement';
import { createViewer } from './viewer';
import { autoScaleTo, centerAndGroundChild, computeRadiusAndLabel, worldToScreen } from './utils';

export function createTourApp(elements) {
  const {
    root,
    hud,
    loading,
    label,
    labelTitle,
    labelText,
    actionHint,
    viewer,
    viewerTitle,
    viewerClose,
    viewerCanvas,
  } = elements;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe7eef7);

  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 220);
  camera.position.set(0, PLAYER_HEIGHT, ROOM_SIZE * 0.35);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0xe7eef7, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.inset = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  root.appendChild(renderer.domElement);
  renderer.domElement.style.zIndex = '0';

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  scene.add(new THREE.HemisphereLight(0xffffff, 0xbfd4ff, 0.75));
  const dir = new THREE.DirectionalLight(0xffffff, 1.05);
  dir.position.set(10, 16, 9);
  scene.add(dir);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_SIZE * 3, ROOM_SIZE * 3),
    new THREE.MeshStandardMaterial({ color: 0xf3f5f8, roughness: 0.95 })
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const ceiling = new THREE.Mesh(
    new THREE.PlaneGeometry(ROOM_SIZE, ROOM_SIZE),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1.0 })
  );
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = ROOM_HEIGHT;
  scene.add(ceiling);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1.0 });
  function buildRoom(cx, cz, size, height) {
    const t = 0.35;
    const half = size / 2;
    const mk = (w, h, d, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
      m.position.set(x, y, z);
      scene.add(m);
    };
    mk(size, height, t, cx, height / 2, cz - half);
    mk(size, height, t, cx, height / 2, cz + half);
    mk(t, height, size, cx - half, height / 2, cz);
    mk(t, height, size, cx + half, height / 2, cz);
  }
  buildRoom(0, 0, ROOM_SIZE, ROOM_HEIGHT);

  function addCeilingLight(x, z) {
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.08, 1.2),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 0.4,
        roughness: 1.0,
      })
    );
    panel.position.set(x, ROOM_HEIGHT - 0.15, z);
    scene.add(panel);
  }
  addCeilingLight(-6, -6);
  addCeilingLight(6, -6);
  addCeilingLight(-6, 6);
  addCeilingLight(6, 6);

  const loader = new GLTFLoader();
  // Many Sketchfab/asset-store .glb use meshopt/draco compression.
  // We enable both to avoid "models not showing" with silent parse failures.
  try {
    loader.setMeshoptDecoder(MeshoptDecoder);
  } catch (e) {}
  try {
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(draco);
  } catch (e) {}
  const gltfCache = new Map();
  function getGLTF(path) {
    if (gltfCache.has(path)) return Promise.resolve(gltfCache.get(path));
    return new Promise((resolve, reject) => {
      loader.load(
        path,
        (g) => {
          gltfCache.set(path, g);
          resolve(g);
        },
        undefined,
        (err) => {
          // Surface the failing model URL in console for quick debugging.
          // eslint-disable-next-line no-console
          console.error('[tour] GLB load failed', path, err);
          reject(err);
        }
      );
    });
  }

  const raycaster = new THREE.Raycaster();
  const centerNDC = new THREE.Vector2(0, 0);

  const exhibits = [];
  const colliderToExhibit = new Map();
  const raycastColliders = [];

  function addPedestal(x, z) {
    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.75, 0.95, 0.24, 22),
      new THREE.MeshStandardMaterial({ color: 0xdfe6ef, roughness: 0.9 })
    );
    base.position.set(x, 0.12, z);
    scene.add(base);

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.85, 1.05, 40),
      new THREE.MeshBasicMaterial({ color: 0x7aa7ff, transparent: true, opacity: 0.18, side: THREE.DoubleSide })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, 0.02, z);
    scene.add(ring);
  }

  function makeColliderFromBoxWorld(boxWorld, pivot) {
    const size = new THREE.Vector3();
    boxWorld.getSize(size);
    size.multiplyScalar(1.15);

    const geo = new THREE.BoxGeometry(size.x, size.y, size.z);
    const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.0, depthWrite: false });
    const collider = new THREE.Mesh(geo, mat);

    const center = new THREE.Vector3();
    boxWorld.getCenter(center);
    collider.position.copy(pivot.worldToLocal(center.clone()));

    pivot.add(collider);
    return collider;
  }

  function generateCandidates(roomSize, step, margin) {
    const half = roomSize / 2;
    const min = -half + margin;
    const max = half - margin;

    const pts = [];
    for (let z = min; z <= max; z += step) {
      for (let x = min; x <= max; x += step) {
        pts.push(new THREE.Vector3(x, 1.55, z));
      }
    }

    pts.sort((a, b) => {
      const da = Math.min(Math.abs(a.x - min), Math.abs(a.x - max), Math.abs(a.z - min), Math.abs(a.z - max));
      const db = Math.min(Math.abs(b.x - min), Math.abs(b.x - max), Math.abs(b.z - min), Math.abs(b.z - max));
      return da - db;
    });

    return pts;
  }

  function canPlace(pos, radius, placed) {
    for (const p of placed) {
      const d = pos.distanceTo(p.pos);
      if (d < radius + p.radius + MIN_GAP) return false;
    }
    return true;
  }

  async function placeAll() {
    const candidates = generateCandidates(ROOM_SIZE, GRID_STEP, BORDER_MARGIN);
    const placed = [];

    for (let i = 0; i < EXHIBITS.length; i++) {
      const ex = EXHIBITS[i];
      const gltf = await getGLTF(ex.path);

      const testPivot = new THREE.Group();
      const testModel = gltf.scene.clone(true);
      testModel.scale.setScalar(autoScaleTo(testModel, 1.15));
      centerAndGroundChild(testModel);
      testPivot.add(testModel);
      const { radius } = computeRadiusAndLabel(testPivot);

      let chosen = null;
      for (let c = 0; c < candidates.length; c++) {
        const pos = candidates[c];
        if (canPlace(pos, radius, placed)) {
          chosen = pos;
          candidates.splice(c, 1);
          break;
        }
      }
      if (!chosen) {
        chosen = new THREE.Vector3(
          (Math.random() - 0.5) * (ROOM_SIZE * 0.6),
          1.55,
          (Math.random() - 0.5) * (ROOM_SIZE * 0.6)
        );
      }
      placed.push({ pos: chosen, radius });

      const pivot = new THREE.Group();
      pivot.position.set(chosen.x, 1.55, chosen.z);

      const model = gltf.scene.clone(true);
      model.scale.setScalar(autoScaleTo(model, 1.15));
      centerAndGroundChild(model);
      pivot.add(model);

      scene.add(pivot);
      addPedestal(chosen.x, chosen.z);

      pivot.updateMatrixWorld(true);
      const { box, radius: r2, labelOffsetY } = computeRadiusAndLabel(pivot);
      const collider = makeColliderFromBoxWorld(box, pivot);
      raycastColliders.push(collider);

      const rec = {
        pivot,
        model,
        data: ex,
        baseY: pivot.position.y,
        phase: i * 0.9,
        radius: r2,
        labelOffsetY,
        collider,
        srcPath: ex.path,
      };
      exhibits.push(rec);
      colliderToExhibit.set(collider.uuid, rec);
    }
  }

  let focused = null;
  let viewerApi = null;

  function updateLabelNearest() {
    if (!label || !labelTitle || !labelText) return;

    const camPos = movement.controls.object.position;
    let nearest = null;
    let nearestDist = Infinity;

    for (const ex of exhibits) {
      const d = camPos.distanceTo(ex.pivot.position);
      if (d < nearestDist) {
        nearestDist = d;
        nearest = ex;
      }
    }

    if (nearest && nearestDist <= SHOW_DISTANCE) {
      const p = nearest.pivot.position.clone();
      p.y += nearest.labelOffsetY;

      const rect = root.getBoundingClientRect();
      const s = worldToScreen(p, camera, rect.width, rect.height);
      if (s.z > 1) {
        label.style.display = 'none';
        return;
      }

      label.style.display = 'block';
      labelTitle.textContent = nearest.data.title;
      labelText.textContent = nearest.data.text;
      label.style.left = `${s.x}px`;
      label.style.top = `${s.y}px`;
    } else {
      label.style.display = 'none';
    }
  }

  function fallbackFocus() {
    const camPos = movement.controls.object.position;
    const dirv = new THREE.Vector3();
    movement.controls.getDirection(dirv);
    dirv.y = 0;
    dirv.normalize();

    let best = null;
    let bestScore = Infinity;

    for (const ex of exhibits) {
      const to = ex.pivot.position.clone().sub(camPos);
      const dist = to.length();
      if (dist > FOCUS_DISTANCE) continue;
      to.y = 0;
      to.normalize();

      const angleScore = 1 - THREE.MathUtils.clamp(dirv.dot(to), -1, 1);
      const score = angleScore * 2.2 + dist * 0.25;
      if (score < bestScore) {
        bestScore = score;
        best = ex;
      }
    }
    return best;
  }

  function updateFocus() {
    if (!actionHint) return;

    if (!movement.controls.isLocked || viewerApi?.isOpen?.()) {
      focused = null;
      actionHint.style.display = 'none';
      return;
    }

    raycaster.setFromCamera(centerNDC, camera);
    const hits = raycaster.intersectObjects(raycastColliders, true);

    let ex = null;
    if (hits.length) ex = colliderToExhibit.get(hits[0].object.uuid) || null;
    if (!ex) ex = fallbackFocus();

    if (!ex) {
      focused = null;
      actionHint.style.display = 'none';
      return;
    }

    const d = movement.controls.object.position.distanceTo(ex.pivot.position);
    if (d > FOCUS_DISTANCE) {
      focused = null;
      actionHint.style.display = 'none';
      return;
    }

    focused = ex;
    actionHint.style.display = 'block';
  }

  const movement = createMovement({
    camera,
    domElement: renderer.domElement,
    playerHeight: PLAYER_HEIGHT,
    roomSize: ROOM_SIZE,
    onE: () => {
      if (!focused || viewerApi?.isOpen?.()) return;
      viewerApi?.open?.(focused);
    },
    onEsc: () => {
      if (viewerApi?.isOpen?.()) viewerApi?.close?.();
    },
    isBlocked: () => viewerApi?.isOpen?.(),
  });

  viewerApi = createViewer(
    { viewer, viewerTitle, viewerClose, viewerCanvas, controls: movement.controls },
    gltfCache
  );

  function setHudVisible(isVisible) {
    if (!hud) return;
    hud.style.display = isVisible ? 'block' : 'none';
  }
  movement.controls.addEventListener('lock', () => setHudVisible(false));
  movement.controls.addEventListener('unlock', () => setHudVisible(true));

  let rafId = 0;
  let lastTs = 0;
  let elapsed = 0;

  let lastW = 0;
  let lastH = 0;
  function resize(force = false) {
    const w = Math.max(1, Math.floor(root.clientWidth || root.getBoundingClientRect().width));
    const h = Math.max(1, Math.floor(root.clientHeight || root.getBoundingClientRect().height));
    if (!force && w === lastW && h === lastH) return;
    lastW = w;
    lastH = h;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    if (viewerApi.isOpen()) viewerApi.resize();
  }

  let ro = null;

  function mount() {
    movement.attach();
    scene.add(movement.controls.object);

    resize();
    ro = new ResizeObserver(() => resize());
    ro.observe(root);

    if (loading) loading.style.display = 'grid';

    // Start async loading; render loop begins immediately.
    let loadFailed = false;
    placeAll()
      .then(() => {
        if (loading) loading.style.display = 'none';
      })
      .catch(() => {
        loadFailed = true;
        if (loading) loading.textContent = 'Не удалось загрузить тур. Обновите страницу.';
      });

    lastTs = performance.now();
    elapsed = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      elapsed += dt;
      const t = elapsed;

      // Ensure correct sizing even if initial layout was 0×0.
      resize(false);

      movement.update(dt);

      if (!loadFailed && FLOAT_AMPL > 0) {
        for (const ex of exhibits) {
          ex.pivot.position.y = ex.baseY + Math.sin(t * FLOAT_SPEED + ex.phase) * FLOAT_AMPL;
        }
      }

      if (!loadFailed && exhibits.length) {
        updateLabelNearest();
        updateFocus();
      }

      renderer.render(scene, camera);
      viewerApi.render();
    }
    animate();

    return () => {
      try {
        cancelAnimationFrame(rafId);
      } catch (e) {}
      try {
        ro?.disconnect?.();
      } catch (e) {}
      try {
        movement.detach();
      } catch (e) {}
      try {
        viewerApi.destroy();
      } catch (e) {}
      try {
        renderer.dispose();
      } catch (e) {}
      try {
        if (renderer.domElement?.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      } catch (e) {}
    };
  }

  return { mount };
}

