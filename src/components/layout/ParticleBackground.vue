<template>
  <canvas ref="canvas" class="bg-canvas" @click="onCanvasClick" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  Color,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  AdditiveBlending,
  Points,
  Vector3,
} from 'three'

const canvas = ref(null)

// Colour palette
const C1 = new Color(0x001a0f)
const C2 = new Color(0x006644)
const C3 = new Color(0x00c87a)
const C4 = new Color(0x00e5c0)

const COLS   = 320
const ROWS   = 160
const W_SPAN = 80
const D_SPAN = 50
const COUNT  = COLS * ROWS

let renderer, scene, camera, geo
let posArr, colArr, sizeArr
let baseX, baseZ
let animId = null
let t      = 0
let ripples = []

function init() {
  const el = canvas.value
  const W  = window.innerWidth
  const H  = window.innerHeight

  renderer = new WebGLRenderer({ canvas: el, antialias: true, alpha: false })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x07090d, 1)

  scene  = new Scene()
  camera = new PerspectiveCamera(55, W / H, 0.1, 1000)
  camera.position.set(8, 6, 28)
  camera.lookAt(-4, 0, -10)

  const positions = new Float32Array(COUNT * 3)
  const colors    = new Float32Array(COUNT * 3)
  const sizes     = new Float32Array(COUNT)
  baseX           = new Float32Array(COUNT)
  baseZ           = new Float32Array(COUNT)

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c
      const x = (c / COLS - 0.5) * W_SPAN + (Math.random() - 0.5) * 0.1
      const z = (r / ROWS - 0.5) * D_SPAN + (Math.random() - 0.5) * 0.1
      baseX[i] = x; baseZ[i] = z
      positions[i*3] = x; positions[i*3+1] = 0; positions[i*3+2] = z
      colors[i*3] = C1.r; colors[i*3+1] = C1.g; colors[i*3+2] = C1.b
      sizes[i]  = 0.04 + Math.random() * 0.04
    }
  }

  geo = new BufferGeometry()
  geo.setAttribute('position', new BufferAttribute(positions, 3))
  geo.setAttribute('color',    new BufferAttribute(colors,    3))
  geo.setAttribute('size',     new BufferAttribute(sizes,     1))

  const mat = new ShaderMaterial({
    vertexColors: true,
    transparent:  true,
    depthWrite:   false,
    blending:     AdditiveBlending,
    vertexShader: `
      attribute float size;
      varying vec3  vColor;
      varying float vAlpha;
      void main(){
        vColor = color;
        vec4 mvp = modelViewMatrix * vec4(position, 1.0);
        vAlpha   = clamp(1.0 - length(mvp.xyz) / 80.0, 0.0, 1.0);
        gl_PointSize = size * (420.0 / -mvp.z);
        gl_Position  = projectionMatrix * mvp;
      }
    `,
    fragmentShader: `
      varying vec3  vColor;
      varying float vAlpha;
      void main(){
        vec2  uv   = gl_PointCoord - 0.5;
        float r    = dot(uv, uv);
        if(r > 0.25) discard;
        float edge = 1.0 - smoothstep(0.10, 0.25, r);
        gl_FragColor = vec4(vColor * (1.0 + edge * 0.4), edge * vAlpha * 0.95);
      }
    `,
  })

  scene.add(new Points(geo, mat))
  posArr  = geo.attributes.position.array
  colArr  = geo.attributes.color.array
  sizeArr = geo.attributes.size.array
}

function animate() {
  animId = requestAnimationFrame(animate)
  t += 0.016

  ripples = ripples.filter(rp => t - rp.t0 < 4.0)

  for (let i = 0; i < COUNT; i++) {
    const x = baseX[i]
    const z = baseZ[i]

    const wave1  = Math.sin(x*0.14 - t*1.1  + z*0.05) * 3.0
    const wave2  = Math.sin(x*0.08 + z*0.18 - t*0.75) * 1.8
    const wave3  = Math.sin(x*0.22 - z*0.10 + t*1.4)  * 0.9
    const wave4  = Math.cos(x*0.10 + z*0.12 - t*0.55) * 1.2
    const detail = Math.sin(x*0.35 + z*0.28 - t*2.0)  * 0.3
    let y = (wave1 + wave2 + wave3 + wave4 + detail) * 0.52

    for (const rp of ripples) {
      const age  = t - rp.t0
      const dist = Math.hypot(x - rp.x, z - rp.z)
      const ring = age * 6
      const diff = dist - ring
      if (Math.abs(diff) < 2.5) {
        const fade = Math.max(0, 1 - age / 4.0)
        y += Math.sin(diff * 1.2) * 2.2 * fade * (1 - Math.abs(diff) / 2.5)
      }
    }

    posArr[i*3+1] = y

    const h = Math.max(0, Math.min(1, (y + 3.5) / 7.0))
    let col
    if      (h < 0.3) col = C1.clone().lerp(C2, h / 0.3)
    else if (h < 0.7) col = C2.clone().lerp(C3, (h - 0.3) / 0.4)
    else              col = C3.clone().lerp(C4, (h - 0.7) / 0.3)
    const b = 0.4 + h * 1.3
    colArr[i*3]   = col.r * b
    colArr[i*3+1] = col.g * b
    colArr[i*3+2] = col.b * b
    sizeArr[i]    = 0.035 + h * 0.07
  }

  geo.attributes.position.needsUpdate = true
  geo.attributes.color.needsUpdate    = true
  geo.attributes.size.needsUpdate     = true

  camera.position.x = 8 + Math.sin(t * 0.06) * 1.5
  camera.position.y = 6 + Math.sin(t * 0.09) * 0.5
  camera.lookAt(-4, 0, -10)

  renderer.render(scene, camera)
}

function screenToWorld(ex, ey) {
  const ndc = new Vector3(
      (ex / window.innerWidth)  *  2 - 1,
      (ey / window.innerHeight) * -2 + 1,
      0.5,
  )
  ndc.unproject(camera)
  const dir  = ndc.sub(camera.position).normalize()
  const dist = -camera.position.y / dir.y
  return { x: camera.position.x + dir.x * dist, z: camera.position.z + dir.z * dist }
}

function onCanvasClick(e) {
  const { x, z } = screenToWorld(e.clientX, e.clientY)
  ripples.push({ x, z, t0: t })
}

function onResize() {
  const W = window.innerWidth
  const H = window.innerHeight
  camera.aspect = W / H
  camera.updateProjectionMatrix()
  renderer.setSize(W, H)
}

onMounted(() => {
  init()
  animate()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (animId) cancelAnimationFrame(animId)
  renderer?.dispose()
})
</script>

<style scoped>
.bg-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  display: block;
  cursor: crosshair;
}
</style>