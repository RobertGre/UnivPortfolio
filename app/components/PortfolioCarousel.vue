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
const hoveredZone = ref(null) // null, -1 (prev), 0 (current), 1 (next)
const isPaused = ref(false)
const isWindowFocused = ref(true)
const isModalOpen = ref(false)
const isGlobalModalOpen = useState('isModalActive', () => false)
watch(isModalOpen, (val) => {
  isGlobalModalOpen.value = val
})

const selectedProject = ref(null)
const carouselRef = ref(null)
const isVisible = ref(false)

const currentIndex = computed(() => {
  const len = props.items.length
  return ((rotationIndex.value % len) + len) % len
})

const activeHoverIndex = computed(() => {
  if (hoveredZone.value === null) return null
  const len = props.items.length
  const targetRotation = rotationIndex.value + hoveredZone.value
  return ((targetRotation % len) + len) % len
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
    if (!isPaused.value && !isModalOpen.value && isWindowFocused.value && isVisible.value) {
      nextRotation()
    }
  }, 6000)
}

const stopAutoRotate = () => {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval)
  }
}

const handleFocus = () => {
  isWindowFocused.value = true
}
const handleBlur = () => {
  isWindowFocused.value = false
}

// Close modal on scroll
const handleGlobalScroll = (e) => {
  if (isModalOpen.value) {
    // If scrolling over the modal content, let it scroll normally
    if (e.target && e.target.closest && e.target.closest('.project-modal')) {
      return
    }

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
  window.addEventListener('focus', handleFocus)
  window.addEventListener('blur', handleBlur)

  // Visibility detection
  const observer = new IntersectionObserver((entries) => {
    isVisible.value = entries[0].isIntersecting
  }, { threshold: 0.3 })

  if (carouselRef.value) {
    observer.observe(carouselRef.value)
  }
})

onUnmounted(() => {
  stopAutoRotate()
  window.removeEventListener('wheel', handleGlobalScroll, { capture: true })
  window.removeEventListener('touchmove', handleGlobalScroll, { capture: true })
  window.removeEventListener('focus', handleFocus)
  window.removeEventListener('blur', handleBlur)
})

// 3D Math for Bent Cylinder
const radius = computed(() => {
  const count = props.items.length
  const width = 340
  // Dynamic base radius calculation
  const baseRadius = Math.round((width / 2) / Math.tan(Math.PI / count))

  // Adaptive offset: smaller sets (like 3 items) get a much smaller offset
  // to keep the "previous/next" cards visible and accessible.
  const adaptiveOffset = count <= 3 ? 120 : 300

  return baseRadius + adaptiveOffset
})

const getItemStyle = (index) => {
  const count = props.items.length
  const angle = 360 / count
  const itemAngle = angle * index

  const relAngle = ((itemAngle - angle * rotationIndex.value + 180) % 360 + 360) % 360 - 180
  const absRelAngle = Math.abs(relAngle)

  const angleCorrection = -relAngle * 0.35
  const skewY = relAngle * 0.05

  // WIDE RECTANGLE SCALING - Now uniform to prevent stretching
  let scale = 1
  if (absRelAngle < angle) {
    const t = 1 - (absRelAngle / angle)
    scale = 1 + (t * 0.45) // Uniform scale factor
  }

  const brightness = Math.max(1.1 - absRelAngle / 100, 0.2)
  const opacity = Math.max(1.1 - absRelAngle / 120, 0.3)

  return {
    transform: `rotateY(${itemAngle}deg) translateZ(${radius.value}px) rotateY(${angleCorrection}deg) skewY(${skewY}deg) scale(${scale})`,
    filter: absRelAngle > 1 ? `brightness(${brightness})` : 'none',
    opacity: opacity,
    zIndex: Math.round(1000 - absRelAngle),
    transition: 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.4s ease',
    willChange: 'transform, opacity'
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
</script>

<template>
  <section
    :id="id"
    ref="carouselRef"
    class="projects section"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <Transition name="fade-fast">
      <div
        v-if="!isModalOpen"
        class="section__header absolute top-[2rem] inset-x-0 flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <div class="cyber-box px-8 py-3">
          <p class="section__label !mb-0 font-black">
            {{ label }}
          </p>
        </div>
      </div>
    </Transition>

    <div class="carousel-container relative w-full h-full flex items-center justify-center overflow-visible">
      <!-- 3D Carousel -->
      <div
        class="carousel"
        :aria-label="`${title} carousel`"
      >
        <div class="carousel__viewport">
          <div class="sphere-glow" />

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
              :class="{ 'active': currentIndex === index, 'glow-target': activeHoverIndex === index }"
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
                      :style="{
                        backgroundImage: item.bg && item.bg !== '#' ? `url(${item.bg})` : '',
                        backgroundSize: item.bgSize || 'cover',
                        backgroundPosition: item.bgPos || 'center'
                      }"
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

        <!-- Navigation Overlays moved outside 3D viewport to ensure they stay on top -->
        <div class="carousel__nav-overlay">
          <div
            class="nav-zone nav-zone--side"
            @click.stop="prevRotation"
            @mouseenter="hoveredZone = -1"
            @mouseleave="hoveredZone = null"
          />
          <div
            class="nav-zone nav-zone--center"
            @click.stop="handleCardClick(currentIndex)"
            @mouseenter="hoveredZone = 0"
            @mouseleave="hoveredZone = null"
          />
          <div
            class="nav-zone nav-zone--side"
            @click.stop="nextRotation"
            @mouseenter="hoveredZone = 1"
            @mouseleave="hoveredZone = null"
          />
        </div>
      </div>

      <!-- Integrated Modal Content -->
      <PortfolioProjectModal
        v-model="isModalOpen"
        :project="selectedProject"
        :section-title="title"
        @close="isModalOpen = false"
      />
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
  width: 800px;
  height: 600px; /* Reduced height to fit better in screen */
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
  height: 800px;
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
  transition: transform 4s cubic-bezier(0.2, 1, 0.3, 1);
}

.carousel__item-3d {
  position: absolute;
  width: 500px;
  height: 700px;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  backface-visibility: hidden;
  pointer-events: auto;
  overflow: visible !important;
  margin-left: -250px;
  margin-top: -350px;
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
  top: calc(50% + 380px); /* Nudged another 10px down */
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
  box-shadow: 0 0 25px rgba(116, 245, 255, 0.25), 0 0 60px rgba(110, 61, 255, 0.1);
  border-color: rgba(116, 245, 255, 0.35);
}

.active.glow-target .bent-card {
  border-color: var(--accent);
  box-shadow: 0 0 35px rgba(116, 245, 255, 0.35), 0 0 80px rgba(110, 61, 255, 0.15);
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
  background-repeat: no-repeat;
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
