<script setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import shaderBg from '~/assets/shaderprogrammingbg.jpg'
import fyipCard from '~/assets/fyipimage.jpg'
import eroCard from '~/assets/EROcardimage.png'
import eotttCard from '~/assets/EOTTTimage.png'
import echoCard from '~/assets/Echoimage.jpg'
import peterCard from '~/assets/PeterDefeater.png'
import minigamesCard from '~/assets/year1minigamesimage.jpg'
import jamsCard from '~/assets/gamejamsimage.jpg'

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
    year: '2025',
    isTech: true,
    bg: echoCard,
    description: 'Atmospheric puzzle game (UE). Features interactive CCTV mechanics, tactile object inspection, and responsive level design. Players solve environmental puzzles through critical thinking and exploration in a suspenseful setting.',
    learned: 'Mastered player-centric design through iterative playtesting. Learned to identify and fix UX friction points—like awkward interaction angles—to ensure mechanics are as intuitive as the puzzles are clever.',
    done: 'Iterative Design & Polish:\n- Analyzed playtests to overhaul UI/UX and interaction ranges.\n- Replaced text prompts with intuitive 3D rotation icons.\n- Restructured collision systems to fix physical clipping in wardrobe mechanics.\n- Expanded scope with additional puzzles and a satisfying alternate ending.',
    summary: 'Engineered core gameplay systems including a functional CCTV mechanic for spatial observation, complex physics-based object interactions for clue discovery, and balanced environmental puzzle logic designed to challenge critical thinking without sacrificing player flow.',
    youtube: 'o1Nd_0fGwSg'
  },
  {
    title: 'Echoes Of The Twin Tombs',
    year: '2025',
    isTech: true,
    bg: eotttCard,
    bgSize: 'cover',
    bgPos: '100% center',
    description: 'Asymmetrical VR co-op escape room (Unity, Normcore, XRIT). Two players—the Engineer and the Navigator—collaborate across physical spaces using forced asymmetric knowledge to solve ancient puzzles through continuous verbal communication.',
    learned: 'Balanced network engineering with immersive design. Gained expertise in motion sickness mitigation, optimized physics calculations, and conceptualizing aesthetics that leverage VR\'s unique strengths.',
    done: 'Art Direction & Pre-Production:\n- Directed the Egyptian Tomb aesthetic for immersion and comfort.\n- Mapped complex networked puzzle states via Excalidraw and Mermaid.\n- Aligned teams to prevent scope creep and ensure thematic cohesion.',
    summary: 'Developed advanced XR systems featuring recursive raycasting for networked laser puzzles, zero-latency tactile interactions utilizing XRIT and Normcore interpolation, and immersive multi-sensory feedback loops that synchronize spatial audio with dynamic visual cues.',
    youtube: 'yrYdrjQj2Is'
  },
  {
    title: 'E.R.O.',
    year: '2025',
    fullTitle: 'Experimental Reconstruction Organism',
    itch: 'https://altf5studios.itch.io/ero',
    bg: eroCard,
    description: 'Gameplay & Blueprint Replication Programmer (UE5). A co-op sandbox survival game where players awaken as cyborgs on a fractured island. Features resource gathering, crafting, and base-building in a stylized low-poly world.',
    learned: 'Mastered UE5\'s Blueprint replication. Learned to separate server authority from client-side logic, translating complex networking concepts into robust, synchronized multiplayer gameplay.',
    done: 'Gameplay & Systems Programming:\n- Developed core crafting, tree-chopping, and base-building with ghost previews.\n- Engineered logic for interactable items and gameplay props in a shared environment.\n- Collaborated on resource consumption and authorized server-client actions.',
    summary: 'Spearheaded Blueprint replication architecture by implementing robust server-client communication via RPCs and variable replication, while maintaining detailed technical documentation to synchronize complex environmental mechanics like dynamic day/night cycles across a shared world.',
    youtube: 'APRTWH3-Zko'
  },
  {
    title: 'Minigames',
    year: '2024',
    hideLinks: true,
    isMinigame: true,
    bg: minigamesCard,
    description: 'A collection of formative university projects including "Extraterrestrial Escape" (3D Survival/Stealth) and "!super!mario" (2D Platformer). These projects represent my transition from solo learning to collaborative group environments.',
    learned: 'Solidified skills in rapid prototyping, 3D physics, and managing scope within team environments. Laid the groundwork for 2D physics, collision detection, and formal game loops.',
    done: 'Key Contributions:\n- Programmed physics-based FPC utilizing Unity\'s New Input System.\n- Developed 2D platformer mechanics including coin/key collection.',
    youtube: 'id97n-Y8GKk'
  },
  {
    title: 'Game Jams',
    year: '2024-2026',
    hideLinks: true,
    isGameJam: true,
    bg: jamsCard,
    description: 'Cornerstone of my growth as a developer. These 48-hour sprints test project management, risk assessment, and technical versatility. Evolved from a novice into a technical facilitator bridging code, art, and audio.',
    learned: 'Taught the value of "technical glue" roles, the absolute necessity of strict Git version control, and timeboxing tasks under extreme pressure. Cemented industry standards for rapid iteration and hardware preparedness.',
    done: 'The Monster Rush:\n- UI Programmer & Audio Integrator. Subverted the "Moderation" theme with rule-breaking comedic loops.\n\nSplash N\' Dash:\n- Technical Developer & 3D Artist. Physics-based QWOP-style kayaking prototype under extreme logistical hurdles.\n\nColosseum Ascendant:\n- Support Programmer. Swords and Sandals-inspired RPG withStat allocation and knowledge checks.',
    youtube: '3mIomRHWbt8'
  }
]

const techProjects = [
  {
    title: 'FIRE SAFETY SIMULATION',
    isTech: true,
    bg: fyipCard,
    description: 'A 3D, AI-powered crowd simulation developed in Unity to optimize emergency evacuation planning by modeling dynamic fire hazards and realistic human psychological friction.',
    learned: 'Unity 3D, C#, Agent-Based Modeling, Finite State Machines (FSM), Custom Pathfinding, Explainable AI (XAI) Logging.',
    done: 'Engineered autonomous agents with decentralized perception, cognitive delays, and peer-to-peer hazard communication to benchmark adaptive survival rates against static routing.',
    summary: 'Traditional evacuation models often use static routing that ignores human panic. This 3D prototype stress-tests terminal layouts using perception-driven AI. Agents feature realistic constraints like restricted vision and cognitive delays, triggering peer-to-peer "Information Cascades". The simulation benchmarked a traditional model against this Adaptive AI; while static routing led to fatal bottlenecks, the Adaptive AI achieved a 100% survival rate by rerouting dynamically. Includes an XAI logging architecture for predictive diagnostic planning.',
    youtube: '2A2KRqsTGFw'
  },
  {
    title: 'OOP SHOWCASE',
    fullTitle: 'Peter Defeater (OOP)',
    year: '2025',
    isTech: true,
    bg: peterCard,
    description: '2D top-down shooter (Unity/C#) built as an academic showcase for strict OOP methodologies. Features modular weapon systems, hierarchical AI, and clean data encapsulation for code reusability.',
    learned: 'Deep dive into advanced software architecture. Learned to separate core logic from standard MonoBehaviours, building robust hierarchies where new content can be added with minimal friction.',
    done: 'Core Technical Contributions:\n- Designed polymorphic weapon architecture using custom base classes.\n- Architected modular enemy framework with hierarchical AI behaviors.\n- Implemented Enum-based state machines and Physics2D raycast detection.\n- Enforced strict encapsulation and clean code principles throughout.',
    summary: 'Developed a scalable OOP-driven architecture in Unity, featuring a polymorphic weapon system, hierarchical AI frameworks for diverse enemy behaviors, and dynamic loot systems, all built on strict encapsulation principles for high code reusability and long-term maintainability.',
    youtube: '6YwtFNX7aBQ'
  },
  {
    title: 'SHADER PROGRAMMING',
    isTech: true,
    bg: shaderBg,
    description: 'A real-time cinematic scene driven by advanced GPU pixel math and custom HLSL. Designed to create an oppressive environment, this project treats ancient magic as a reactive, hostile presence. By offloading complex volumetric and fluid calculations entirely to the GPU, the scene achieves high visual density without the performance costs of standard physics or heavy overdraw, running at a flawless 60–105 FPS on Cinematic scalabilities.',
    learned: 'Unreal Engine 5, Custom HLSL, Procedural Raytracing, Niagara Systems, Performance Optimization, Post-Process Materials.',
    done: 'Engineered a suite of custom mathematical shaders including a parallax ray-traced demon eye, procedural fire, and volume-less fluid simulation bypassing traditional rendering pipelines to maximize GPU performance.',
    summary: 'A technical showcase of advanced GPU optimization featuring custom HLSL shaders for procedural ray-traced parallax effects, CPU-less volumetric fluid simulations, and mathematically driven fire effects (FBM) that eliminate overdraw while maintaining high Cinematic performance.',
    youtube: 'BtiMmb95DH4'
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

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false
  // Use innerWidth instead of maxTouchPoints. Many modern Windows laptops
  // report touch points, breaking mouse-wheel logic.
  // 1024px and below is typically considered our "mobile/tablet" cutoff.
  return window.innerWidth <= 1024
}

const scrollCooldown = ref(false)
let lastScrollTime = 0

const handleWheel = (e) => {
  // Hard lock: stop all native and snap scrolling if modal is open
  if (isGlobalModalOpen.value) {
    // If the target is the modal or inside it, don't prevent default to allow modal scrolling
    if (e.target.closest('.project-modal')) return
    e.preventDefault()
    return
  }

  // Prevent scrolling for a brief moment after modal closes to absorb momentum
  if (scrollCooldown.value) {
    e.preventDefault()
    return
  }

  if (isTouchDevice()) return // Disable wheel snapping on mobile/tablet viewports

  e.preventDefault()

  const now = Date.now()
  // Global Debounce: Wait 1.2 seconds between section snaps to absorb trackpad momentum
  if (isAutoScrolling.value || now - lastScrollTime < 1200) return

  if (e.deltaY > 0) {
    scrollToSection(currentIndex.value + 1)
    lastScrollTime = now
  } else if (e.deltaY < 0) {
    scrollToSection(currentIndex.value - 1)
    lastScrollTime = now
  }
}

const gamesCarousel = ref(null)
const techCarousel = ref(null)

const handleKeyDown = (e) => {
  if (isGlobalModalOpen.value) {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'].includes(e.code)) {
      e.preventDefault()
    }
    return
  }

  // Horizontal Carousel Navigation (Left/Right Arrows)
  if (e.key === 'ArrowRight') {
    if (sections[currentIndex.value].id === 'games' && gamesCarousel.value) {
      gamesCarousel.value.next()
      return
    }
    if (sections[currentIndex.value].id === 'technical-projects' && techCarousel.value) {
      techCarousel.value.next()
      return
    }
  }
  if (e.key === 'ArrowLeft') {
    if (sections[currentIndex.value].id === 'games' && gamesCarousel.value) {
      gamesCarousel.value.prev()
      return
    }
    if (sections[currentIndex.value].id === 'technical-projects' && techCarousel.value) {
      techCarousel.value.prev()
      return
    }
  }

  // Enter Key: Trigger click (open modal) on active project
  if (e.key === 'Enter') {
    if (sections[currentIndex.value].id === 'games' && gamesCarousel.value) {
      gamesCarousel.value.triggerClick()
      return
    }
    if (sections[currentIndex.value].id === 'technical-projects' && techCarousel.value) {
      techCarousel.value.triggerClick()
      return
    }
  }

  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space'].includes(e.code)) {
    if (isTouchDevice()) return

    e.preventDefault()
    if (isAutoScrolling.value) return
    if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
      scrollToSection(currentIndex.value + 1)
    } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
      scrollToSection(currentIndex.value - 1)
    }
  }
}

// Reactively lock the body to prevent middle-click scrolling and all other native scroll methods
watch(isGlobalModalOpen, (isOpen) => {
  if (isOpen) {
    if (window.innerWidth <= 1024) {
      // Animated alignment for mobile: smoothly center the section before locking the body
      const target = document.getElementById(sections[currentIndex.value].id)
      if (target) {
        const viewportHeight = window.innerHeight
        const targetHeight = target.offsetHeight
        const scrollToY = target.offsetTop - (viewportHeight - targetHeight) / 2

        gsap.to(window, {
          duration: 0.4, // Matches modal fade-in time
          scrollTo: { y: scrollToY, autoKill: false },
          ease: 'power2.out',
          onComplete: () => {
            document.body.style.overflow = 'hidden'
            document.body.style.touchAction = 'none'
          }
        })
      } else {
        document.body.style.overflow = 'hidden'
        document.body.style.touchAction = 'none'
      }
    } else {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    }
  } else {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''

    // Add scroll cooldown to prevent momentum scrolling from triggering section snap immediately after modal close
    scrollCooldown.value = true
    setTimeout(() => {
      scrollCooldown.value = false
    }, 600)
  }
}, { immediate: true })

const updateIndexOnScroll = () => {
  if (isAutoScrolling.value) return

  const scrollPos = window.scrollY + window.innerHeight / 2
  const newIndex = sections.findIndex((section) => {
    const el = document.getElementById(section.id)
    if (!el) return false
    return scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight
  })

  if (newIndex !== -1 && newIndex !== currentIndex.value) {
    currentIndex.value = newIndex
    history.replaceState(null, null, `#${sections[newIndex].id}`)
  }
}

const handleMouseDown = (e) => {
  if (e.button === 1) e.preventDefault()
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
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('scroll', updateIndexOnScroll)

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
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('scroll', updateIndexOnScroll)
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
      ref="gamesCarousel"
      label="GAME PROJECTS"
      title="Games Showcase"
      :items="games"
    />

    <PortfolioCarousel
      id="technical-projects"
      ref="techCarousel"
      label="TECHNICAL PROJECTS"
      title="Technical Projects"
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
