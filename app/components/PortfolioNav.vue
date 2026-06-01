<script setup>
defineProps({
  sections: {
    type: Array,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['navigate'])

const isOpen = ref(false)
const isGlobalModalOpen = useState('isModalActive', () => false)

const toggleNav = () => {
  isOpen.value = !isOpen.value
}

const navigate = (index) => {
  emit('navigate', index)
}

const getSectionIcon = (id) => {
  switch (id) {
    case 'home': return 'i-lucide-home'
    case 'games': return 'i-lucide-gamepad-2'
    case 'technical-projects': return 'i-lucide-cpu'
    case 'about': return 'i-lucide-user'
    default: return 'i-lucide-layers'
  }
}

const getSectionShortLabel = (label) => {
  const lower = label.toLowerCase()
  if (lower.includes('home')) return 'Home'
  if (lower.includes('game')) return 'Games'
  if (lower.includes('technical') || lower.includes('projects')) return 'Tech'
  if (lower.includes('profile') || lower.includes('about') || lower.includes('capabilities')) return 'About'
  return label
}
</script>

<template>
  <div>
    <!-- DESKTOP VERTICAL NAVIGATION (Hidden on mobile) -->
    <nav
      class="nav desktop-nav transition-opacity duration-300"
      :class="[
        { 'nav--open': isOpen },
        isGlobalModalOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      ]"
    >
      <div class="nav__controls">
        <div class="nav__toggle-container">
          <button
            class="nav__toggle"
            :class="{ 'nav__toggle--open': isOpen }"
            aria-label="Toggle navigation"
            @click="toggleNav"
          >
            <span class="nav__toggle-icon" />
          </button>
        </div>

        <div class="nav__progress-container">
          <div class="nav__progress">
            <div class="nav__progress-line" />
            <div
              v-for="(section, index) in sections"
              :key="index"
              class="nav__dot-wrapper"
            >
              <div
                class="nav__progress-dot"
                :class="{ active: currentIndex === index }"
                @click="navigate(index)"
              />
            </div>
          </div>

          <div class="nav__menu">
            <ul class="nav__list">
              <li
                v-for="(section, index) in sections"
                :key="section.id"
              >
                <a
                  :href="`#${section.id}`"
                  class="nav__link"
                  :class="{ 'nav__link--active': currentIndex === index }"
                  @click.prevent="navigate(index)"
                >
                  {{ section.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- MOBILE PREMIUM FLOATING BOTTOM CAPSULE NAV (Visible only on Mobile) -->
    <nav
      class="mobile-bottom-nav"
      :class="{ 'mobile-bottom-nav--hidden': isGlobalModalOpen }"
    >
      <button
        v-for="(section, index) in sections"
        :key="section.id"
        class="mobile-nav-item"
        :class="{ 'mobile-nav-item--active': currentIndex === index }"
        @click="navigate(index)"
        :aria-label="section.label"
      >
        <span 
          class="mobile-nav-dot"
          :class="{ 'mobile-nav-dot--active': currentIndex === index }"
        />
        <UIcon 
          :name="getSectionIcon(section.id)" 
          class="mobile-nav-icon"
        />
        <span class="mobile-nav-label">
          {{ getSectionShortLabel(section.label) }}
        </span>
      </button>
    </nav>


  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .desktop-nav {
    display: none !important;
  }
}

.mobile-bottom-nav {
  display: flex;
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100000;
  padding: 8px 16px;
  border-radius: 16px;
  border: 1px solid transparent;
  background-image: linear-gradient(rgba(8, 12, 24, 0.9), rgba(8, 12, 24, 0.9)), 
                    linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.6), 
              0 0 25px rgba(116, 245, 255, 0.08), 
              inset 0 0 10px rgba(116, 245, 255, 0.04);
  align-items: center;
  justify-content: space-around;
  gap: 16px;
  width: 320px;
  max-width: 90vw;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
}

.mobile-bottom-nav--hidden {
  transform: translate(-50%, 100px);
  opacity: 0;
  pointer-events: none;
}

@media (min-width: 769px) {
  .mobile-bottom-nav {
    display: none !important;
  }
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 6px;
  position: relative;
  outline: none;
  flex: 1;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-nav-item--active {
  background: rgba(116, 245, 255, 0.06);
  box-shadow: inset 0 0 8px rgba(116, 245, 255, 0.1),
              0 0 10px rgba(116, 245, 255, 0.02);
}

.mobile-nav-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent);
  position: absolute;
  top: 2px;
  transform: scale(0);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
  box-shadow: 0 0 8px var(--accent);
}

.mobile-nav-dot--active {
  transform: scale(1);
}

.mobile-nav-icon {
  font-size: 1.2rem;
  width: 1.2rem;
  height: 1.2rem;
  color: var(--muted);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease, filter 0.3s ease;
}

.mobile-nav-item--active .mobile-nav-icon {
  color: var(--accent);
  transform: scale(1.1) translateY(-1px);
  filter: drop-shadow(0 0 8px rgba(116, 245, 255, 0.8));
}

.mobile-nav-label {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 4px;
  transition: color 0.3s ease;
}

.mobile-nav-item--active .mobile-nav-label {
  color: var(--text);
  font-weight: 900;
}


</style>
