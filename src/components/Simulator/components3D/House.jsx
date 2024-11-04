// Cylinder.js
import React from 'react';
import * as THREE from 'three';

function Cylinder() {
  const geometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 5 );
  const material = new THREE.MeshBasicMaterial( {color: 0x4A628A} );
  const cylinder = new THREE.Mesh( geometry, material ); 


  return (
    <mesh position={[0, 0.5, 0]}>
      <primitive object={cylinder} />
    </mesh>
  );
}

export default Cylinder;