import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Plane, useAspect, useTexture } from "@react-three/drei";
import bgUrl from "../../resources/bg.jpg";
import starsUrl from "../../resources/stars.png";
import groundUrl from "../../resources/ground.png";
import bearUrl from "../../resources/bear.png";
import leaves1Url from "../../resources/leaves1.png";
import leaves2Url from "../../resources/leaves2.png";
import { Group } from "three";
import {
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { lerp } from "three/src/math/MathUtils.js";

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
      scaleFactor: 1.82,
      x: 0,
      y: 0,
      z: -4,
    },
    {
      texture: textures[1],
      scale: scaleW,
      scaleFactor: 1.7,
      x: 0,
      y: -0.1,
      z: -3.5,
    },
    {
      texture: textures[2],
      scale: scaleW,
      scaleFactor: 1.4,
      x: 0,
      y: 0,
      z: -1,
    },
    {
      texture: textures[3],
      scale: scaleN,
      scaleFactor: 1,
      x: -1.6,
      y: -1.2,
      z: -0.8,
    },
    {
      texture: textures[4],
      scale: scaleW,
      scaleFactor: 1,
      x: 0,
      y: 0,
      z: 0,
    },
    {
      texture: textures[5],
      scale: scaleW,
      scaleFactor: 1,
      x: 0,
      y: 0,
      z: 0.5,
    },
  ];

  useFrame(({ pointer, viewport }) => {
    const group = groupRef.current;
    if (!group) return;

    group.children.forEach((layer, index) => {
      const speed = 0.1 + index * 0.05; // Adjust speed for each layer
      let xOffset = pointer.x * speed; // Horizontal movement based on pointer.x
      const rotationFactor = 0.1; // Adjust for desired tilting effect
      const zOffsetFactor = 0.02; // Adjust for how tightly layers "stick" in the z-axis

      // Constrain xOffset within boundaries
      const maxOffset = viewport.width / 2; // Adjust as needed based on your scene
      xOffset = Math.max(-maxOffset, Math.min(maxOffset, xOffset));

      // Smoothly interpolate the x position with lerp
      layer.position.x = lerp(
        layer.position.x,
        layers[index].x + xOffset,
        0.05
      ); // 0.1 is the lerp factor for smoothness

      // Smoothly interpolate the rotation
      layer.rotation.y = lerp(
        layer.rotation.y,
        -pointer.x * rotationFactor,
        0.05
      );

      // Adjust z-position with a similar interpolation
      const zCompensation = Math.abs(pointer.x * zOffsetFactor * (index + 1));
      layer.position.z = lerp(
        layer.position.z,
        layers[index].z - zCompensation,
        0.05
      );
    });
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, i) => (
        <Plane
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
        </Plane>
      ))}
    </group>
  );
};

const Effects: React.FC = () => {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <DepthOfField
        target={[0, 0, 30]}
        bokehScale={8}
        focalLength={0.1}
        width={1024}
      />
      <Vignette />
    </EffectComposer>
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
      <Effects />
    </Canvas>
  );
};

export default Scene;
