import React, {useRef} from 'react';
import './App.css';
import { Canvas, useFrame, MeshProps  } from '@react-three/fiber'
import * as THREE from 'three'
import { Stats, OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'

type BoxProps = {
  props: MeshProps;
  wireframe?: boolean;
}

const Box = (boxprops: BoxProps) => {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    ref.current.rotation!.x += 1 * delta
    ref.current.rotation!.y += 0.5 * delta
  })

  return (
    <mesh {...boxprops.props} ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
    </mesh>
  )
}

const Lights = () => {
  const ambientRef = useRef<THREE.AmbientLight>(null!)
  const directionalRef = useRef<THREE.DirectionalLight>(null!)
  const pointRef = useRef<THREE.PointLight>(null!)
  const spotRef = useRef<THREE.SpotLight>(null!)
  
  useControls('Ambient Light', {
    visible: {
      value: false,
      onChange: (v) => {
        ambientRef.current.visible = v
      },
    },
    color: {
      value: 'white',
      onChange: (v) => {
        ambientRef.current.color = new THREE.Color(v)
      },
    },
  });

  useControls('Directional Light', {
    visible: {
      value: true,
      onChange: (v: boolean) => {
        directionalRef.current.visible = v
      },
    },
    position: {
      value: [1,1,1],
      onChange: (v) => {
        directionalRef.current.position.x = v[0]
        directionalRef.current.position.y = v[1]
        directionalRef.current.position.z = v[2]
      },
    },
    color: {
      value: 'white',
      onChange: (v: string) => {
        directionalRef.current.color = new THREE.Color(v)
      },
    },
  });

  useControls('Point Light', {
    visible: {
      value: false,
      onChange: (v) => {
        pointRef.current.visible = v
      },
    },
    position: {
      value: [3,0,0],
      onChange: (v) => {
        pointRef.current.position.x = v[0]
        pointRef.current.position.y = v[1]
        pointRef.current.position.z = v[2]
      },
    },
    color: {
      value: 'white',
      onChange: (v) => {
        pointRef.current.color = new THREE.Color(v)
      },
    },
  })
  
  useControls('Spot Light', {
    visible: {
      value: false,
      onChange: (v) => {
        spotRef.current.visible = v
      },
    },
    position: {
      value: [3,3,3],
      onChange: (v) => {
        spotRef.current.position.x = v[0]
        spotRef.current.position.x = v[1]
        spotRef.current.position.x = v[2]
      },
    },
    color: {
      value: 'white',
      onChange: (v) => {
        spotRef.current.color = new THREE.Color(v)
      },
    },
  })
  
  return (
    <>
      <ambientLight ref={ambientRef} />
      <directionalLight ref={directionalRef} />
      <pointLight ref={pointRef} />
      <spotLight ref={spotRef} />
    </>
  )
}

const App = () => {
  return (
    <div style={{ width: "75vw", height: "75vh" }}>
      <Canvas camera={{ position: [3, 1, 2] }}>
        <Lights />
        <Box props={{position:[-1, 0, 0], name:"meshBasicMaterial",    material: new THREE.MeshBasicMaterial({ color: 'yellow'})}}/>
        <Box props={{position:[ 1, 0, 0], name:"meshNormalMaterial",   material: new THREE.MeshNormalMaterial({ flatShading: true })}}/>
        <Box props={{position:[-1, 2, 0], name:"meshPhongMaterial",    material: new THREE.MeshPhongMaterial({ color: 'lime', flatShading: true })}}/>
        <Box props={{position:[ 1, 2, 0], name:"meshStandardMaterial", material: new THREE.MeshStandardMaterial({ color: 0xff0033, flatShading: true })}}/>
        <OrbitControls target={[2, 2, 0]} />
        <axesHelper args={[5]} />
        <gridHelper />
        <Stats />
      </Canvas>
    </div>
  );
}

export default App;
