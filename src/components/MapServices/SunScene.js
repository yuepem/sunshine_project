import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SunScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 100, 500);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create terrain
    const terrainGeometry = new THREE.PlaneGeometry(1000, 1000, 128, 128);
    const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.8, metalness: 0.2 });
    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.rotation.x = - Math.PI / 2;
    scene.add(terrain);

    // Create sun
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(1, 1, 1).normalize();
    scene.add(sunLight);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    // Update sun's position based on time
    function animate() {
      // Calculate sun's altitude and azimuth based on time (replace with your logic)
      const altitude = Math.PI / 2 - Math.PI * (Date.now() / 86400000) * 0.5; // Example
      const azimuth = Math.PI * 2 * (Date.now() / 86400000); // Example

      // Update sunLight's position
      sunLight.position.set(Math.sin(azimuth) * Math.cos(altitude), Math.sin(altitude), Math.cos(azimuth) * Math.cos(altitude)).normalize();

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      // Cleanup resources when the component unmounts
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default SunScene;