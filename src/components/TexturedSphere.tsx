import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const HighQualityEarth = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Background Color
    scene.background = new THREE.Color(0x000000);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    // High-Detail Sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64); // More segments for smoothness
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_day_4096.jpg"
    );
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy(); // High-quality filtering

    const material = new THREE.MeshPhongMaterial({
      map: texture,
      shininess: 50,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Camera Position
    camera.position.z = 4;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Resize Handling
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const animate = () => {
      sphere.rotation.y += 0.12; // Slowly rotate the Earth
      renderer.render(scene, camera);
      controls.update();
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      controls.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default HighQualityEarth;
