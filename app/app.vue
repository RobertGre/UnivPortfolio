<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useHead({
  title: 'Robert Catalin Crisan | Portfolio',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover' },
    { name: 'description', content: 'Portfolio of Robert Catalin Crisan - Game Developer and Technical Programmer' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const canvasRef = ref(null)
const cursorRef = ref(null)
const isTouch = ref(false)
const isModalActive = useState('isModalActive', () => false)

onMounted(() => {
  // Desktop/Mobile detection
  isTouch.value = window.innerWidth <= 1024

  const mouse = { x: -2000, y: -2000 }
  const cursor = cursorRef.value

  if (cursor) {
    // Optimized Custom Cursor Logic - 360Hz+ Target
    const setX = gsap.quickSetter(cursor, 'x', 'px')
    const setY = gsap.quickSetter(cursor, 'y', 'px')

    const showCursor = () => gsap.to(cursor, { opacity: 1, duration: 0.1, overwrite: true })
    const hideCursor = () => gsap.to(cursor, { opacity: 0, duration: 1, delay: 0.2, overwrite: true })

    // Set initial state based on device
    if (!isTouch.value) {
      gsap.set(cursor, { opacity: 1 })
    }

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (isTouch.value) showCursor()
    })

    window.addEventListener('mousedown', () => {
      if (isTouch.value) showCursor()
    })

    window.addEventListener('mouseup', () => {
      if (isTouch.value) hideCursor()
    })

    window.addEventListener('touchstart', (e) => {
      mouse.x = e.touches[0].clientX
      mouse.y = e.touches[0].clientY
      setX(mouse.x)
      setY(mouse.y)
      showCursor()
    }, { passive: true })

    window.addEventListener('touchend', () => {
      if (isTouch.value) hideCursor()
    }, { passive: true })

    // High-frequency loop for buttery smooth movement
    const tickCursor = () => {
      setX(mouse.x)
      setY(mouse.y)
      requestAnimationFrame(tickCursor)
    }
    requestAnimationFrame(tickCursor)

    // Hover Scaling (Delegated for dynamic content)
    const handlePointerEnter = () => gsap.to(cursor, { scale: 1.8, backgroundColor: 'rgba(116, 245, 255, 0.1)', duration: 0.2 })
    const handlePointerLeave = () => gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', duration: 0.2 })

    window.addEventListener('mouseover', (e) => {
      const target = e.target.closest('button, a, .cursor-pointer, .disable-custom-cursor')
      if (!target) return
      if (target.classList.contains('disable-custom-cursor')) {
        gsap.to(cursor, { opacity: 0, duration: 0.2 })
      } else {
        handlePointerEnter()
      }
    })

    window.addEventListener('mouseout', (e) => {
      const target = e.target.closest('button, a, .cursor-pointer, .disable-custom-cursor')
      if (!target) return
      if (target.classList.contains('disable-custom-cursor')) {
        if (!isTouch.value) showCursor()
      } else {
        handlePointerLeave()
      }
    })
  }

  gsap.registerPlugin(ScrollTrigger)
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let width, height
  const dots = []
  const MAX_DIST = 140

  const getDynamicDotCount = () => {
    if (typeof window === 'undefined') return 100
    const w = window.innerWidth
    if (w <= 620) return 50 // Phone (150 - 100)
    if (w <= 1920) return 100 // 1080p (In between)
    return 150 // 4K+ (However many they are now)
  }

  const initDots = () => {
    const count = getDynamicDotCount()
    dots.length = 0
    for (let i = 0; i < count; i++) {
      const vx = (Math.random() - 0.5) * 0.25
      const vy = (Math.random() - 0.5) * 0.25
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.6,
        opacity: Math.random() * 0.4 + 0.3,
        vx, vy,
        baseVx: vx, baseVy: vy,
        excitement: 0
      })
    }
  }

  const resize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    initDots()
  }

  window.addEventListener('resize', resize)
  resize()

  const draw = () => {
    if (isModalActive.value) {
      requestAnimationFrame(draw)
      return
    }

    ctx.clearRect(0, 0, width, height)

    // PERFORMANCE: Only calculate complex physics/repulsion on desktop
    let obstacles = []
    if (!isTouch.value) {
      obstacles = Array.from(document.querySelectorAll('.hero__content, .about__card, .cyber-box'))
        .map(el => el.getBoundingClientRect())
    }

    // Update dot positions and interaction
    for (const dot of dots) {
      if (!isTouch.value) {
        const dx = dot.x - mouse.x
        const dy = dot.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const proximityRange = 25

        // VISUAL REACTION & PUSH (Mouse)
        if (dist < proximityRange) {
          const force = (1 - dist / proximityRange) * 0.8
          dot.vx += (dx / dist) * force
          dot.vy += (dy / dist) * force
          dot.excitement = Math.min(dot.excitement + 0.1, 1.0)
        } else {
          dot.vx += (dot.baseVx - dot.vx) * 0.03
          dot.vy += (dot.baseVy - dot.vy) * 0.03
          dot.excitement *= 0.98
        }

        // BOUNDARY INTERACTION: Glow on proximity + Move Away + Hard bounce at edge
        for (const rect of obstacles) {
          const closestX = Math.max(rect.left, Math.min(dot.x, rect.right))
          const closestY = Math.max(rect.top, Math.min(dot.y, rect.bottom))

          const rDx = dot.x - closestX
          const rDy = dot.y - closestY
          const rDist = Math.sqrt(rDx * rDx + rDy * rDy)
          const rProximityRange = 20

          // PUSHBACK & GLOW: Only on Desktop/4K (width > 1024)
          if (width > 1024 && rDist < rProximityRange) {
            const force = (1 - rDist / rProximityRange) * 0.5
            if (rDist > 0) {
              dot.vx += (rDx / rDist) * force
              dot.vy += (rDy / rDist) * force
            }
            dot.excitement = Math.min(dot.excitement + 0.05, 1.0)
          }

          // Hard Bounce: Always active to prevent stars from hiding behind boxes
          if (dot.x > rect.left && dot.x < rect.right && dot.y > rect.top && dot.y < rect.bottom) {
            const distL = Math.abs(dot.x - rect.left)
            const distR = Math.abs(dot.x - rect.right)
            const distT = Math.abs(dot.y - rect.top)
            const distB = Math.abs(dot.y - rect.bottom)
            const minDist = Math.min(distL, distR, distT, distB)
            if (minDist === distL) {
              dot.x = rect.left
              dot.vx = -Math.abs(dot.vx)
            } else if (minDist === distR) {
              dot.x = rect.right
              dot.vx = Math.abs(dot.vx)
            } else if (minDist === distT) {
              dot.y = rect.top
              dot.vy = -Math.abs(dot.vy)
            } else if (minDist === distB) {
              dot.y = rect.bottom
              dot.vy = Math.abs(dot.vy)
            }
          }
        }
      }

      dot.x += dot.vx
      dot.y += dot.vy

      // Restored screen wrapping
      if (dot.x < 0) dot.x = width
      if (dot.x > width) dot.x = 0
      if (dot.y < 0) dot.y = height
      if (dot.y > height) dot.y = 0
    }

    // Draw Connections
    for (let i = 0; i < dots.length; i++) {
      const dotA = dots[i]
      for (let j = i + 1; j < dots.length; j++) {
        const dotB = dots[j]
        const dx = dotA.x - dotB.x
        const dy = dotA.y - dotB.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MAX_DIST) {
          let alpha = (1 - dist / MAX_DIST) * 0.15

          // Only calculate interruption logic on desktop
          if (!isTouch.value) {
            const L2 = Math.pow(dotB.x - dotA.x, 2) + Math.pow(dotB.y - dotA.y, 2)
            let t = ((mouse.x - dotA.x) * (dotB.x - dotA.x) + (mouse.y - dotA.y) * (dotB.y - dotA.y)) / L2
            t = Math.max(0, Math.min(1, t))
            const projX = dotA.x + t * (dotB.x - dotA.x)
            const projY = dotA.y + t * (dotB.y - dotA.y)
            const distToMouse = Math.sqrt(Math.pow(mouse.x - projX, 2) + Math.pow(mouse.y - projY, 2))
            if (distToMouse < 45) alpha *= (distToMouse / 45)
          }

          if (alpha > 0.01) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(dotA.x, dotA.y)
            ctx.lineTo(dotB.x, dotB.y)
            ctx.stroke()
          }
        }
      }
    }

    // Draw Stars with Reactive Colors
    for (const dot of dots) {
      let r = 255, g = 255, b = 255

      if (dot.excitement > 0.6) {
        // Blending to Purple: #6e3dff (110, 61, 255)
        const t = (dot.excitement - 0.6) * 2.5
        r = Math.round(116 + (110 - 116) * t) // Transitioning from cyan point
        g = Math.round(245 + (61 - 245) * t)
        b = 255
      } else if (dot.excitement > 0.1) {
        // Blending to Cyan: #74f5ff (116, 245, 255)
        const t = (dot.excitement - 0.1) * 2
        r = Math.round(255 + (116 - 255) * t)
        g = Math.round(255 + (245 - 255) * t)
        b = 255
      }

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dot.opacity})`
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
      ctx.fill()

      // SUBTLE GLOW: Smaller and fainter
      if (dot.size > 1.2 || dot.excitement > 0.2) {
        const glowAlpha = (dot.opacity * 0.1) + (dot.excitement * 0.25)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${glowAlpha})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size * (1.5 + dot.excitement * 2.5), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    requestAnimationFrame(draw)
  }

  draw()
})
</script>

<template>
  <UApp>
    <div
      class="portfolio-root"
      :class="{ 'custom-cursor-active': !isTouch }"
    >
      <div
        ref="cursorRef"
        class="custom-cursor"
      />
      <canvas
        ref="canvasRef"
        class="bg-canvas"
      />
      <NuxtPage />
    </div>
  </UApp>
</template>

<style>
/* Custom Cursor Styles */
.custom-cursor-active,
.custom-cursor-active * {
  cursor: none !important;
}

.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999999;
  mix-blend-mode: screen;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(116, 245, 255, 0.2);
  opacity: 0;
}

.custom-cursor::before {
  content: '';
  position: absolute;
  inset: -150%;
  background: conic-gradient(
    from 0deg,
    var(--accent) 0%,
    var(--accent-strong) 25%,
    var(--accent) 50%,
    var(--accent-strong) 75%,
    var(--accent) 100%
  );
  animation: border-chase 4s linear infinite;
  border-radius: 50%;
}

.custom-cursor::after {
  content: '';
  position: absolute;
  inset: 2px;
  background: #000;
  border-radius: 50%;
}

@keyframes border-chase {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Reset and Base Styles */
html, body {
  margin: 0;
  padding: 0;
  background: #000000 !important;
  color: #e8f7ff;
  overflow-x: hidden !important;
  width: 100%;
  max-width: 100vw;
  position: relative;
}

#root, #__nuxt, .portfolio-root {
  overflow-x: hidden !important;
  width: 100%;
  max-width: 100vw;
}

.portfolio-root {
  position: relative;
  min-height: 100vh;
  background: transparent;
}

.bg-canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: transparent;
}
</style>
