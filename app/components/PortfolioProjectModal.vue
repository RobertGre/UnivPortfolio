<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  project: {
    type: Object,
    default: () => null
  },
  sectionTitle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}

// Mock project fallback
const displayProject = computed(() => {
  if (props.project && props.project.title) return props.project
  return {
    title: 'Project Title',
    description: 'This is a sample description for the project. It outlines the core concept and goals.',
    learned: 'Key skills and technologies acquired during development.',
    done: 'Specific tasks and contributions made to the project.',
    youtube: 'dQw4w9WgXcQ',
    link: '#'
  }
})
</script>

<template>
  <UModal
    :model-value="modelValue"
    :ui="{
      width: 'w-screen max-w-[calc(100vw-100px)]',
      height: 'h-screen max-h-[100vh]',
      container: 'flex items-start justify-center p-0',
      base: 'relative overflow-hidden flex flex-col',
      background: 'bg-[#05070f]',
      ring: '',
      rounded: 'rounded-none',
      overlay: {
        background: 'bg-[#05070f]/98 backdrop-blur-3xl'
      }
    }"
    class="portfolio-project-modal"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <div class="project-modal p-6 sm:p-16 text-[#e8f7ff] overflow-y-auto h-full">
      <!-- HEADER: CENTERED Project Title & Symmetrical Section Sub-title -->
      <header class="flex flex-col items-center justify-center mb-16 sticky top-0 bg-[#05070f]/80 backdrop-blur-md py-6 z-10 w-full">
        <!-- Close button fixed top-right -->
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          size="xl"
          class="absolute right-0 top-6 rounded-2xl hover:bg-(--accent) hover:text-black scale-150 transition-all duration-300 z-20"
          @click="closeModal"
        />

        <div class="flex flex-col items-center text-center max-w-5xl w-full">
          <h2 class="text-4xl sm:text-7xl font-black tracking-tighter uppercase text-(--accent) leading-none mb-4">
            {{ displayProject.title }}
          </h2>
          
          <!-- Symmetrical Lines around Section Subtitle -->
          <div class="flex items-center justify-center gap-6 w-full max-w-2xl">
            <span class="flex-1 h-px bg-gradient-to-l from-(--accent) to-transparent opacity-40" />
            <p class="text-(--muted) uppercase tracking-[0.5em] text-xs font-black opacity-80 whitespace-nowrap">
              {{ sectionTitle === 'Technical Project' ? 'Technical Project' : sectionTitle }}
            </p>
            <span class="flex-1 h-px bg-gradient-to-r from-(--accent) to-transparent opacity-40" />
          </div>
        </div>
      </header>

      <!-- Original 2-column Grid Shape -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 sm:gap-24">
        <!-- Main Content Area (Left side) -->
        <div class="lg:col-span-8 space-y-16">
          <section>
            <h3 class="text-xs font-black text-(--accent) uppercase mb-6 tracking-[0.5em] flex items-center gap-4">
              <span class="w-12 h-px bg-(--accent)" /> Mission Objective
            </h3>
            <p class="text-2xl sm:text-4xl leading-tight text-white font-light">
              {{ displayProject.description }}
            </p>
          </section>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-16">
            <section>
              <h3 class="text-xs font-black text-(--accent) uppercase mb-6 tracking-[0.5em] flex items-center gap-4">
                <span class="w-8 h-px bg-(--accent)" /> Neural Link
              </h3>
              <p class="text-(--muted) leading-relaxed text-xl font-light">
                {{ displayProject.learned }}
              </p>
            </section>

            <section>
              <h3 class="text-xs font-black text-(--accent) uppercase mb-6 tracking-[0.5em] flex items-center gap-4">
                <span class="w-8 h-px bg-(--accent)" /> Tactical Execution
              </h3>
              <p class="text-(--muted) leading-relaxed text-xl font-light">
                {{ displayProject.done }}
              </p>
            </section>
          </div>

          <div v-if="displayProject.link" class="pt-10">
            <a
              :href="displayProject.link"
              target="_blank"
              class="text-sm text-(--accent) flex items-center gap-4 group font-black tracking-[0.3em] hover:opacity-70 transition-opacity"
            >
              <span class="w-4 h-px bg-(--accent)" />
              ACCESS PROJECT SOURCE
              <UIcon name="i-lucide-arrow-up-right" class="text-xs" />
            </a>
          </div>
        </div>

        <!-- Sidebar Area: Media (Right side) -->
        <div class="lg:col-span-4 space-y-12">
          <div
            v-if="displayProject.youtube"
            class="aspect-video rounded-3xl overflow-hidden bg-black shadow-[0_0_100px_rgba(116,245,255,0.15)] ring-1 ring-(--accent)/10"
          >
            <iframe
              width="100%"
              height="100%"
              :src="`https://www.youtube.com/embed/${displayProject.youtube}`"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </div>
  </UModal>
</template>

<style>
.portfolio-project-modal {
  z-index: 10000 !important;
}
</style>

<style scoped>
.project-modal {
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}
.project-modal::-webkit-scrollbar {
  width: 6px;
}
.project-modal::-webkit-scrollbar-thumb {
  background-color: var(--accent);
  border-radius: 10px;
}

h2, h3 {
  text-shadow: 0 0 40px rgba(116, 245, 255, 0.25);
}
</style>
