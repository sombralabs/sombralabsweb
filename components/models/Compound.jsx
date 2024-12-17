import React, { useRef } from "react";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { Color } from "three";

export function CompoundModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/Compound.glb");

  return (
    <group scale={5} ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Compound002.geometry}
          material={materials["Website  Glass Material"]}
          scale={0.189}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["3D_S001"].geometry}
          material={materials["S Black"]}
          position={[0.015, 0.017, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.256}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/Compound.glb");
