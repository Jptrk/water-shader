varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float vNoise;

uniform float uTime;

#include ./includes/cnoise.glsl
void main() {
    // Variables
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 normalPosition = modelMatrix * vec4(normal, 0.0);

    // Settings
    float animationSpeed = 0.25;
    float waveStrength = 0.15;

    // Wave
    float noise = cnoise(vec3(modelPosition.xyz) + uTime * animationSpeed) * waveStrength;
    modelPosition.xz += vec2(noise);

    // Final Position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Varyings
    vUv = uv;
    vPosition = modelPosition.xyz;
    vNoise = noise;
    vNormal = normalPosition.xyz;
}