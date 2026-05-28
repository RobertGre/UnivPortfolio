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
</script>

<template>
  <nav
    class="nav transition-opacity duration-300"
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
              :class="{ 'active': currentIndex === index }"
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
</template>

<style scoped>
/* Scoped styles removed as they are handled in portfolio.css */
</style>
