import { Suspense, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { SkeletonUtils } from "three-stdlib";

const MODEL_URL = "/models/robot.glb";

function Robot() {
  const { scene, animations } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const baseY = useRef(0);

  const clonedScene = useMemo(() => {
    const c = SkeletonUtils.clone(scene) as THREE.Group;
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 4.3 / maxDim;

    c.scale.setScalar(scale);
    c.position.x = -center.x * scale;
    c.position.y = -center.y * scale + 1.2;
    c.position.z = -center.z * scale;

    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.5;
          mat.metalness = 0.3;
          mat.envMapIntensity = 1.2;

          if (mat.name.toLowerCase().includes("glass") || mat.name.toLowerCase().includes("trans")) {
            mat.transparent = true;
            mat.opacity = 0.7;
          }
          if (mat.name.toLowerCase().includes("emit") || mat.name.toLowerCase().includes("glow")) {
            mat.emissive = mat.color;
            mat.emissiveIntensity = 2.0;
          }
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    return c;
  }, [scene]);

  useEffect(() => {
    baseY.current = clonedScene.position.y;
  }, [clonedScene]);

  useEffect(() => {
    if (animations && animations.length > 0) {
      const mixer = new THREE.AnimationMixer(clonedScene);
      const clip = animations[0].clone();
      clip.tracks = clip.tracks.filter((track) => !track.name.endsWith(".position"));
      const action = mixer.clipAction(clip);
      action.play();
      mixerRef.current = mixer;
    }
  }, [clonedScene, animations]);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = 0;
    group.current.position.y = baseY.current + Math.sin(t * 0.8) * 0.05;
    mixerRef.current?.update(delta);
  });

  return (
    <group ref={group}>
      <primitive object={clonedScene} />
    </group>
  );
}

function Particles() {
  const count = 60;
  const meshRef = useRef<THREE.Points>(null);

  const [data] = useState(() => {
    const pos = new Float32Array(count * 3);
    const vel: { vy: number; phase: number }[] = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
      vel.push({ vy: 0.003 + Math.random() * 0.005, phase: Math.random() * Math.PI * 2 });
    }
    return { positions: pos, velocities: vel };
  });

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.elapsedTime;
    const posAttr = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < data.velocities.length; i++) {
      posAttr.array[i * 3 + 1] += data.velocities[i].vy;
      posAttr.array[i * 3] += Math.sin(t + data.velocities[i].phase) * 0.002;
      if (posAttr.array[i * 3 + 1] > 8) {
        posAttr.array[i * 3 + 1] = 0;
        posAttr.array[i * 3] = (Math.random() - 0.5) * 16;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={0xffd100}
        size={0.07}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function PlatformRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring1Ref.current) {
      (ring1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 2) * 0.15;
      ring1Ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.02);
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.2, 1.4, 64]} />
        <meshBasicMaterial color={0xffd100} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[1.6, 1.65, 64]} />
        <meshBasicMaterial color={0x003da5} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

function CameraRig() {
  useFrame(({ camera }) => {
    camera.position.x = 0;
    camera.lookAt(0, 1.5, 0);
  });
  return null;
}

function LoadingFallback() {
  return (
    <mesh position={[0, 1.5, 0]}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial
        color={0x003da5}
        metalness={0.6}
        roughness={0.3}
        emissive={0x001a4d}
        emissiveIntensity={0.4}
        wireframe
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <CameraRig />
      <ambientLight color={0x3a4a6a} intensity={1.5} />
      <directionalLight color={0xffffff} intensity={2.0} position={[0, 2, 5]} />
      <directionalLight
        color={0x4a90d9}
        intensity={1.2}
        position={[3, 6, 4]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight color={0x2d7ff9} intensity={0.8} position={[-4, 3, -3]} />
      <pointLight color={0xffd100} intensity={0.4} distance={15} position={[0, 1, 3]} />

      <fog attach="fog" args={[0x0a0e1a, 0, 60]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[40, 40, 40, 40]} />
        <meshStandardMaterial
          color={0x0d1420}
          metalness={0.8}
          roughness={0.4}
          emissive={0x003da5}
          emissiveIntensity={0.05}
        />
      </mesh>

      <Suspense fallback={<LoadingFallback />}>
        <Robot />
      </Suspense>

      <Particles />
      <PlatformRings />
    </>
  );
}

interface Robot3DProps {
  className?: string;
}

export default function Robot3D({ className = "" }: Robot3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 2, 4.4], fov: 42, near: 0.1, far: 200 }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_URL);
