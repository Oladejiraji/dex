import React, { useEffect, useRef } from "react";
import * as Three from "three";

const Panels = ({ position }: { position: Three.Vector3 }) => {
  console.log(position);
  const ref = useRef<any>(null);
  useEffect(() => {
    if (!ref) return;
    // console.log(ref.current.material);
  }, [ref]);
  return (
    <mesh>
      <boxGeometry attach="geometry" args={[7, 5, 0.2]} />
      {/* Left */}
      <meshStandardMaterial attach="material-0" color="#111111" />
      {/* Right */}
      <meshStandardMaterial attach="material-1" color="#111111" />
      {/* Top */}
      <meshStandardMaterial attach="material-2" color="#111111" />
      {/* Bottom */}
      <meshStandardMaterial attach="material-3" color="#111111" />
      {/* Back */}
      <meshStandardMaterial
        attach="material-4"
        color="#111111"
        metalness={0.85}
        roughness={0.1}
      />
      {/* Front */}
      <meshStandardMaterial
        attach="material-5"
        color="#111111"
        metalness={0.85}
        roughness={0.1}
      />
    </mesh>
  );
};

export default Panels;
