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

const carouselScale = ref(1)
const isMobile = ref(false)

const updateScale = () => {
  if (typeof window === 'undefined') return
  const width = window.innerWidth
  isMobile.value = width <= 1024
  if (width > 1024) {
    // Desktop scaling: reduced to 75% of original baseline (0.75 * width / 1440)
    carouselScale.value = (width / 1440) * 0.75
  } else if (width > 640) {
    // Tablet scaling
    carouselScale.value = (width / 800) * 0.95
  } else {
    // Mobile scaling: slightly more compact to give breathing room for headers on vertical screens
    carouselScale.value = (width / 420) * 0.78
  }
}

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

const getRelIndex = (index) => {
  const count = props.items.length
  let relIndex = index - rotationIndex.value
  const half = count / 2
  while (relIndex > half) relIndex -= count
  while (relIndex <= -half) relIndex += count
  return relIndex
}

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

let touchStartX = 0
let touchStartY = 0

const handleTouchStartLocal = (e) => {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

const handleTouchEndLocal = (e) => {
  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY

  const deltaX = touchStartX - touchEndX
  const deltaY = Math.abs(touchStartY - touchEndY)

  // Only trigger if horizontal swipe is significantly larger than vertical movement
  if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > deltaY) {
    if (deltaX > 0) {
      nextRotation()
    } else {
      prevRotation()
    }
  }
}

// Desktop click-and-drag rotation support
const isDragging = ref(false)
const isHovered = ref(false)
let hasDragged = false
let mouseStartX = 0
let mouseStartY = 0

// Watch dragging and hovering states to update body classes for custom cursor morphing
watch(isDragging, (val) => {
  if (typeof document !== 'undefined') {
    if (val) {
      document.body.classList.add('carousel-is-dragging')
    } else {
      document.body.classList.remove('carousel-is-dragging')
    }
  }
})

watch(isHovered, (val) => {
  if (typeof document !== 'undefined') {
    if (val) {
      document.body.classList.add('carousel-is-hovered')
    } else {
      document.body.classList.remove('carousel-is-hovered')
    }
  }
})

const handleMouseEnter = () => {
  isPaused.value = true
  isHovered.value = true
}

const handleMouseLeave = () => {
  isPaused.value = false
  isHovered.value = false
}

const handleWindowMouseMove = (e) => {
  if (!isDragging.value) return
  const deltaX = Math.abs(mouseStartX - e.clientX)
  const deltaY = Math.abs(mouseStartY - e.clientY)
  
  // Mark as drag if mouse moves beyond a 10px threshold
  if (deltaX > 10 || deltaY > 10) {
    hasDragged = true
  }
}

const handleWindowMouseUp = (e) => {
  if (isDragging.value) {
    isDragging.value = false
    
    const deltaX = mouseStartX - e.clientX
    const deltaY = Math.abs(mouseStartY - e.clientY)

    // Trigger rotation if drag is horizontal
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        nextRotation()
      } else {
        prevRotation()
      }
    }
    
    // Clear hasDragged after a small timeout so the click event can process it first
    setTimeout(() => {
      hasDragged = false
    }, 50)
  }
  
  window.removeEventListener('mousemove', handleWindowMouseMove)
  window.removeEventListener('mouseup', handleWindowMouseUp)
}

const handleMouseDownLocal = (e) => {
  if (e.button !== 0) return // Only handle left click drags
  
  isDragging.value = true
  hasDragged = false
  mouseStartX = e.clientX
  mouseStartY = e.clientY

  window.addEventListener('mousemove', handleWindowMouseMove)
  window.addEventListener('mouseup', handleWindowMouseUp)
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
  updateScale()
  window.addEventListener('resize', updateScale)
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
  window.removeEventListener('resize', updateScale)
  stopAutoRotate()
  window.removeEventListener('wheel', handleGlobalScroll, { capture: true })
  window.removeEventListener('touchmove', handleGlobalScroll, { capture: true })
  window.removeEventListener('focus', handleFocus)
  window.removeEventListener('blur', handleBlur)
  window.removeEventListener('mousemove', handleWindowMouseMove)
  window.removeEventListener('mouseup', handleWindowMouseUp)
  if (typeof document !== 'undefined') {
    document.body.classList.remove('carousel-is-dragging')
    document.body.classList.remove('carousel-is-hovered')
  }
})

// 3D Math for Bent Cylinder
const radius = computed(() => {
  const count = props.items.length
  // Radius optimized for original 272px cards
  if (count <= 3) return 340

  const width = 272
  const baseRadius = Math.round((width / 2) / Math.tan(Math.PI / count))
  return baseRadius + 240
})

const getItemStyle = (index) => {
  const count = props.items.length
  const baseAngle = 360 / count

  // Calculate relative index for the shortest path
  let relIndex = index - rotationIndex.value
  const half = count / 2
  while (relIndex > half) relIndex -= count
  while (relIndex <= -half) relIndex += count

  // DYNAMIC SEPARATION
  const compressionFactor = count <= 3 ? 0.4 : (count <= 6 ? 0.7 : 1.0)
  const visualRelAngle = relIndex * baseAngle * compressionFactor

  const absVisualAngle = Math.abs(visualRelAngle)

  // Concave Embrace Rotation
  const angleCorrection = -visualRelAngle * 0.8
  const skewY = visualRelAngle * 0.02

  // Scaling logic
  let scale = 1
  if (absVisualAngle < 30) {
    const t = 1 - (absVisualAngle / 30)
    scale = 1 + (t * 0.45)
  } else {
    scale = 0.9
  }

  // Layer-based depth falloff (Active middle = Layer 0, Neighbors = Layer 1, Further = Layer 2+)
  const layer = Math.abs(relIndex)
  
  // Add an extra depth offset to the active card and its neighbors to prevent clipping
  const depthOffset = layer === 0 ? 50 : (layer === 1 ? 20 : 0)

  let opacity = 1.0
  let brightness = 1.0

  if (layer === 0) {
    opacity = 1.0
    brightness = 1.0
  } else if (layer === 1) {
    opacity = isMobile.value ? 0.60 : 0.70 // Increased visibility for closest neighbors
    brightness = isMobile.value ? 0.70 : 0.80
  } else {
    opacity = isMobile.value ? 0.22 : 0.30 // Increased visibility for furthest cards
    brightness = isMobile.value ? 0.45 : 0.50
  }

  return {
    transform: `rotateY(${visualRelAngle}deg) translateZ(${radius.value + depthOffset}px) rotateY(${angleCorrection}deg) skewY(${skewY}deg) scale(${scale})`,
    filter: layer > 0 ? `brightness(${brightness})` : 'none',
    opacity: opacity,
    zIndex: Math.round(2000 - (absVisualAngle * 10)),
    transition: 'transform 0.8s cubic-bezier(0.2, 1, 0.3, 1), opacity 0.4s ease, filter 0.4s ease',
    willChange: 'transform, opacity'
  }
}

// Enhanced Shading
const getCardShading = (index) => {
  const count = props.items.length
  const baseAngle = 360 / count

  let relIndex = index - rotationIndex.value
  const half = count / 2
  while (relIndex > half) relIndex -= count
  while (relIndex <= -half) relIndex += count

  const compressionFactor = count <= 3 ? 0.4 : (count <= 6 ? 0.7 : 1.0)
  const visualRelAngle = relIndex * baseAngle * compressionFactor

  const highlightPos = 50 + (visualRelAngle * 1.2)
  const shadowSide = visualRelAngle > 0 ? 'right' : 'left'
  const shadowIntensity = Math.min(Math.abs(visualRelAngle) / 80, 0.5)

  return {
    background: `radial-gradient(circle at ${highlightPos}% 30%, rgba(255,255,255,0.1) 0%, transparent 60%),
                linear-gradient(to ${shadowSide}, rgba(0,0,0,${shadowIntensity}) 0%, transparent 50%)`
  }
}

const ringStyle = computed(() => {
  return {
    transform: 'translateZ(0px) rotateY(0deg)' // Ring is now a static container
  }
})

const handleCardClick = (index) => {
  if (hasDragged) {
    hasDragged = false // Suppress click action after a drag completes
    return
  }
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

const handleModalNext = () => {
  nextRotation()
  nextTick(() => {
    selectedProject.value = props.items[currentIndex.value]
  })
}

const handleModalPrev = () => {
  prevRotation()
  nextTick(() => {
    selectedProject.value = props.items[currentIndex.value]
  })
}

// Expose methods for keyboard navigation from parent
defineExpose({
  next: nextRotation,
  prev: prevRotation,
  triggerClick: () => handleCardClick(currentIndex.value)
})
</script>

<template>
  <section
    :id="id"
    ref="carouselRef"
    class="projects section touch-y"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <Transition name="fade-fast">
      <div
        v-if="!isModalOpen"
        class="section__header absolute top-[1.2rem] sm:top-[2rem] inset-x-0 flex flex-col items-center justify-center z-10 pointer-events-none"
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
        :class="{ 'carousel--dragging': isDragging }"
        :aria-label="`${title} carousel`"
        @touchstart="handleTouchStartLocal"
        @touchend="handleTouchEndLocal"
        @mousedown="handleMouseDownLocal"
        @dragstart.prevent
      >
        <div
          class="carousel-scaler"
          :style="{ '--carousel-scale': carouselScale }"
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

            <!-- Mobile Gesture Affordance Tag -->
            <div class="carousel__gesture-tag lg:hidden flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-[1001] pointer-events-none w-max">
              <span class="text-[8px] font-black uppercase tracking-[0.25em] text-[var(--accent)] animate-pulse bg-[#0a0f1e]/90 px-3.5 py-2 rounded-xl border border-[var(--accent)]/25 shadow-[0_0_20px_rgba(0, 102, 255,0.15)] flex items-center gap-1.5">
                <UIcon name="i-lucide-move-3d" class="text-xs" />
                Swipe or Tap Sides to Spin
              </span>
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
              >
                <!-- This container is now massive to prevent clipping -->
                <div class="glow-boundary">
                  <div
                    class="bent-card cursor-pointer border-none"
                    @click.stop="handleCardClick(index)"
                    @mouseenter="hoveredZone = getRelIndex(index)"
                    @mouseleave="hoveredZone = null"
                  >
                    <div
                      class="bent-card__shading"
                      :style="getCardShading(index)"
                    />

                    <div class="bent-card__inner">
                      <div
                        class="card__image-bent"
                        :style="{
                          backgroundImage: item.bg && item.bg !== '#' ? `url(${item.bg})` : '',
                          backgroundSize: item.bgSize || 'cover',
                          backgroundPosition: item.bgPos || 'center'
                        }"
                      />
                      <div class="bent-card__content">
                        <h3 class="text-clamp">
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

          <!-- Mobile Navigation Affordance (Brackets) -->
          <div class="carousel__mobile-brackets lg:hidden pointer-events-none">
            <div class="carousel-mobile-bracket absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(0, 102, 255,0.35)] text-3xl font-extralight tracking-tighter animate-pulse">
              [
            </div>
            <div class="carousel-mobile-bracket absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(0, 102, 255,0.35)] text-3xl font-extralight tracking-tighter animate-pulse">
              ]
            </div>
          </div>
        </div>
      </div>

      <!-- Integrated Modal Content -->
      <PortfolioProjectModal
        v-model="isModalOpen"
        :project="selectedProject"
        :section-title="title"
        @close="isModalOpen = false"
        @next="handleModalNext"
        @prev="handleModalPrev"
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

.touch-y {
  touch-action: pan-y pinch-zoom !important;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.carousel-scaler {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(var(--carousel-scale, 1));
  transform-origin: center center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 600px;
}

.carousel {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 4500px;
  overflow: visible !important;
  cursor: grab;
  user-select: none;
}

html:not(.custom-cursor-active) .carousel--dragging,
html:not(.custom-cursor-active) .carousel--dragging * {
  cursor: grabbing !important;
}

.carousel--dragging,
.carousel--dragging * {
  user-select: none !important;
}

.carousel__viewport {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  margin: 0 auto;
  overflow: visible !important;
}

.sphere-glow {
  position: absolute;
  inset: -300px -600px;
  background: radial-gradient(circle at center, rgba(0, 102, 255, 0.08) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
  transform: translateZ(-600px);
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
  width: 400px;
  height: 560px;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  backface-visibility: hidden;
  pointer-events: none; /* Allow clicks to pass through the 400x560 boundary */
  overflow: visible !important;
  margin-left: -200px;
  margin-top: -280px;
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
  font-size: 18px;
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
  top: calc(50% + 380px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16px;
  z-index: 1001;
}

.carousel__gesture-tag {
  top: calc(50% + 410px);
}

@media (max-width: 768px) {
  .carousel__counter {
    top: calc(50% + 300px) !important;
  }
  .carousel__gesture-tag {
    top: calc(50% + 330px) !important;
  }
}

.counter-dot {
  width: 12px;
  height: 3px;
  background: rgba(0, 102, 255, 0.1);
  transition: all 0.5s ease;
  border-radius: 1px;
}

.counter-dot.active {
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
  width: 30px;
  border-radius: 2px;
}

/* Bent Card Styling - Restored to 272x384 baseline */
.bent-card {
  width: 272px;
  height: 384px;
  position: relative;
  background: #070b19; /* Solid deep tactical cyber-blue backdrop to prevent 3D bleed-through */
  border-radius: 26px;
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  overflow: visible !important;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  border: 2px solid transparent;
  outline: none !important;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  pointer-events: auto; /* Re-enable events strictly for the card surface */
}

.glow-target .bent-card {
  box-shadow: 0 0 25px rgba(0, 102, 255, 0.25), 0 0 60px rgba(110, 61, 255, 0.1);
  border-color: rgba(0, 102, 255, 0.35);
}

.active.glow-target .bent-card {
  border-color: var(--accent);
  box-shadow: 0 0 35px rgba(0, 102, 255, 0.35), 0 0 80px rgba(110, 61, 255, 0.15);
}

.bent-card__shading {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  border-radius: 26px;
  mix-blend-mode: multiply;
  transition: background 1s ease;
}

.bent-card__inner {
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  padding-bottom: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
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

.active.glow-target .card__image-bent {
  opacity: 1;
}

.bent-card__content {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0 8px;
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
  margin-top: 16px;
  font-size: 11px;
  color: var(--accent);
  font-weight: 900;
  letter-spacing: 0.3em;
  opacity: 0.8;
  animation: pulse 2s infinite;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.95), 0 0 3px rgba(0, 0, 0, 1), 0 0 1px rgba(0, 0, 0, 1);
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
</style>
