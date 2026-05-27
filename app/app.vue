<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useHead({
  title: 'Robert Catalin Crisan | Portfolio',
  meta: [
    { name: 'viewport', content: 'width=1280' },
    { name: 'description', content: 'Portfolio of Robert Catalin Crisan - Game Developer and Technical Programmer' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const canvasRef = ref(null)

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let width, height
  const dots = []
  const DOT_COUNT = 80 // Optimal count for real-time proximity search
  const MAX_DIST = 150 // Connection distance

  const initDots = () => {
    dots.length = 0
    for (let i = 0; i < DOT_COUNT; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25
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
    ctx.clearRect(0, 0, width, height)

    // Update dot positions
    for (const dot of dots) {
      dot.x += dot.vx
      dot.y += dot.vy

      // Wrap around screen
      if (dot.x < 0) dot.x = width
      if (dot.x > width) dot.x = 0
      if (dot.y < 0) dot.y = height
      if (dot.y > height) dot.y = 0
    }

    // Connect to closest 3 neighbors
    for (let i = 0; i < dots.length; i++) {
      const dotA = dots[i]
      const neighbors = []

      // Find all potential neighbors within range
      for (let j = 0; j < dots.length; j++) {
        if (i === j) continue
        const dotB = dots[j]
        const dx = dotA.x - dotB.x
        const dy = dotA.y - dotB.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < MAX_DIST) {
          neighbors.push({ dot: dotB, dist })
        }
      }

      // Sort and pick top 3
      neighbors.sort((a, b) => a.dist - b.dist)
      const closest = neighbors.slice(0, 3)

      for (const neighbor of closest) {
        // Line alpha based on distance
        const alpha = (1 - neighbor.dist / MAX_DIST) * 0.15
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(dotA.x, dotA.y)
        ctx.lineTo(neighbor.dot.x, neighbor.dot.y)
        ctx.stroke()
      }
    }

    // Draw the stars themselves
    for (const dot of dots) {
      ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
      ctx.fill()

      // Subtle glow for larger stars
      if (dot.size > 1.2) {
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.opacity * 0.2})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size * 2.5, 0, Math.PI * 2)
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
    <div class="portfolio-root">
      <canvas
        ref="canvasRef"
        class="bg-canvas"
      />
      <NuxtPage />
    </div>
  </UApp>
</template>

<style>
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
