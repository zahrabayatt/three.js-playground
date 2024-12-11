import "./App.css";
import ZustandHomeLand from "./components/ZustandHomeLand";

function App() {
  return (
    <div>
      <ZustandHomeLand />
    </div>
  );
}

export default App;

// react-three/fiber: https://www.npmjs.com/package/@react-three/fiber
// react-three/drei: https://www.npmjs.com/package/@react-three/drei
// react-three/postprocessing: https://www.npmjs.com/package/@react-three/postprocessing

// `@react-three/fiber` and `@react-three/drei` are libraries in the React ecosystem specifically designed to work with 3D rendering and animations using Three.js. They simplify and streamline the process of integrating Three.js with React applications.

// ---

// ### 1. **`@react-three/fiber`**
// `@react-three/fiber` is a React renderer for Three.js. It abstracts the complexities of Three.js by allowing you to use JSX to define 3D scenes. This makes working with Three.js more intuitive and declarative, aligning with React's principles.

// #### **Key Benefits:**
// - **Declarative Syntax**: Instead of imperatively creating and managing scenes, cameras, lights, and meshes with JavaScript, you can define them as JSX components.
// - **Reactivity**: Leverages React's state and props for managing 3D scenes dynamically.
// - **Seamless Integration**: Works naturally with React hooks and state management libraries.
// - **Performance**: Optimized for React's reconciler to manage updates efficiently.

// #### **Example: Without vs. With Fiber**
// **Without Fiber (Three.js):**
// ```javascript
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// camera.position.z = 5;

// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// }
// animate();
// ```

// **With Fiber:**
// ```jsx
// import { Canvas } from '@react-three/fiber';

// function Scene() {
//   return (
//     <mesh rotation={[0, 0, 0]}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshBasicMaterial color="green" />
//     </mesh>
//   );
// }

// function App() {
//   return (
//     <Canvas>
//       <Scene />
//     </Canvas>
//   );
// }
// ```

// ---

// ### 2. **`@react-three/drei`**
// `@react-three/drei` is a utility library that provides pre-built helpers, components, and tools for common Three.js tasks. It enhances `@react-three/fiber` by offering higher-level abstractions and features out of the box.

// #### **Key Features:**
// - **Pre-built Components**: Includes common objects like cameras, lights, environment maps, and controls (e.g., `OrbitControls`, `PerspectiveCamera`).
// - **Convenience Utilities**: Simplifies tasks such as adding textures, loaders, and animations.
// - **Community-Driven**: Continuously updated with new utilities and components based on community needs.

// #### **Example: Simplifying Camera and Controls**
// **Without Drei:**
// ```jsx
// import { Canvas, useThree } from '@react-three/fiber';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { useEffect } from 'react';

// function Controls() {
//   const { camera, gl } = useThree();
//   useEffect(() => {
//     const controls = new OrbitControls(camera, gl.domElement);
//     return () => controls.dispose();
//   }, [camera, gl]);
//   return null;
// }

// function App() {
//   return (
//     <Canvas>
//       <Controls />
//       {/* Other scene components */}
//     </Canvas>
//   );
// }
// ```

// **With Drei:**
// ```jsx
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';

// function App() {
//   return (
//     <Canvas>
//       <OrbitControls />
//       {/* Other scene components */}
//     </Canvas>
//   );
// }
// ```

// ---

// ### **Why Use Them?**
// - **Efficiency**: Dramatically reduces boilerplate code.
// - **Declarative Approach**: Simplifies development with React-style JSX components.
// - **Reusable Components**: With `drei`, you don’t need to reinvent the wheel for common tasks.
// - **Community Support**: Both libraries are well-maintained and widely used, ensuring long-term stability and compatibility.

// By using `@react-three/fiber` and `@react-three/drei`, you can focus on building your 3D scenes and interactions rather than worrying about the low-level details of Three.js.

// -------------

// `@react-three/postprocessing` is a library that provides an easy-to-use React wrapper for post-processing effects in Three.js. Post-processing in 3D rendering refers to a series of effects applied to the rendered scene after the main rendering pass. These effects can include things like bloom, depth of field, motion blur, and other visual enhancements that are applied to the entire scene or specific elements.

// This library simplifies the process of integrating post-processing effects into your React-based Three.js scenes, using a declarative syntax that fits with React's component model. It leverages Three.js's powerful `postprocessing` package, making it easier to manage effects like these in a React-friendly way.

// ---

// ### **Key Features:**
// 1. **Declarative Syntax**: It provides React components that can be used to set up and control post-processing effects declaratively, using React's state and props system.
// 2. **Built on Three.js `postprocessing`**: The library is built on top of the `postprocessing` package, which is a popular Three.js utility for applying various effects to the rendered scene.
// 3. **Wide Range of Effects**: It supports several common post-processing effects, such as:
//    - **Bloom**: Makes bright areas of the scene glow.
//    - **Depth of Field**: Blurs parts of the scene based on their distance from the camera.
//    - **Film Grain**: Adds a noise texture to give the scene a more cinematic feel.
//    - **Motion Blur**: Creates a blur effect for moving objects, simulating fast motion.
//    - **Sobel Edge Detection**: Highlights edges in the scene.
// 4. **Easy Integration**: Since it uses React, it integrates naturally with your other Three.js and React Three Fiber setup.

// ---

// ### **Example: Using `@react-three/postprocessing`**
// Here’s an example of how you can use post-processing effects in a React Three Fiber scene:

// ```jsx
// import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
// import { OrbitControls } from '@react-three/drei';

// function Scene() {
//   return (
//     <mesh>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshBasicMaterial color="orange" />
//     </mesh>
//   );
// }

// function App() {
//   return (
//     <Canvas>
//       <Scene />
//       <OrbitControls />
//       <EffectComposer>
//         <Bloom intensity={1.5} radius={0.4} threshold={0.8} />
//         <DepthOfField focusDistance={0.02} focalLength={0.1} bokehScale={2} />
//       </EffectComposer>
//     </Canvas>
//   );
// }

// export default App;
// ```

// ### **In this example:**
// - **`EffectComposer`**: This is the root component for post-processing effects. It is used to wrap all the effects you want to apply to the scene.
// - **`Bloom`**: Adds a bloom effect to the scene, which makes bright areas of the scene glow.
// - **`DepthOfField`**: Applies a depth of field effect, which blurs parts of the scene depending on their distance from the camera.
// - **`OrbitControls`**: Provides camera control to allow interaction with the scene.

// ### **Why Use `@react-three/postprocessing`?**
// - **Enhanced Visuals**: You can add cinematic effects such as bloom, depth of field, and motion blur to improve the look and feel of your 3D scenes.
// - **Easy Integration with React**: It integrates seamlessly with React Three Fiber, making it easy to set up and use in your React projects.
// - **Declarative Effects Management**: You can manage post-processing effects like any other React component, taking advantage of React’s state and lifecycle management.

// This library is especially useful when you want to improve the aesthetics and realism of your 3D scenes with little effort, all while maintaining a React-friendly workflow.
