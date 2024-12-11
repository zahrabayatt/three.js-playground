import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import bgUrl from "../../resources/bg.jpg";
import starsUrl from "../../resources/stars.png";
import groundUrl from "../../resources/ground.png";
import bearUrl from "../../resources/bear.png";
import leaves1Url from "../../resources/leaves1.png";
import leaves2Url from "../../resources/leaves2.png";
import { Group } from "three";

const LayeredTextures: React.FC = () => {
  const groupRef = useRef<Group>(null);

  const textures = useTexture([
    bgUrl,
    starsUrl,
    groundUrl,
    bearUrl,
    leaves1Url,
    leaves2Url,
  ]);

  const scaleN = useAspect(1600, 1000, 1.05);
  const scaleW = useAspect(2200, 1000, 1.05);

  const layers = [
    {
      texture: textures[0],
      scale: scaleW,
      scaleFactor: 1.1,
      x: 0,
      y: -0.5,
      z: 0,
    },
    {
      texture: textures[1],
      scale: scaleW,
      scaleFactor: 1,
      x: 0,
      y: -0.3,
      z: 0.1,
    },
    { texture: textures[2], scale: scaleW, scaleFactor: 1, x: 0, y: 0, z: 0.2 },
    {
      texture: textures[3],
      scale: scaleN,
      scaleFactor: 0.7,
      x: -2,
      y: -0.9,
      z: 0.3,
    },
    {
      texture: textures[4],
      scale: scaleW,
      scaleFactor: 1,
      x: 0,
      y: 0,
      z: 0.4,
    },
    {
      texture: textures[5],
      scale: scaleW,
      scaleFactor: 1,
      x: 0,
      y: 0,
      z: 0.49,
    },
  ];

  useFrame(({ pointer }) => {
    const group = groupRef.current;
    if (!group) return;

    // Iterate through layers and move them with different speeds
    group.children.forEach((layer, index) => {
      const speed = 0.1 + index * 0.05; // Adjust speed for each layer, deeper layers move slower
      const xOffset = pointer.x * speed; // Calculate horizontal offset based on pointer.x

      // Apply the offset to each layer's position on the X-axis
      layer.position.x = xOffset;
    });
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, i) => (
        <mesh
          key={i}
          scale={
            layer.scale.map((v) => v * layer.scaleFactor) as [
              number,
              number,
              number
            ]
          }
          position={[layer.x, layer.y, layer.z]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial map={layer.texture} transparent />
        </mesh>
      ))}
    </group>
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
