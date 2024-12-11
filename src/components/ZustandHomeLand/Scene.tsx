import React from "react";
import { Canvas } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import bgUrl from "../../resources/bg.jpg";
import starsUrl from "../../resources/stars.png";
import groundUrl from "../../resources/ground.png";
import bearUrl from "../../resources/bear.png";
import leaves1Url from "../../resources/leaves1.png";
import leaves2Url from "../../resources/leaves2.png";

const LayeredTextures: React.FC = () => {
  const bgTexture = useTexture(bgUrl);
  const starsTexture = useTexture(starsUrl);
  const groundTexture = useTexture(groundUrl);
  const bearTexture = useTexture(bearUrl);
  const leaves1Texture = useTexture(leaves1Url);
  const leaves2Texture = useTexture(leaves2Url);

  const scaleN = useAspect(1600, 1000, 1.05);
  const scaleW = useAspect(2200, 1000, 1.05);

  return (
    <>
      <mesh
        scale={scaleW.map((value) => value * 1.1) as [number, number, number]}
        position={[0, -0.5, 0]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={bgTexture} transparent />
      </mesh>
      <mesh scale={scaleW} position={[0, -0.3, 0.1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={starsTexture} transparent />
      </mesh>
      <mesh scale={scaleW} position={[0, 0, 0.2]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={groundTexture} transparent />
      </mesh>
      <mesh
        scale={scaleN.map((value) => value * 0.7) as [number, number, number]}
        position={[-2, -0.9, 0.3]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={bearTexture} transparent />
      </mesh>
      <mesh scale={scaleW} position={[0, 0, 0.4]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={leaves1Texture} transparent />
      </mesh>
      <mesh scale={scaleW} position={[0, 0, 0.49]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={leaves2Texture} transparent />
      </mesh>
    </>
  );
};

const Scene: React.FC = () => {
  return (
    <Canvas
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "block",
      }}
      resize={{ debounce: { scroll: 50, resize: 50 } }}
    >
      <LayeredTextures />
    </Canvas>
  );
};

export default Scene;
