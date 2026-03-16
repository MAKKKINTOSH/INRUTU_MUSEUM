import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { autoScaleTo, centerAndGroundChild } from './utils';

export function createViewer(elements, gltfCache) {
  const { viewer, viewerTitle, viewerClose, viewerCanvas, controls } = elements;

  let isOpen = false;
  let vScene = null;
  let vCamera = null;
  let vRenderer = null;
  let vControls = null;
  let vPivot = null;

  function initIfNeeded() {
    if (vScene) return;

    vScene = new THREE.Scene();
    vScene.background = new THREE.Color(0xf6f8fb);

    vCamera = new THREE.PerspectiveCamera(50, 1, 0.01, 200);
    vCamera.position.set(0, 0.8, 2.6);

    vRenderer = new THREE.WebGLRenderer({ canvas: viewerCanvas, antialias: true, alpha: false });
    vRenderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    vRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    vRenderer.toneMappingExposure = 1.05;

    vScene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const vDir = new THREE.DirectionalLight(0xffffff, 1.0);
    vDir.position.set(2, 4, 3);
    vScene.add(vDir);

    vControls = new OrbitControls(vCamera, viewerCanvas);
    vControls.enableDamping = true;
    vControls.dampingFactor = 0.08;
  }

  function fitCameraToObject(offset = 1.35) {
    vPivot.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(vPivot);

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxSize = Math.max(size.x, size.y, size.z);
    const fov = vCamera.fov * (Math.PI / 180);
    const camZ = Math.abs((maxSize / 2) / Math.tan(fov / 2)) * offset;

    vCamera.position.set(center.x, center.y, center.z + camZ);
    vCamera.near = camZ / 100;
    vCamera.far = camZ * 100;
    vCamera.updateProjectionMatrix();

    vControls.target.copy(center);
    vControls.update();
  }

  function open(exhibit) {
    if (!viewer || !viewerTitle || !viewerCanvas) return;

    initIfNeeded();
    isOpen = true;
    try {
      controls.unlock();
    } catch (e) {}

    viewer.style.display = 'grid';
    viewerTitle.textContent = exhibit.data.title;

    if (vPivot) {
      vScene.remove(vPivot);
      vPivot = null;
    }

    const gltf = gltfCache.get(exhibit.srcPath);
    vPivot = new THREE.Group();
    const m = gltf.scene.clone(true);
    m.scale.setScalar(autoScaleTo(m, 1.9));
    centerAndGroundChild(m);
    vPivot.add(m);
    vScene.add(vPivot);

    fitCameraToObject(1.35);
    resize();
  }

  function close() {
    isOpen = false;
    if (viewer) viewer.style.display = 'none';
  }

  function resize() {
    if (!isOpen || !vRenderer || !vCamera || !viewerCanvas) return;
    const rect = viewerCanvas.getBoundingClientRect();
    const cw = Math.max(1, Math.floor(rect.width));
    const ch = Math.max(1, Math.floor(rect.height));
    vCamera.aspect = cw / ch;
    vCamera.updateProjectionMatrix();
    vRenderer.setSize(cw, ch, false);
  }

  function render() {
    if (!isOpen || !vRenderer || !vScene || !vCamera || !vControls) return;
    vControls.update();
    vRenderer.render(vScene, vCamera);
  }

  function destroy() {
    try {
      close();
    } catch (e) {}
    try {
      vControls?.dispose?.();
    } catch (e) {}
    try {
      vRenderer?.dispose?.();
    } catch (e) {}
  }

  if (viewerClose) {
    viewerClose.addEventListener('click', close);
  }

  return {
    open,
    close,
    resize,
    render,
    destroy,
    isOpen: () => isOpen,
  };
}

