import { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'; // allows scene
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'; // useGLTF is a hook that allows import of 3d models
import CanvasLoader from '../Loader';

const Computers = () => {
  const computer = useGLTF('./desktop_pc/scene.gltf'); // import 3d model

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight 
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
      />
      <primitive 
        object={computer.scene}
        scale={1.25}
        position={[0, -7.25, -4]}
        rotation={[-0.01, -0.2, -0.1]}
        />
    </mesh>
  )
}

const ComputersCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{position: [20, 10, 20], fov: 25, near: 0.1 }}
      gl={{ preserveDrawingBuffer: true }}> 
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2} />
        <Computers />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;