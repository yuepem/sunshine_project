// Sphere.js
import React from 'react';
import * as THREE from 'three';

function Sphere({position}) {
  const geometry = new THREE.SphereGeometry(0.3, 32, 15);
  const material = new THREE.MeshBasicMaterial({ color: 0xFFC47E });
  const sphere = new THREE.Mesh(geometry, material);


  return (
    <mesh position={[position.x, position.y, position.z]}>
      <primitive object={sphere} />
    </mesh>
  );
}

export default Sphere;