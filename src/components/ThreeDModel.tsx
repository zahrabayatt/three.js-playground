import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ThreeDModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Adding a Light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    // Camera Position
    camera.position.set(0, 30, 100);
    camera.lookAt(0, 0, 0); // Focus on the origin

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false; // Disable panning to prevent interference

    // Add a Ground Plane with Texture
    const groundTexture = new THREE.TextureLoader().load(
      "https://threejs.org/examples/textures/terrain/grasslight-big.jpg"
    );
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(100, 100); // Repeat texture for a larger effect

    const groundMaterial = new THREE.MeshStandardMaterial({
      map: groundTexture,
    });
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      groundMaterial
    );
    ground.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    ground.position.y = -1; // Lower the ground slightly
    scene.add(ground);

    // Add a Background Color or Skybox
    scene.background = new THREE.Color(0x87ceeb); // Light blue sky

    // Load the 3D model
    const loader = new GLTFLoader();
    loader.load(
      "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/Horse.glb", // URL to 3D model
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        // Scale, position, and rotate
        model.scale.set(0.1, 0.1, 0.1); // Adjust size
        model.position.set(0, 0, 0); // Start position (right side)

        //Units: The rotation values are in radians, not degrees.
        // To convert degrees to radians: radians = degrees * (Math.PI / 180).
        // Example: 90 degrees = Math.PI / 2 radians.

        model.rotation.y = Math.PI / 2; // Rotate to face right

        // Check for animations in the model
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          const action = mixer.clipAction(gltf.animations[0]); // Play the first animation
          action.play();

          // Animate using the mixer
          const clock = new THREE.Clock();
          const animate = () => {
            const delta = clock.getDelta();
            mixer.update(delta); // Update animation

            // Move the ground texture to simulate motion
            groundTexture.offset.x += 0.05;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
          };
          animate();
        } else {
          console.warn("No animations found in the model!");
        }
      },
      undefined, // onProgress callback (optional)
      (error) => {
        console.error("Error loading 3D model:", error);
      }
    );

    // Resize Handling
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

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

export default ThreeDModel;
