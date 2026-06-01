'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Orb() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth || 480
    const H = mount.clientHeight || 520

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 100)
    camera.position.set(0, 0.3, 5.8)
    camera.lookAt(0, 0.1, 0)

    // ── MOUSE TRACKING ───────────────────────────────────────
    const targetRot = { x: 0, y: 0 }
    const currentRot = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      targetRot.y = ((e.clientX / window.innerWidth) * 2 - 1) * 0.35
      targetRot.x = -((e.clientY / window.innerHeight) * 2 - 1) * 0.2
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── MATERIALS ────────────────────────────────────────────
    // Skin – warm violet-beige
    const skinColor = new THREE.Color(0xc9956e).lerp(new THREE.Color(0xa855f7), 0.18)
    const skinMat = new THREE.MeshStandardMaterial({
      color: skinColor, roughness: 0.65, metalness: 0.0,
    })
    const skinDarkMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xb07850).lerp(new THREE.Color(0x7c3aed), 0.2),
      roughness: 0.8, metalness: 0.0,
    })
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x0d0015, roughness: 0.85, metalness: 0.05,
    })
    const hairGlossMat = new THREE.MeshStandardMaterial({
      color: 0x2a004a, roughness: 0.4, metalness: 0.3,
      emissive: 0x1a0033, emissiveIntensity: 0.15,
    })
    const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xf5eeff, roughness: 0.15 })
    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed, roughness: 0.0, metalness: 0.5,
      emissive: 0x5b21b6, emissiveIntensity: 0.8,
    })
    const pupilMat = new THREE.MeshStandardMaterial({ color: 0x050008, roughness: 1 })
    const eyeShimMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, roughness: 0.0, metalness: 1.0,
      transparent: true, opacity: 0.85,
    })
    const lipMat = new THREE.MeshStandardMaterial({
      color: 0xc2185b, roughness: 0.25, metalness: 0.1,
      emissive: 0x7b0033, emissiveIntensity: 0.25,
    })
    const lipInnerMat = new THREE.MeshStandardMaterial({ color: 0x8b0033, roughness: 0.6 })
    const teethMat = new THREE.MeshStandardMaterial({ color: 0xf5f0ff, roughness: 0.2 })
    const tongueMat = new THREE.MeshStandardMaterial({ color: 0xe91e63, roughness: 0.7 })
    const outfitMat = new THREE.MeshStandardMaterial({
      color: 0x0a0020, roughness: 0.5, metalness: 0.4,
      emissive: 0x1a0040, emissiveIntensity: 0.1,
    })
    const glowStripMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7, emissive: 0xa855f7, emissiveIntensity: 3.0,
      transparent: true, opacity: 0.9,
    })
    const earringMat = new THREE.MeshStandardMaterial({
      color: 0xd8b4fe, emissive: 0xa855f7, emissiveIntensity: 1.5,
      metalness: 0.95, roughness: 0.05,
    })

    // ── HEAD GROUP ───────────────────────────────────────────
    const avatarGroup = new THREE.Group()
    scene.add(avatarGroup)
    avatarGroup.position.set(0, 0, 0)

    // ── SKULL / FACE ─────────────────────────────────────────
    // Main head — slightly elongated oval
    const headGeo = new THREE.SphereGeometry(1.0, 128, 128)
    const headMesh = new THREE.Mesh(headGeo, skinMat)
    headMesh.scale.set(0.92, 1.12, 0.96)
    avatarGroup.add(headMesh)

    // Cheek puffs (feminine cheeks)
    ;[[-0.68, -0.1, 0.68], [0.68, -0.1, 0.68]].forEach(([cx, cy, cz]) => {
      const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.38, 32, 32), skinMat)
      cheek.scale.set(1.0, 0.7, 0.7)
      cheek.position.set(cx, cy, cz)
      avatarGroup.add(cheek)
    })

    // Chin — tapered
    const chinGeo = new THREE.SphereGeometry(0.42, 32, 32)
    const chin = new THREE.Mesh(chinGeo, skinMat)
    chin.scale.set(0.7, 0.55, 0.72)
    chin.position.set(0, -1.02, 0.2)
    avatarGroup.add(chin)

    // ── NECK ─────────────────────────────────────────────────
    const neckGeo = new THREE.CylinderGeometry(0.25, 0.32, 0.9, 48)
    const neck = new THREE.Mesh(neckGeo, skinMat)
    neck.position.set(0, -1.5, 0)
    avatarGroup.add(neck)

    // ── SHOULDERS / BUST ─────────────────────────────────────
    const bustGeo = new THREE.SphereGeometry(1.1, 48, 32)
    const bust = new THREE.Mesh(bustGeo, outfitMat)
    bust.scale.set(1.55, 0.62, 0.88)
    bust.position.set(0, -2.25, -0.15)
    avatarGroup.add(bust)

    // Collar glow
    const collarGeo = new THREE.TorusGeometry(0.44, 0.055, 16, 64)
    const collar = new THREE.Mesh(collarGeo, glowStripMat)
    collar.position.set(0, -1.88, 0.05)
    collar.rotation.x = Math.PI / 2 - 0.2
    avatarGroup.add(collar)

    // ── NOSE ─────────────────────────────────────────────────
    const noseGeo = new THREE.SphereGeometry(0.1, 32, 32)
    const nose = new THREE.Mesh(noseGeo, skinMat)
    nose.scale.set(0.8, 0.7, 1.0)
    nose.position.set(0, -0.08, 0.95)
    avatarGroup.add(nose)
    // nostril hints
    ;[[-0.065, -0.14, 0.92], [0.065, -0.14, 0.92]].forEach(([nx, ny, nz]) => {
      const nostril = new THREE.Mesh(new THREE.SphereGeometry(0.038, 16, 16), skinDarkMat)
      nostril.position.set(nx, ny, nz)
      avatarGroup.add(nostril)
    })

    // ── MOUTH GROUP ──────────────────────────────────────────
    const mouthGroup = new THREE.Group()
    mouthGroup.position.set(0, -0.42, 0.88)
    avatarGroup.add(mouthGroup)

    // Upper lip
    const upperLip = new THREE.Mesh(
      new THREE.SphereGeometry(0.185, 48, 32),
      lipMat
    )
    upperLip.scale.set(1.55, 0.52, 0.72)
    upperLip.position.set(0, 0.045, 0)
    mouthGroup.add(upperLip)

    // Lower lip
    const lowerLip = new THREE.Mesh(
      new THREE.SphereGeometry(0.195, 48, 32),
      lipMat
    )
    lowerLip.scale.set(1.45, 0.58, 0.72)
    lowerLip.position.set(0, -0.07, 0)
    mouthGroup.add(lowerLip)

    // Mouth cavity (dark gap)
    const mouthCavity = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 32, 16),
      lipInnerMat
    )
    mouthCavity.scale.set(1.7, 0.35, 0.6)
    mouthCavity.position.set(0, -0.01, 0.02)
    mouthGroup.add(mouthCavity)

    // Teeth
    const teethGeo = new THREE.BoxGeometry(0.32, 0.07, 0.06)
    const teethMesh = new THREE.Mesh(teethGeo, teethMat)
    teethMesh.position.set(0, 0.01, 0.06)
    mouthGroup.add(teethMesh)

    // Tongue
    const tongueGeo = new THREE.SphereGeometry(0.09, 16, 16)
    const tongue = new THREE.Mesh(tongueGeo, tongueMat)
    tongue.scale.set(1.3, 0.5, 0.9)
    tongue.position.set(0, -0.04, 0.02)
    mouthGroup.add(tongue)

    // ── EYES ─────────────────────────────────────────────────
    const eyeGroupL = new THREE.Group()
    const eyeGroupR = new THREE.Group()
    eyeGroupL.position.set(-0.3, 0.14, 0.86)
    eyeGroupR.position.set(0.3, 0.14, 0.86)
    avatarGroup.add(eyeGroupL, eyeGroupR)

    const eyeGroups = [eyeGroupL, eyeGroupR]
    eyeGroups.forEach((eg) => {
      // Eyeball
      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.148, 48, 48), eyeWhiteMat)
      eg.add(ball)
      // Iris
      const iris = new THREE.Mesh(new THREE.SphereGeometry(0.092, 48, 48), irisMat)
      iris.position.z = 0.09
      eg.add(iris)
      // Pupil
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.052, 24, 24), pupilMat)
      pupil.position.z = 0.13
      eg.add(pupil)
      // Catchlight
      const shine = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), eyeShimMat)
      shine.position.set(0.03, 0.03, 0.148)
      eg.add(shine)
    })

    // ── EYELIDS ──────────────────────────────────────────────
    const lidMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.7 })
    const lashMat = new THREE.MeshStandardMaterial({ color: 0x0a0010, roughness: 0.9 })

    const eyelidMeshes: THREE.Mesh[] = []
    eyeGroups.forEach((eg) => {
      // Upper lid (covers top half when blinking)
      const lidGeo = new THREE.SphereGeometry(0.155, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.5)
      const lid = new THREE.Mesh(lidGeo, lidMat)
      lid.rotation.x = -0.1
      lid.position.z = -0.005
      eg.add(lid)
      eyelidMeshes.push(lid)

      // Lash line
      const lashGeo = new THREE.TorusGeometry(0.148, 0.018, 8, 32, Math.PI)
      const lash = new THREE.Mesh(lashGeo, lashMat)
      lash.rotation.x = Math.PI / 2
      lash.position.y = 0.0
      lash.position.z = 0.0
      eg.add(lash)
    })

    // ── EYEBROWS ─────────────────────────────────────────────
    const browMat = new THREE.MeshStandardMaterial({ color: 0x0d0015, roughness: 0.9 })
    ;[[-0.3, 0.36, 0.88, 0.18], [0.3, 0.36, 0.88, -0.18]].forEach(([bx, by, bz, rz]) => {
      const brow = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 16), browMat)
      brow.scale.set(1.7, 0.28, 0.45)
      brow.position.set(bx, by, bz)
      brow.rotation.z = rz
      avatarGroup.add(brow)
    })

    // ── HAIR ─────────────────────────────────────────────────
    // Hair cap
    const hairCapGeo = new THREE.SphereGeometry(1.06, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.52)
    const hairCap = new THREE.Mesh(hairCapGeo, hairMat)
    hairCap.position.set(0, 0.1, 0)
    avatarGroup.add(hairCap)

    // Forehead hair edge
    const hairFrontGeo = new THREE.SphereGeometry(0.5, 32, 32)
    const hairFront = new THREE.Mesh(hairFrontGeo, hairMat)
    hairFront.scale.set(1.85, 0.22, 0.55)
    hairFront.position.set(0, 0.85, 0.72)
    avatarGroup.add(hairFront)

    // Side curtains
    ;[[-1.0, -0.3, 0.0, 0.55, 1.55, 0.48], [1.0, -0.3, 0.0, 0.55, 1.55, 0.48]].forEach(([sx, sy, sz, scx, scy, scz]) => {
      const sideHair = new THREE.Mesh(new THREE.SphereGeometry(0.52, 32, 32), hairMat)
      sideHair.scale.set(scx, scy, scz)
      sideHair.position.set(sx, sy, sz)
      avatarGroup.add(sideHair)
    })

    // Back volume
    const backHair = new THREE.Mesh(new THREE.SphereGeometry(1.08, 32, 32), hairMat)
    backHair.scale.set(0.98, 1.02, 0.72)
    backHair.position.set(0, -0.18, -0.55)
    avatarGroup.add(backHair)

    // Hair gloss highlight
    const glossGeo = new THREE.SphereGeometry(0.25, 16, 16)
    const gloss = new THREE.Mesh(glossGeo, hairGlossMat)
    gloss.scale.set(0.6, 0.4, 0.5)
    gloss.position.set(-0.2, 0.82, 0.68)
    avatarGroup.add(gloss)

    // ── EARRINGS ─────────────────────────────────────────────
    ;[[-0.92, -0.52], [0.92, -0.52]].forEach(([ex, ey]) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.022, 12, 32), earringMat)
      ring.position.set(ex, ey, 0.08)
      ring.rotation.x = 0.45
      avatarGroup.add(ring)
      const gem = new THREE.Mesh(new THREE.SphereGeometry(0.048, 16, 16), earringMat)
      gem.position.set(ex, ey - 0.13, 0.08)
      avatarGroup.add(gem)
    })

    // ── PARTICLES ────────────────────────────────────────────
    const pCount = 1400
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 1.8 + Math.random() * 1.2
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.85
      pPos[i * 3 + 2] = r * Math.cos(phi)
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({ color: 0xc084fc, size: 0.016, transparent: true, opacity: 0.45, sizeAttenuation: true })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // ── LIGHTS ───────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x2a1040, 1.8))

    const keyLight = new THREE.DirectionalLight(0xf0e0ff, 2.2)
    keyLight.position.set(2.5, 3, 4)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight(0xec4899, 2.8, 14)
    fillLight.position.set(-4, 1, 3)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight(0x7c3aed, 3.5, 10)
    rimLight.position.set(0, -1, -4)
    scene.add(rimLight)

    const topLight = new THREE.PointLight(0xe9d5ff, 2.4, 8)
    topLight.position.set(0, 5, 2)
    scene.add(topLight)

    const faceLight = new THREE.PointLight(0xfce7ff, 1.8, 6)
    faceLight.position.set(0, 0.5, 5)
    scene.add(faceLight)

    // ── SPEECH TEXT SPRITES ──────────────────────────────────
    const speechLines = [
      "Hi! I'm Dinesh Seervi 👋",
      "AI Developer 🤖",
      "B.Tech @ AISSMS IOIT Pune",
      "Data Science Enthusiast ⭐",
      "Hackathon Winner 🏆",
      "Building AI that sees,",
      "thinks, and acts 🧠",
    ]

    // floating speech bubble canvas
    let speechCanvas: HTMLCanvasElement | null = null
    let speechCtx: CanvasRenderingContext2D | null = null
    let speechTexture: THREE.CanvasTexture | null = null
    let speechMesh: THREE.Mesh | null = null

    speechCanvas = document.createElement('canvas')
    speechCanvas.width = 512
    speechCanvas.height = 100
    speechCtx = speechCanvas.getContext('2d')
    speechTexture = new THREE.CanvasTexture(speechCanvas)

    const speechMat2 = new THREE.MeshBasicMaterial({ map: speechTexture, transparent: true, depthWrite: false })
    const speechGeo = new THREE.PlaneGeometry(2.6, 0.52)
    speechMesh = new THREE.Mesh(speechGeo, speechMat2)
    speechMesh.position.set(0, 1.78, 0.5)
    scene.add(speechMesh)

    let speechIndex = 0
    let speechTimer = 0
    let speechAlpha = 0
    let speechFade = 1 // 1=in, -1=out

    function drawSpeech(text: string, alpha: number) {
      if (!speechCtx || !speechCanvas || !speechTexture) return
      speechCtx.clearRect(0, 0, speechCanvas.width, speechCanvas.height)
      // bubble bg
      speechCtx.globalAlpha = alpha * 0.88
      speechCtx.fillStyle = 'rgba(20,5,40,0.85)'
      const r = 18, x2 = 20, y2 = 10, w2 = speechCanvas.width - 40, h2 = speechCanvas.height - 20
      speechCtx.beginPath()
      speechCtx.moveTo(x2 + r, y2)
      speechCtx.lineTo(x2 + w2 - r, y2)
      speechCtx.quadraticCurveTo(x2 + w2, y2, x2 + w2, y2 + r)
      speechCtx.lineTo(x2 + w2, y2 + h2 - r)
      speechCtx.quadraticCurveTo(x2 + w2, y2 + h2, x2 + w2 - r, y2 + h2)
      speechCtx.lineTo(x2 + r, y2 + h2)
      speechCtx.quadraticCurveTo(x2, y2 + h2, x2, y2 + h2 - r)
      speechCtx.lineTo(x2, y2 + r)
      speechCtx.quadraticCurveTo(x2, y2, x2 + r, y2)
      speechCtx.closePath()
      speechCtx.fill()
      // border
      speechCtx.strokeStyle = `rgba(168,85,247,${alpha * 0.9})`
      speechCtx.lineWidth = 2
      speechCtx.stroke()
      // text
      speechCtx.globalAlpha = alpha
      speechCtx.fillStyle = '#f0e8ff'
      speechCtx.font = 'bold 28px "Segoe UI", Arial, sans-serif'
      speechCtx.textAlign = 'center'
      speechCtx.textBaseline = 'middle'
      speechCtx.fillText(text, speechCanvas.width / 2, speechCanvas.height / 2)
      speechTexture.needsUpdate = true
    }

    // ── ANIMATION STATE ──────────────────────────────────────
    let blinkTimer2 = 0
    let blinkPhase = 0   // 0=open,1=closing,2=opening
    let blinkProg = 0
    const BLINK_SPEED = 0.22

    // Mouth talk
    let talkPhase = 0 // oscillates for lip sync

    const clock = new THREE.Clock()
    let raf: number

    function animate() {
      raf = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Smooth head rotation
      currentRot.x += (targetRot.x - currentRot.x) * 0.055
      currentRot.y += (targetRot.y - currentRot.y) * 0.055
      avatarGroup.rotation.x = currentRot.x
      avatarGroup.rotation.y = currentRot.y

      // Idle bob & breathe
      avatarGroup.position.y = Math.sin(t * 0.7) * 0.04
      const breathe = 1.0 + Math.sin(t * 1.05) * 0.007
      avatarGroup.scale.setScalar(breathe)

      // ── BLINK ──────────────────────────────────────────────
      blinkTimer2 += 0.016
      if (blinkPhase === 0 && blinkTimer2 > 2.2 + Math.random() * 2.5) {
        blinkPhase = 1; blinkTimer2 = 0; blinkProg = 0
      }
      if (blinkPhase === 1) {
        blinkProg = Math.min(blinkProg + BLINK_SPEED, 1)
        if (blinkProg >= 1) { blinkPhase = 2 }
      } else if (blinkPhase === 2) {
        blinkProg = Math.max(blinkProg - BLINK_SPEED, 0)
        if (blinkProg <= 0) { blinkPhase = 0; blinkTimer2 = 0 }
      }
      // Apply blink to eyelids and eye scale
      eyeGroups.forEach((eg, i) => {
        eg.scale.y = 1.0 - blinkProg * 0.9
        // slight squeeze
        eg.scale.x = 1.0 + blinkProg * 0.05
      })

      // ── LIP SYNC / MOUTH ───────────────────────────────────
      // Simulate talking with varied open/close
      talkPhase += 0.016
      const talkAmt =
        (Math.sin(talkPhase * 7.2) * 0.5 + 0.5) *
        (Math.sin(talkPhase * 3.1) * 0.3 + 0.7) *
        (Math.sin(talkPhase * 11.4) * 0.2 + 0.8)
      const openAmt = talkAmt * 0.55

      // Move lower lip down
      lowerLip.position.y = -0.07 - openAmt * 0.12
      lowerLip.scale.y = 0.58 + openAmt * 0.3
      // Cavity opens
      mouthCavity.scale.y = 0.35 + openAmt * 1.1
      mouthCavity.position.z = 0.02 + openAmt * 0.04
      // Upper lip slight curl
      upperLip.position.y = 0.045 + openAmt * 0.02
      // Teeth show
      teethMesh.position.z = 0.06 + openAmt * 0.05
      teethMesh.scale.y = 0.8 + openAmt * 0.5
      // Tongue
      tongue.position.y = -0.04 - openAmt * 0.06
      tongue.position.z = 0.02 - openAmt * 0.05

      // ── SPEECH BUBBLE ──────────────────────────────────────
      speechTimer += 0.016
      if (speechFade === 1) {
        speechAlpha = Math.min(speechAlpha + 0.04, 1)
        if (speechAlpha >= 1 && speechTimer > 2.8) {
          speechFade = -1; speechTimer = 0
        }
      } else {
        speechAlpha = Math.max(speechAlpha - 0.04, 0)
        if (speechAlpha <= 0) {
          speechIndex = (speechIndex + 1) % speechLines.length
          speechFade = 1; speechTimer = 0
        }
      }
      drawSpeech(speechLines[speechIndex], speechAlpha)
      if (speechMesh) {
        speechMesh.position.y = 1.78 + Math.sin(t * 0.6) * 0.04
        // face camera
        speechMesh.lookAt(camera.position)
      }

      // ── PARTICLES ──────────────────────────────────────────
      particles.rotation.y = t * 0.055
      particles.rotation.x = t * 0.028

      // ── LIGHT ORBIT ────────────────────────────────────────
      fillLight.position.x = Math.sin(t * 0.35) * 4
      fillLight.position.z = Math.cos(t * 0.35) * 3 + 2
      keyLight.position.x = 2.5 + Math.sin(t * 0.2) * 0.8

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        border: '1px solid rgba(168,85,247,0.18)',
        inset: '-28px', animation: 'spin-slow 24s linear infinite',
      }} />
      <div style={{
        position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
        border: '1px solid rgba(236,72,153,0.10)',
        inset: '-52px', animation: 'spin-reverse 38s linear infinite',
      }} />
      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
        background: 'linear-gradient(to top, var(--bg), transparent)',
        pointerEvents: 'none', zIndex: 2,
      }} />
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
      <style>{`
        @keyframes spin-slow    { to { transform: rotate(360deg);  } }
        @keyframes spin-reverse { to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  )
}
