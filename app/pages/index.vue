<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import shaderBg from '~/assets/shaderprogrammingbg.jpg'

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
    title: 'Extended Realities',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/xr/800/600',
    description: 'Project details coming soon.',
    learned: 'TBD',
    done: 'TBD',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'E.R.O.',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/fyp/800/600',
    description: 'Project details coming soon.',
    learned: 'TBD',
    done: 'TBD',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'Games and Interactive Systems',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/gis/800/600',
    description: 'Project details coming soon.',
    learned: 'TBD',
    done: 'TBD',
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
    title: 'ADAPTIVE CROWD SIMULATION',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/sim/800/600',
    description: 'A 3D, AI-powered crowd simulation developed in Unity to optimize emergency evacuation planning by modeling dynamic fire hazards and realistic human psychological friction.',
    learned: 'Unity 3D, C#, Agent-Based Modeling, Finite State Machines (FSM), Custom Pathfinding, Explainable AI (XAI) Logging.',
    done: 'Engineered autonomous agents with decentralized perception, cognitive delays, and peer-to-peer hazard communication to benchmark adaptive survival rates against static routing.',
    summary: 'Traditional airport evacuation models often rely on deterministic, static routing that fails to account for dynamic hazards and panic-induced human friction. This project is a 3D functional prototype designed to proactively stress-test terminal layouts during fire emergencies. Rather than treating crowds as a homogenous swarm with flawless global map knowledge, the system uses perception-driven AI. Agents were programmed with realistic psychological constraints, including restricted visual angles, cognitive reaction delays, and the ability to trigger "Information Cascades" via peer-to-peer data transmission. By running computational evaluations under extreme environmental stress, the simulation benchmarked a traditional "Global Knowledge" model against this custom Adaptive AI. While the static model suffered severe evacuation delays and fatalities by routing agents blindly through active hazards, the Adaptive AI successfully simulated human "herd behavior." Agents yielded to congestion, rerouted dynamically based on localized visual perception, and achieved a flawless 100% survival rate by bypassing fatal bottlenecks. Complete with an Explainable AI (XAI) data-logging architecture, this prototype serves as a predictive diagnostic tool to help architectural planners optimize life-saving crisis response.',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'SHADER PROGRAMMING',
    link: 'https://github.com',
    bg: shaderBg,
    description: 'A real-time cinematic scene driven by advanced GPU pixel math and custom HLSL. Designed to create an oppressive environment, this project treats ancient magic as a reactive, hostile presence. By offloading complex volumetric and fluid calculations entirely to the GPU, the scene achieves high visual density without the performance costs of standard physics or heavy overdraw, running at a flawless 60–105 FPS on Cinematic scalabilities.',
    learned: 'Unreal Engine 5, Custom HLSL, Procedural Raytracing, Niagara Systems, Performance Optimization, Post-Process Materials.',
    done: 'Engineered a suite of custom mathematical shaders including a parallax ray-traced demon eye, procedural fire, and volume-less fluid simulation bypassing traditional rendering pipelines to maximize GPU performance.',
    summary: 'Core Technical Implementations:\n\nProcedural Raytraced Eye: A textureless, parallax "Demon Eye" built using HLSL ray-sphere intersection. It calculates its own dynamic specular highlights and dilates its pupil based on camera proximity.\n\nGPU-Driven Liquid Volume: A fluid simulation that bypasses CPU physics. It mathematically calculates complex surface tension using absolute world position, procedural sphere masks, and multi-directional panning normals.\n\nProcedural Fire & Volumetrics: Fire effects generated through mathematical erosion, smooth-stepping, and Fractional Brownian Motion (FBM) on a single masked geometry, completely eliminating traditional particle overdraw.\n\nReactive Post-Processing: A dynamic screen vignette that communicates with the 3D environment via Material Parameter Collections (MPCs), physically constricting the player\'s vision as they approach the focal point.',
    youtube: 'BtiMmb95DH4'
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
  },
  {
    title: 'Artificial Intelligence for Games',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/aigames/800/600',
    description: 'Project details coming soon.',
    learned: 'TBD',
    done: 'TBD',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'PETER DEFEATER',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/oop/800/600',
    description: 'Project details coming soon.',
    learned: 'TBD',
    done: 'TBD',
    youtube: 'dQw4w9WgXcQ'
  },
  {
    title: 'HEATMAP',
    link: 'https://github.com',
    bg: 'https://picsum.photos/seed/gt/800/600',
    description: 'An Unreal Engine plugin designed to generate visual heatmaps, tracking and analyzing player movement to identify the most accessed areas of a map.',
    learned: 'Unreal Engine Plugin Architecture, C++, Data Visualization, Spatial Analysis.',
    done: 'Developed a custom tool for level designers to optimize player flow based on empirical movement data.',
    youtube: 'dQw4w9WgXcQ'
  }
]

const scrollToSection = (index) => {
  if (index < 0 || index >= sections.length || (isAutoScrolling.value && index === currentIndex.value)) return

  currentIndex.value = index
  isAutoScrolling.value = true

  const target = document.getElementById(sections[index].id)
  if (target) {
    // Calculate the position to center the section in the viewport
    const viewportHeight = window.innerHeight
    const targetHeight = target.offsetHeight
    const scrollToY = target.offsetTop - (viewportHeight - targetHeight) / 2

    gsap.to(window, {
      duration: 0.6, // Slightly longer duration for smoother snap
      scrollTo: { y: scrollToY, autoKill: false },
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
      label="GAME PROJECTS"
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
  min-height: 100vh;
  overflow: visible;
}
</style>
