import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';

const SpinningCube: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!WebGL.isWebGL2Available()) {
        // Display a warning message if WebGL2 is not available
        const warning = WebGL.getWebGL2ErrorMessage();
        containerRef.current.appendChild(warning);
        return;
      }

    // Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Cube
    const geometry = new THREE.BoxGeometry(2, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation Loop
    const animate = () => {
      cube.rotation.x += 0.02;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(animate);

    // Resize Handling
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      renderer.dispose();
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default SpinningCube;

