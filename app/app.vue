<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useHead({
  title: 'Robert Catalin Crisan | Portfolio',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover' },
    { name: 'description', content: 'Portfolio of Robert Catalin Crisan - Game Developer and Technical Programmer' },
    // OpenGraph Meta Tags
    { property: 'og:title', content: 'Robert Catalin Crisan | Portfolio' },
    { property: 'og:description', content: 'Game Developer & Technical Programmer portfolio showcasing systems engineering, XR escape rooms, AI simulations, and graphics HLSL shaders.' },
    { property: 'og:image', content: '/UnivPortfolio/og-preview.png' },
    { property: 'og:url', content: 'https://robertgre.github.io/UnivPortfolio/' },
    { property: 'og:type', content: 'website' },
    // Twitter Card Meta Tags
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Robert Catalin Crisan | Portfolio' },
    { name: 'twitter:description', content: 'Game Developer & Technical Programmer portfolio showcasing systems engineering, XR escape rooms, AI simulations, and graphics HLSL shaders.' },
    { name: 'twitter:image', content: '/UnivPortfolio/og-preview.png' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/UnivPortfolio/favicon.png' }
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

  if (!isTouch.value) {
    const cursor = cursorRef.value

    if (cursor) {
      // Optimized Custom Cursor Logic - 360Hz+ Target
      const setX = gsap.quickSetter(cursor, 'x', 'px')
      const setY = gsap.quickSetter(cursor, 'y', 'px')

      const showCursor = () => gsap.to(cursor, { opacity: 1, duration: 0.1, overwrite: true })

      // Set initial state based on device
      gsap.set(cursor, { opacity: 1 })
      if (typeof document !== 'undefined') {
        document.documentElement.classList.add('custom-cursor-active')
      }

      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX
        mouse.y = e.clientY
      })

      // High-frequency loop for buttery smooth movement
      const tickCursor = () => {
        setX(mouse.x)
        setY(mouse.y)
        requestAnimationFrame(tickCursor)
      }
      requestAnimationFrame(tickCursor)

      // Hover Scaling (Delegated for dynamic content)
      const handlePointerEnter = () => gsap.to(cursor, { scale: 1.8, backgroundColor: 'rgba(0, 102, 255, 0.1)', duration: 0.2, overwrite: true })
      const handlePointerLeave = () => gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', duration: 0.2, overwrite: true })

      const updateCursorState = (e) => {
        const target = e.target.closest?.('button, a, .cursor-pointer, .disable-custom-cursor')
        
        if (target) {
          if (target.classList.contains('disable-custom-cursor')) {
            gsap.to(cursor, { opacity: 0, duration: 0.2, overwrite: true })
          } else {
            handlePointerEnter()
            showCursor()
          }
        } else {
          handlePointerLeave()
          showCursor()
        }
      }

      window.addEventListener('mouseover', updateCursorState)

      // Reset state on modal change to prevent stuck hover states
      watch(isModalActive, () => {
        handlePointerLeave()
        showCursor()
      })
    }
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
        r = Math.round(0 + (110 - 0) * t) // Transitioning from blue point
        g = Math.round(102 + (61 - 102) * t)
        b = 255
      } else if (dot.excitement > 0.1) {
        // Blending to Blue: #0066ff (0, 102, 255)
        const t = (dot.excitement - 0.1) * 2
        r = Math.round(255 + (0 - 255) * t)
        g = Math.round(255 + (102 - 255) * t)
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
        v-if="!isTouch"
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

/* Explicitly keep native cursor hidden during carousel dragging when custom cursor is active */
.custom-cursor-active .carousel--dragging,
.custom-cursor-active .carousel--dragging * {
  cursor: none !important;
}

.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999999;
  mix-blend-mode: screen;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--accent);
  box-shadow: 0 0 12px rgba(0, 102, 255, 0.35);
  opacity: 0;
  /* Long-duration, premium ease-out bezier curve for organic visual weight transitions */
  transition: 
    opacity 0.3s ease, 
    border-color 0.45s cubic-bezier(0.25, 1, 0.2, 1), 
    box-shadow 0.45s cubic-bezier(0.25, 1, 0.2, 1), 
    width 0.45s cubic-bezier(0.25, 1, 0.2, 1), 
    height 0.45s cubic-bezier(0.25, 1, 0.2, 1), 
    border-radius 0.45s cubic-bezier(0.25, 1, 0.2, 1), 
    background-color 0.45s cubic-bezier(0.25, 1, 0.2, 1);
}

.custom-cursor::after {
  content: '';
  width: 4px;
  height: 4px;
  background: var(--accent);
  border-radius: 50%;
  position: absolute;
  transition: all 0.45s cubic-bezier(0.25, 1, 0.2, 1);
}

/* Custom Cursor Hovering Carousel */
body.carousel-is-hovered .custom-cursor {
  width: 32px;
  height: 32px;
  border: 1.5px dashed var(--accent);
  box-shadow: 0 0 16px rgba(0, 102, 255, 0.4);
  background: rgba(0, 102, 255, 0.05);
}

body.carousel-is-hovered .custom-cursor::after {
  width: 6px;
  height: 6px;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}

/* Custom Cursor Dragging Carousel */
body.carousel-is-dragging .custom-cursor {
  width: 42px;
  height: 20px;
  border-radius: 6px;
  border: 1.5px solid #6e3dff; /* Cyber violet */
  box-shadow: 0 0 18px rgba(110, 61, 255, 0.6);
  background: rgba(110, 61, 255, 0.15);
  animation: cyber-pulse 1.5s infinite alternate;
}

body.carousel-is-dragging .custom-cursor::after {
  width: 16px;
  height: 2px;
  border-radius: 1px;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}

/* Prevent any text selection or drag highlights across the entire page during dragging */
body.carousel-is-dragging,
body.carousel-is-dragging * {
  user-select: none !important;
  -webkit-user-select: none !important;
}

@keyframes cyber-pulse {
  0% {
    border-color: #6e3dff;
    box-shadow: 0 0 12px rgba(110, 61, 255, 0.4);
  }
  100% {
    border-color: var(--accent);
    box-shadow: 0 0 20px rgba(0, 102, 255, 0.6);
  }
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
