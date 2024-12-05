"use client";

import Panels from "@/components/3d/panels";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as Three from "three";
import React from "react";

const scale = 5;
const NUMBER_OF_CARDS = 15;
const PANEL_OFFSET = scale * 0.2;

const panelArray = Array.from({ length: NUMBER_OF_CARDS }, (_, i) => ({
  id: i + 1,
  position: new Three.Vector3(0, PANEL_OFFSET * i, 0),
}));

const Asc = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        {/* <OrthographicCamera
          makeDefault
          zoom={200}
          position={[0, 10, 10]}
          // position={[0, 0, 0]}
          top={vertical}
          bottom={-vertical}
          left={-horizonal}
          right={horizonal}
          manual
        /> */}
        <OrbitControls enabled={true} />
        {/* <Environment resolution={256} preset="warehouse" /> */}
        <directionalLight position={[0, 10, 50]} intensity={7} />
        {/* <directionalLight position={[-30, 0, 40]} intensity={1} /> */}
        {/* <directionalLight position={[0, 10, 40]} intensity={3} /> */}
        <ambientLight intensity={50} />
        <ScrollControls pages={4} infinite>
          {panelArray.map((panel, _) => (
            <Panels key={panel.id} position={panel.position} />
          ))}
        </ScrollControls>
        <axesHelper scale={[4, 4, 4]} />
      </Canvas>
    </div>
  );
};

export default Asc;
