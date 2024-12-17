import React, { useRef } from "react";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { Color } from "three";

export function DiamondModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Diamond.glb");

  return (
    <group scale={5} ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Stelated_Dodecahedron002.geometry}
        material={materials['Website  Glass Material']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['3D_S001'].geometry}
        material={materials['S Black']}
        position={[0.015, 0.017, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={0.256}
      />
    </group>
  );
}

useGLTF.preload("/models/Diamond.glb");
