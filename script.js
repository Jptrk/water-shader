import init from "./init";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";

const { scene, renderer, controls, THREE, camera, textureLoader } = init();

/**
 * Env Map
 */
textureLoader.load("/envMaps/envmap1.jpg", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  scene.background = texture;
});

/**
 * Light
 */
// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(-10, 5, 0).normalize();
scene.add(directionalLight);
/**
 * Sphere
 */
const material = new THREE.ShaderMaterial({
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: {
    uTime: new THREE.Uniform(0.0),
    uDepthColor: new THREE.Uniform(new THREE.Color("#ffffff")),
    uSurfaceColor: new THREE.Uniform(new THREE.Color("#31d194")),
  },
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const sphere = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1, 100),
  // new THREE.MeshStandardMaterial()
  material
);
sphere.material.metalness = 1;
sphere.material.roughness = 0;
sphere.layers.enable(1);
scene.add(sphere);


/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update sphere
  sphere.rotation.y = elapsedTime * 0.5;

  // Update Material
  material.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
