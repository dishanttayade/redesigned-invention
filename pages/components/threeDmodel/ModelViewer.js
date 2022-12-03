import React, { useRef, useState, Suspense} from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const GltfModel = ({ modelPath, scale = 40, position = [0, 0, 0] }) => {
  const ref = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);
  const [hovered, hover] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.y += 0.003));
  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        scale={hovered ? scale * 1.2 : scale}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      />
    </>
  );
};


// import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import GltfModel from "./gltf";

const ModelViewer = ({ modelPath, scale = 40, position = [0, 0, 0] }) => {
  const image = true;
  return (
          <Canvas className="mt-10 bg-transparent" style={{ height: '850px', width: '60%'}}>
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Suspense fallback={null}>
            <GltfModel modelPath={modelPath} scale={scale} position={position} />
            <OrbitControls />
          </Suspense>
        </Canvas>
  );
};

export default ModelViewer;