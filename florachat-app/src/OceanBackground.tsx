import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
precision highp float;
uniform float uTime;
uniform float uWavesAmplitude;
uniform float uWavesSpeed;
uniform float uWavesFrequency;
uniform float uWavesPersistence;
uniform float uWavesLacunarity;
uniform float uWavesIterations;

varying vec3 vNormal;
varying vec3 vWorldPosition;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// Helper function to calculate elevation at any point
float getElevation(float x, float z) {
    vec2 pos = vec2(x, z);
    float elevation = 0.0;
    float amplitude = 1.0;
    float frequency = uWavesFrequency;
    vec2 p = pos.xy;

    for(float i = 0.0; i < uWavesIterations; i++) {
        float noiseValue = snoise(p * frequency + uTime * uWavesSpeed);
        elevation += amplitude * noiseValue;
        amplitude *= uWavesPersistence;
        frequency *= uWavesLacunarity;
    }
    elevation *= uWavesAmplitude;
    return elevation;
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = getElevation(modelPosition.x, modelPosition.z);
    modelPosition.y += elevation;

    // Calculate normal using partial derivatives
    float eps = 0.001;
    vec3 tangent = normalize(vec3(eps, getElevation(modelPosition.x - eps, modelPosition.z) - elevation, 0.0));
    vec3 bitangent = normalize(vec3(0.0, getElevation(modelPosition.x, modelPosition.z - eps) - elevation, eps));
    vec3 objectNormal = normalize(cross(tangent, bitangent));

    vNormal = objectNormal;
    vWorldPosition = modelPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}
`;

const fragmentShader = `
precision highp float;
uniform float uOpacity;
uniform vec3 uTroughColor;
uniform vec3 uSurfaceColor;
uniform vec3 uPeakColor;
uniform float uPeakThreshold;
uniform float uPeakTransition;
uniform float uTroughThreshold;
uniform float uTroughTransition;
uniform float uFresnelScale;
uniform float uFresnelPower;
varying vec3 vNormal;
varying vec3 vWorldPosition;
uniform samplerCube uEnvironmentMap;

void main() {
    // Calculate vector from camera to the vertex
    vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
    vec3 reflectedDirection = reflect(viewDirection, vNormal);
    reflectedDirection.x = -reflectedDirection.x;

    // Sample environment map to get the reflected color
    vec4 reflectionColor = textureCube(uEnvironmentMap, reflectedDirection);

    // Calculate fresnel effect
    float fresnel = uFresnelScale * pow(1.0 - clamp(dot(viewDirection, vNormal), 0.0, 1.0), uFresnelPower);

    // Calculate elevation-based color
    float elevation = vWorldPosition.y;

    // Calculate transition factors using smoothstep
    float peakFactor = smoothstep(uPeakThreshold - uPeakTransition, uPeakThreshold + uPeakTransition, elevation);
    float troughFactor = smoothstep(uTroughThreshold - uTroughTransition, uTroughThreshold + uTroughTransition, elevation);

    // Mix between trough and surface colors based on trough transition
    vec3 mixedColor1 = mix(uTroughColor, uSurfaceColor, troughFactor);

    // Mix between surface and peak colors based on peak transition
    vec3 mixedColor2 = mix(mixedColor1, uPeakColor, peakFactor);

    // Mix the final color with the reflection color
    vec3 finalColor = mix(mixedColor2, reflectionColor.rgb, fresnel);

    gl_FragColor = vec4(finalColor, uOpacity);
}
`;

const OceanBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Environment Map (Placeholder)
    const environmentMap = new THREE.CubeTexture([
      new THREE.Color(0x444444), // px
      new THREE.Color(0x444444), // nx
      new THREE.Color(0x444444), // py
      new THREE.Color(0x444444), // ny
      new THREE.Color(0x444444), // pz
      new THREE.Color(0x444444), // nz
    ]);
    environmentMap.needsUpdate = true;

    // Sun Light (Setting Sun)
    const sunDirection = new THREE.Vector3(0.7, 0.3, -0.5).normalize(); // Towards setting sun
    const sunColor = new THREE.Color(0xffa040); // Warm glow
    const directionalLight = new THREE.DirectionalLight(sunColor, 1.5);
    directionalLight.position.copy(sunDirection).multiplyScalar(100);
    scene.add(directionalLight);

    // Ocean Plane with ShaderMaterial
    const geometry = new THREE.PlaneGeometry(2000, 2000, 256, 256); // Larger plane for ocean
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uWavesAmplitude: { value: 0.5 },
        uWavesSpeed: { value: 0.5 },
        uWavesFrequency: { value: 0.05 },
        uWavesPersistence: { value: 0.5 },
        uWavesLacunarity: { value: 2.0 },
        uWavesIterations: { value: 5.0 },
        uOpacity: { value: 0.9 },
        uTroughColor: { value: new THREE.Color(0x001e0f) },
        uSurfaceColor: { value: new THREE.Color(0x003366) },
        uPeakColor: { value: new THREE.Color(0x006699) },
        uPeakThreshold: { value: 0.2 },
        uPeakTransition: { value: 0.1 },
        uTroughThreshold: { value: -0.2 },
        uTroughTransition: { value: 0.1 },
        uFresnelScale: { value: 0.8 },
        uFresnelPower: { value: 2.0 },
        uEnvironmentMap: { value: environmentMap },
        cameraPosition: { value: camera.position },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
    const ocean = new THREE.Mesh(geometry, material);
    ocean.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    scene.add(ocean);

    camera.position.set(0, 20, 50);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update uniforms
      material.uniforms.uTime.value += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse interaction (for ripples - will be implemented later)
    const handleMouseMove = (event: MouseEvent) => {
      // Placeholder for mouse interaction
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />;
};

export default OceanBackground;
