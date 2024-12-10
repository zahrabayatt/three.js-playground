import { useEffect, useRef } from "react";
import WebGL from "three/examples/jsm/capabilities/WebGL.js";
import * as THREE from "three";

const SimpleLineScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!WebGL.isWebGL2Available()) {
      // Display a warning message if WebGL2 is not available
      const warning = WebGL.getWebGL2ErrorMessage();
      containerRef.current.appendChild(warning);
      return;
    }

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    //create a blue LineBasicMaterial
    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);
    scene.add(line);

    renderer.render(scene, camera);

    // Resize Handling
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default SimpleLineScene;
