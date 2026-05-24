<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

const sections = [
  { id: 'home', label: 'HOME' },
  { id: 'games', label: 'GAMES' },
  { id: 'technical-projects', label: 'TECHNICAL' },
  { id: 'about', label: 'ABOUT' }
]

const currentIndex = ref(0)
const isAutoScrolling = ref(false)
const isGlobalModalOpen = useState('isModalActive', () => false)

const games = [
  {
    title: 'Echo: Bound by Choice',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/echo/800/600',
    description: 'An immersive puzzle game that explores the consequences of choices. Built with Unity and C#.',
    learned: 'Deepened my understanding of complex state management and player psychology in game design.',
    done: 'Lead developer for the interaction system and environment shaders.',
    youtube: 'dQw4w9WgXcQ' // Example ID
  },
  {
    title: 'Echoes Of The Twin Tombs',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/tombs/800/600',
    description: 'A VR co-op adventure set in ancient Egyptian tombs. Developed using Unreal Engine 5.',
    learned: 'Mastered VR networking and collaborative puzzle mechanics in a physics-based world.',
    done: 'Implemented the VR locomotion system and synchronized network events.',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'VR Space Adventure',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/space/800/600',
    description: 'Explore the galaxy in this high-fidelity VR flight simulator.',
    learned: 'Advanced linear algebra for 6DOF movement and performance optimization for VR.',
    done: 'Architected the spacecraft flight model and cockpit UI.',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'Cyberpunk Racer',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/race/800/600',
    description: 'High-speed racing through a neon-drenched futuristic city.',
    learned: 'Implementing pathfinding for AI racers and dynamic weather systems.',
    done: 'Developed the vehicle physics and the procedural traffic system.',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'Neon Guardian',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/neon/800/600',
    description: 'A fast-paced bullet hell game with vibrant neon aesthetics.',
    learned: 'Particle system optimization and bullet pooling patterns.',
    done: 'Created the enemy behavior patterns and custom VFX.',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'Deep Sea Hunter',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/sea/800/600',
    description: 'Survival horror set in the darkest depths of the ocean.',
    learned: 'Volumetric lighting and underwater acoustics simulation.',
    done: 'Implemented the submarine control system and environmental hazards.',
    youtube: 'dQw4w9WgXcQ'
  }
]

const techProjects = [
  {
    title: 'AI Modeling',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/ai/800/600',
    description: 'Custom neural network implementation for predictive game AI.',
    learned: 'Machine learning fundamentals and data-driven decision making.',
    done: 'Developed the training pipeline and integrated the model into Unity.',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'Simulation Software',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/sim/800/600',
    description: 'Real-time fluid dynamics simulation for scientific visualization.',
    learned: 'Parallel computing with compute shaders and grid-based solvers.',
    done: 'Implemented the Navier-Stokes solver using WebGL.',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'Custom Shader Programming',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/shader/800/600',
    description: 'A library of high-performance HLSL shaders for AAA rendering.',
    learned: 'PBR workflows, ray-marching, and custom lighting models.',
    done: 'Wrote the interior mapping and atmospheric scattering shaders.',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'Real-time Raytracing',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/ray/800/600',
    description: 'DirectX Raytracing (DXR) sandbox for global illumination.',
    learned: 'Acceleration structures (BVH) and denoiser implementation.',
    done: 'Built the raytracing pipeline from scratch in C++.',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'Network Protocol Dev',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/net/800/600',
    description: 'High-performance UDP-based protocol for low-latency gaming.',
    learned: 'Reliable UDP, congestion control, and packet serialization.',
    done: 'Designed the protocol header and the packet acknowledgement system.',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'Cloud Infrastructure',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/cloud/800/600',
    description: 'Scalable backend for multiplayer match-making using AWS.',
    learned: 'Serverless architecture and database sharding.',
    done: 'Provisioned the infrastructure using Terraform and wrote Lambda functions.',
    youtube: 'dQw4w9WgXcQ'
  }
]

const scrollToSection = (index) => {
  if (index < 0 || index >= sections.length || (isAutoScrolling.value && index === currentIndex.value)) return

  currentIndex.value = index
  isAutoScrolling.value = true

  const target = document.getElementById(sections[index].id)
  if (target) {
    gsap.to(window, {
      duration: 0.2,
      scrollTo: { y: target.offsetTop, autoKill: false },
      ease: 'power4.out',
      overwrite: true,
      onComplete: () => {
        isAutoScrolling.value = false
      }
    })
  }

  history.pushState(null, null, `#${sections[index].id}`)
}

const handleWheel = (e) => {
  // Hard lock: stop all native and snap scrolling if modal is open
  if (isGlobalModalOpen.value) {
    e.preventDefault()
    return
  }
  
  e.preventDefault()
  if (isAutoScrolling.value) return
  if (e.deltaY > 0) {
    scrollToSection(currentIndex.value + 1)
  } else if (e.deltaY < 0) {
    scrollToSection(currentIndex.value - 1)
  }
}

const handleKeyDown = (e) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'].includes(e.code)) {
    e.preventDefault()
    if (isAutoScrolling.value) return
    if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
      scrollToSection(currentIndex.value + 1)
    } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
      scrollToSection(currentIndex.value - 1)
    }
  }
}

let touchStartY = 0
const handleTouchStart = (e) => {
  if (isGlobalModalOpen.value) {
    e.preventDefault()
    return
  }
  touchStartY = e.changedTouches[0].screenY
}

const handleTouchEnd = (e) => {
  if (isGlobalModalOpen.value) {
    e.preventDefault()
    return
  }
  if (isAutoScrolling.value) return
  const touchEndY = e.changedTouches[0].screenY
  const deltaY = touchStartY - touchEndY
  if (deltaY > 5) {
    scrollToSection(currentIndex.value + 1)
  } else if (deltaY < -5) {
    scrollToSection(currentIndex.value - 1)
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

  gsap.from('.hero__content', {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out'
  })

  gsap.from('.section__header', {
    scrollTrigger: {
      trigger: '.projects',
      start: 'top 80%'
    },
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out'
  })

  window.addEventListener('wheel', handleWheel, { passive: false })
  window.addEventListener('keydown', handleKeyDown, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: false })
  window.addEventListener('touchend', handleTouchEnd, { passive: false })

  const hash = window.location.hash.replace('#', '')
  if (hash) {
    const index = sections.findIndex(s => s.id === hash)
    if (index !== -1) {
      currentIndex.value = index
      const target = document.getElementById(hash)
      if (target) {
        window.scrollTo(0, target.offsetTop)
      }
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
})
</script>

<template>
  <main class="portfolio-main">
    <PortfolioNav
      :sections="sections"
      :current-index="currentIndex"
      @navigate="scrollToSection"
    />

    <PortfolioHero />

    <PortfolioCarousel
      id="games"
      label="GAMES"
      title="Games Showcase"
      :items="games"
    />

    <PortfolioCarousel
      id="technical-projects"
      label="TECHNICAL PROJECTS"
      title="Technical Project"
      :items="techProjects"
    />

    <PortfolioAbout />
  </main>
</template>

<style scoped>
.portfolio-main {
  height: 100vh;
  overflow: visible;
}
</style>
