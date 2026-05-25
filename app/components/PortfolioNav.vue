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

const toggleNav = () => {
  isOpen.value = !isOpen.value
}

const navigate = (index) => {
  isOpen.value = false
  emit('navigate', index)
}
</script>

<template>
  <nav
    class="nav"
    :class="{ 'nav--open': isOpen }"
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
        <Transition name="fade-slide">
          <span v-if="isOpen" class="nav__label-text">MENU</span>
        </Transition>
      </div>
      <div class="nav__progress-container">
        <div class="nav__progress">
          <div class="nav__progress-line" />
          <div
            v-for="(section, index) in sections"
            :key="section.id"
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
</template>
