import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber'; // allows scene
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'; // useGLTF is a hook that allows import of 3d models
import CanvasLoader from '../Loader';

const Computers = () => {
  const computer = useGLTF('./desktop_pc/scene.gltf'); // import 3d model

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <primitive 
        object={computer.scene}/>
    </mesh>
  )
}

const ComputerCanvas = () => {
  return (
    <Canvas
      frameLoop="demand"
      shadows
      camera={{position: [20, 3, 5], fov: 25 }}
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
  )
}

export default Computers;