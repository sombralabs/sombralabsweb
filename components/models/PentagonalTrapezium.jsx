import React, { useRef, useMemo } from "react";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { Color } from "three";

export function PentagonalModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/PentagonalTrapezium.glb");
  const customMaterialProps = { opacity: 0.9, transparent: true };

  const mergedMaterialProps = useMemo(() => {
    const existingProps =
      materials["1000_F_382534100_LSi5CUii6eDGxyEwNwimcKzrLkx1ItGU"];
    return { ...existingProps, ...customMaterialProps };
  }, [materials]);

  return (
    <group scale={5} ref={group} rotation={[0, 0, 0]} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Pentagonal_Trap002"
          castShadow
          receiveShadow
          geometry={nodes.Pentagonal_Trap002.geometry}
          material={materials["Website  Glass Material"]}
          position={[0, 0.005, -0.009]}
          scale={0.418}
        >
          {/* <MeshTransmissionMaterial
            {...materials["Website  Glass Material"]}
            background={new Color("white")}
          /> */}
        </mesh>
        <mesh
          name="3D_S001"
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

useGLTF.preload("/models/PentagonalTrapezium.glb");
