import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export function createMovement({ camera, domElement, playerHeight, roomSize, onE, onEsc, isBlocked }) {
  const controls = new PointerLockControls(camera, domElement);

  const keys = { w: false, a: false, s: false, d: false, shift: false };

  function onKeyDown(e) {
    if (e.code === 'KeyW') keys.w = true;
    if (e.code === 'KeyA') keys.a = true;
    if (e.code === 'KeyS') keys.s = true;
    if (e.code === 'KeyD') keys.d = true;
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keys.shift = true;
    if (e.code === 'KeyE') onE?.();
    if (e.code === 'Escape') onEsc?.();
  }

  function onKeyUp(e) {
    if (e.code === 'KeyW') keys.w = false;
    if (e.code === 'KeyA') keys.a = false;
    if (e.code === 'KeyS') keys.s = false;
    if (e.code === 'KeyD') keys.d = false;
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') keys.shift = false;
  }

  function update(dt) {
    if (!controls.isLocked) return;
    if (isBlocked?.()) return;

    const speed = keys.shift ? 5.2 : 2.9;
    const vx = (keys.d ? 1 : 0) - (keys.a ? 1 : 0);
    const vz = (keys.w ? 1 : 0) - (keys.s ? 1 : 0);

    const dirv = new THREE.Vector3();
    controls.getDirection(dirv);
    dirv.y = 0;
    dirv.normalize();

    const right = new THREE.Vector3().crossVectors(dirv, new THREE.Vector3(0, 1, 0)).normalize();

    const move = new THREE.Vector3();
    move.addScaledVector(dirv, vz);
    move.addScaledVector(right, vx);
    if (move.lengthSq() > 0) move.normalize();

    controls.object.position.addScaledVector(move, speed * dt);
    controls.object.position.y = playerHeight;

    const half = roomSize / 2 - 1.2;
    controls.object.position.x = THREE.MathUtils.clamp(controls.object.position.x, -half, half);
    controls.object.position.z = THREE.MathUtils.clamp(controls.object.position.z, -half, half);
  }

  function attach() {
    try {
      controls.connect?.();
    } catch (e) {}
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    domElement.addEventListener('click', () => {
      if (isBlocked?.()) return;
      try {
        controls.lock();
      } catch (e) {}
    });
  }

  function detach() {
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);
    try {
      controls.disconnect?.();
    } catch (e) {}
  }

  return { controls, keys, update, attach, detach };
}

