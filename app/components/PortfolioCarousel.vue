<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})

// rotationIndex tracks the "virtual" position for infinite spinning
const rotationIndex = ref(0)
const hoverIndex = ref(null)
const isPaused = ref(false)
const isModalOpen = ref(false)
const isGlobalModalOpen = useState('isModalActive', () => false)
watch(isModalOpen, (val) => { isGlobalModalOpen.value = val })

const selectedProject = ref(null)

const currentIndex = computed(() => {
  const len = props.items.length
  return ((rotationIndex.value % len) + len) % len
})

const goToRotation = (offset) => {
  rotationIndex.value += offset
}

const prevRotation = () => goToRotation(-1)
const nextRotation = () => goToRotation(1)

// Auto-rotation logic
let autoRotateInterval = null
const startAutoRotate = () => {
  stopAutoRotate()
  autoRotateInterval = setInterval(() => {
    if (!isPaused.value && !isModalOpen.value) {
      nextRotation()
    }
  }, 3500)
}

const stopAutoRotate = () => {
  if (autoRotateInterval) clearInterval(autoRotateInterval)
}

// Close modal on scroll
const handleGlobalScroll = (e) => {
  if (isModalOpen.value) {
    if (Math.abs(e.deltaY) > 5 || (e.touches && e.touches.length > 0)) {
      isModalOpen.value = false
      // Kill browser-level momentum and stop propagation to index.vue
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
  }
}

onMounted(() => {
  startAutoRotate()
  window.addEventListener('wheel', handleGlobalScroll, { capture: true, passive: false })
  window.addEventListener('touchmove', handleGlobalScroll, { capture: true, passive: false })
})

onUnmounted(() => {
  stopAutoRotate()
  window.removeEventListener('wheel', handleGlobalScroll, { capture: true })
  window.removeEventListener('touchmove', handleGlobalScroll, { capture: true })
})

// 3D Math for Bent Cylinder
const radius = computed(() => {
  const count = props.items.length
  const width = 340 
  return Math.round((width / 2) / Math.tan(Math.PI / count)) + 300 
})

const getItemStyle = (index) => {
  const count = props.items.length
  const angle = 360 / count
  const itemAngle = angle * index
  
  const relAngle = ((itemAngle - angle * rotationIndex.value + 180) % 360 + 360) % 360 - 180
  const absRelAngle = Math.abs(relAngle)

  const angleCorrection = -relAngle * 0.35
  const skewY = relAngle * 0.05

  // WIDE RECTANGLE SCALING
  let scaleX = 1
  let scaleY = 1
  if (absRelAngle < angle) {
    const t = 1 - (absRelAngle / angle)
    scaleX = 1 + (t * 0.65)
    scaleY = 1 + (t * 0.25)
  }

  const blurAmount = Math.min(absRelAngle / 10, 5)
  const brightness = Math.max(1.1 - absRelAngle / 100, 0.2)
  const opacity = Math.max(1.1 - absRelAngle / 120, 0.3)

  return {
    transform: `rotateY(${itemAngle}deg) translateZ(${radius.value}px) rotateY(${angleCorrection}deg) skewY(${skewY}deg) scale(${scaleX}, ${scaleY})`,
    filter: absRelAngle > 1 ? `blur(${blurAmount}px) brightness(${brightness})` : 'none',
    opacity: opacity,
    zIndex: Math.round(1000 - absRelAngle),
    transition: 'transform 2s cubic-bezier(0.4, 0, 0.2, 1), filter 1.2s ease, opacity 1.2s ease'
  }
}

// Enhanced Shading
const getCardShading = (index) => {
  const count = props.items.length
  const angle = 360 / count
  const itemAngle = angle * index
  const relAngle = ((itemAngle - angle * rotationIndex.value + 180) % 360 + 360) % 360 - 180
  
  const highlightPos = 50 + (relAngle * 1.2)
  const shadowSide = relAngle > 0 ? 'right' : 'left'
  const shadowIntensity = Math.min(Math.abs(relAngle) / 60, 0.6)

  return {
    background: `radial-gradient(circle at ${highlightPos}% 30%, rgba(255,255,255,0.12) 0%, transparent 60%),
                linear-gradient(to ${shadowSide}, rgba(0,0,0,${shadowIntensity}) 0%, transparent 50%)`
  }
}

const ringStyle = computed(() => {
  const count = props.items.length
  const angle = 360 / count
  return {
    transform: `translateZ(${-radius.value}px) rotateY(${-angle * rotationIndex.value}deg)`
  }
})

const handleCardClick = (index) => {
  if (index === currentIndex.value) {
    selectedProject.value = props.items[index]
    isModalOpen.value = true
  } else {
    const len = props.items.length
    let diff = index - currentIndex.value
    if (diff > len / 2) diff -= len
    if (diff < -len / 2) diff += len
    rotationIndex.value += diff
  }
}

const getHoverIndex = (offset) => {
  const len = props.items.length
  const targetRotation = rotationIndex.value + offset
  return ((targetRotation % len) + len) % len
}
</script>

<template>
  <section
    :id="id"
    class="projects section"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <Transition name="fade-fast">
      <div
        v-if="!isModalOpen"
        class="section__header absolute top-[4rem] inset-x-0 flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <p class="section__label">
          {{ label }}
        </p>
      </div>
    </Transition>

    <div class="carousel-container relative w-full h-full flex items-center justify-center overflow-visible">
      <!-- 3D Carousel -->
      <Transition name="fade">
        <div
          v-if="!isModalOpen"
          class="carousel"
          :aria-label="`${title} carousel`"
        >
          <div class="carousel__viewport">
            <div class="sphere-glow" />

            <!-- Navigation Overlays -->
            <div class="carousel__nav-overlay">
              <div
                class="nav-zone nav-zone--side"
                @click="prevRotation"
                @mouseenter="hoverIndex = getHoverIndex(-1)"
                @mouseleave="hoverIndex = null"
              />
              <div
                class="nav-zone nav-zone--center"
                @click="handleCardClick(currentIndex)"
                @mouseenter="hoverIndex = currentIndex"
                @mouseleave="hoverIndex = null"
              />
              <div
                class="nav-zone nav-zone--side"
                @click="nextRotation"
                @mouseenter="hoverIndex = getHoverIndex(1)"
                @mouseleave="hoverIndex = null"
              />
            </div>

            <div class="carousel__counter">
              <span
                v-for="(_, i) in items"
                :key="i"
                class="counter-dot"
                :class="{ active: i === currentIndex }"
              />
            </div>

            <div
              class="carousel__ring"
              :style="ringStyle"
            >
              <article
                v-for="(item, index) in items"
                :key="index"
                class="carousel__item-3d"
                :class="{ active: currentIndex === index, 'glow-target': hoverIndex === index }"
                :style="getItemStyle(index)"
                @click.stop="handleCardClick(index)"
              >
                <!-- This container is now massive to prevent clipping -->
                <div class="glow-boundary">
                  <div class="bent-card cursor-pointer border-none">
                    <div
                      class="bent-card__shading"
                      :style="getCardShading(index)"
                    />

                    <div class="bent-card__inner p-4 sm:p-8">
                      <div
                        class="card__image-bent"
                        :style="{ backgroundImage: item.bg && item.bg !== '#' ? `url(${item.bg})` : '' }"
                      />
                      <div class="bent-card__content w-full">
                        <h3 class="text-clamp px-2">
                          {{ item.title }}
                        </h3>
                        <div
                          v-if="currentIndex === index"
                          class="view-indicator"
                        >
                          <span>TAP TO VIEW DETAILS</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Integrated Modal Content -->
      <Transition name="fade-instant">
        <div
          v-if="isModalOpen"
          class="absolute inset-x-0 -top-[7rem] bottom-0 flex items-start justify-center z-50 overflow-visible"
        >
          <PortfolioProjectModal
            v-model="isModalOpen"
            :project="selectedProject"
            :section-title="title"
            @close="isModalOpen = false"
          />
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.section {
  position: relative;
  height: 100vh;
  overflow: visible !important;
}

.carousel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 4500px;
  overflow: visible !important;
}

.carousel__viewport {
  position: relative;
  width: 700px; /* ENORMOUS VIEWPORT */
  height: 700px;
  transform-style: preserve-3d;
  margin: 0 auto;
  overflow: visible !important;
}

.sphere-glow {
  position: absolute;
  inset: -300px -600px;
  background: radial-gradient(circle at center, rgba(116, 245, 255, 0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
  transform: translateZ(-600px);
}

.carousel__nav-overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 600px;
  display: flex;
  z-index: 2000;
  pointer-events: none;
}

.nav-zone {
  pointer-events: auto;
  cursor: pointer;
}

.nav-zone--side {
  width: 300px;
}

.nav-zone--center {
  flex: 1;
}

.carousel__ring {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 2s cubic-bezier(0.2, 1, 0.3, 1);
}

.carousel__item-3d {
  position: absolute;
  /* NEW: The item container is now huge, 
     effectively moving the clipping border far away from the card center */
  width: 800px; 
  height: 800px;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  backface-visibility: hidden;
  pointer-events: auto;
  overflow: visible !important;
  /* Centering card within this massive envelope */
  margin-left: -400px;
  margin-top: -400px;
}

.glow-boundary {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible !important;
}

.carousel__item-3d.active {
  z-index: 1000 !important;
}

.text-clamp {
  font-size: clamp(0.9rem, 2.2vw, 1.6rem);
  font-weight: 900;
  line-height: 1.2;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
}

/* Counter Dots */
.carousel__counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 1001;
}

.counter-dot {
  width: 12px;
  height: 3px;
  background: rgba(116, 245, 255, 0.1);
  transition: all 0.5s ease;
}

.counter-dot.active {
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
  width: 30px;
}

/* Bent Card Styling - FIXED CARD SIZE */
.bent-card {
  width: 340px; /* Actual card size remains fixed */
  height: 480px;
  position: relative;
  background: transparent;
  border-radius: 32px;
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  overflow: visible !important; 
  box-shadow: 0 25px 60px rgba(0,0,0,0.5);
  border: 2px solid transparent;
  outline: none !important;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.glow-target .bent-card {
  box-shadow: 0 0 40px rgba(116, 245, 255, 0.4), 0 0 100px rgba(110, 61, 255, 0.2);
  border-color: rgba(116, 245, 255, 0.5);
}

.active.glow-target .bent-card {
  border-color: var(--accent);
  box-shadow: 0 0 60px rgba(116, 245, 255, 0.5), 0 0 140px rgba(110, 61, 255, 0.3);
}

.bent-card__shading {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  border-radius: 32px;
  mix-blend-mode: multiply;
  transition: background 1s ease;
}

.bent-card__inner {
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 3.5rem;
  text-align: center;
  position: relative;
  overflow: hidden; /* Cops ONLY the image */
}

.card__image-bent {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  transition: opacity 0.5s ease, transform 1s ease;
}

.active .card__image-bent {
  opacity: 0.75;
}

.bent-card__content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.bent-card__content h3 {
  margin: 0;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  line-height: 1.1;
  transition: font-size 0.5s ease;
}

.view-indicator {
  margin-top: 1rem;
  font-size: 0.7rem;
  color: var(--accent);
  font-weight: 900;
  letter-spacing: 0.3em;
  opacity: 0.8;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.fade-fast-enter-active, .fade-fast-leave-active {
  transition: opacity 0.3s ease;
}
.fade-fast-enter-from, .fade-fast-leave-to {
  opacity: 0;
}

.fade-instant-enter-active, .fade-instant-leave-active {
  transition: opacity 0.1s ease;
}
.fade-instant-enter-from, .fade-instant-leave-to {
  opacity: 0;
}

@media (max-width: 800px) {
  .carousel {
    height: 600px;
  }
  .carousel__viewport, .carousel__item-3d {
    width: 280px;
    height: 420px;
  }
  .carousel__nav-overlay {
    width: 100%;
  }
  .nav-zone--side {
    width: 80px;
  }
}
</style>
