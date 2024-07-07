varying vec2 vUv;
varying float vNoise;
varying vec3 vPosition;
varying vec3 vNormal;

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;

#include ./includes/cnoise.glsl
void main() {
    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = vNormal;

    if(!gl_FrontFacing) {
        normal *= -1.0;
    }

    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel *= pow(fresnel, 5.0);

    // Color
    vec3 color = vec3(fresnel) * uSurfaceColor;
    vec3 mixedColor = mix(color, uDepthColor, 0.1);

    // Falloff
    // float falloff = smoothstep(0.8, 0.0, fresnel);
    // color *= falloff;

    gl_FragColor = vec4(mixedColor, 1.0);
}