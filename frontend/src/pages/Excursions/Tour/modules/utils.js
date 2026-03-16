import * as THREE from 'three';

export function autoScaleTo(obj, desired = 1.15) {
  const box = new THREE.Box3().setFromObject(obj);
  const size = new THREE.Vector3();
  box.getSize(size);
  const maxAxis = Math.max(size.x, size.y, size.z);
  if (!isFinite(maxAxis) || maxAxis === 0) return 1;
  return desired / maxAxis;
}

export function centerAndGroundChild(child) {
  child.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(child);
  const center = new THREE.Vector3();
  box.getCenter(center);

  child.position.sub(center);
  child.updateMatrixWorld(true);

  const box2 = new THREE.Box3().setFromObject(child);
  child.position.y -= box2.min.y;
  child.updateMatrixWorld(true);
}

export function computeRadiusAndLabel(pivot) {
  const box = new THREE.Box3().setFromObject(pivot);
  const size = new THREE.Vector3();
  box.getSize(size);
  const radius = Math.max(size.x, size.z) * 0.55;
  const labelOffsetY = size.y * 0.85 + 0.15;
  return { box, size, radius, labelOffsetY };
}

export function worldToScreen(v3, camera, width, height) {
  const v = v3.clone().project(camera);
  return { x: (v.x * 0.5 + 0.5) * width, y: (-v.y * 0.5 + 0.5) * height, z: v.z };
}

