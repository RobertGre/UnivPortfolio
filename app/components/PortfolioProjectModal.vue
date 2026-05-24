<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  project: {
    type: Object,
    default: () => null
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
      width: 'w-full sm:max-w-[calc(100vw-var(--nav-width)*2)]',
      height: 'h-[90vh]',
      container: 'flex items-center justify-center p-4',
      base: 'relative overflow-hidden flex flex-col',
      background: 'bg-[#0a0f1e]',
      ring: 'ring-1 ring-[rgba(116,245,255,0.2)]',
      rounded: 'rounded-3xl',
      overlay: {
        background: 'bg-[#05070f]/80 backdrop-blur-xl'
      }
    }"
    class="portfolio-project-modal"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <div class="project-modal p-6 sm:p-12 text-[#e8f7ff] overflow-y-auto h-full">
      <header class="flex justify-between items-start mb-12 sticky top-0 bg-[#0a0f1e] py-4 z-10">
        <div>
          <h2 class="text-4xl sm:text-5xl font-black tracking-tighter uppercase text-(--accent)">
            {{ displayProject.title }}
          </h2>
          <p class="text-[var(--muted)] mt-2 uppercase tracking-[0.3em] text-xs font-bold">
            Project Deep-Dive
          </p>
        </div>
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          size="xl"
          class="rounded-full hover:bg-[var(--accent)] hover:text-[#000] -mt-2"
          @click="closeModal"
        />
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
        <!-- Main Content Area -->
        <div class="lg:col-span-7 space-y-12">
          <section>
            <h3 class="text-xs font-black text-[var(--accent)] uppercase mb-4 tracking-[0.4em] flex items-center gap-3">
              <span class="w-8 h-[1px] bg-[var(--accent)]" /> Overview
            </h3>
            <p class="text-xl sm:text-2xl leading-relaxed text-[#fff] font-light">
              {{ displayProject.description }}
            </p>
          </section>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <section>
              <h3 class="text-xs font-black text-[var(--accent)] uppercase mb-4 tracking-[0.4em] flex items-center gap-3">
                <span class="w-6 h-[1px] bg-[var(--accent)]" /> Skills
              </h3>
              <p class="text-[var(--muted)] leading-relaxed text-lg">
                {{ displayProject.learned }}
              </p>
            </section>

            <section>
              <h3 class="text-xs font-black text-[var(--accent)] uppercase mb-4 tracking-[0.4em] flex items-center gap-3">
                <span class="w-6 h-[1px] bg-[var(--accent)]" /> Execution
              </h3>
              <p class="text-[var(--muted)] leading-relaxed text-lg">
                {{ displayProject.done }}
              </p>
            </section>
          </div>
        </div>

        <!-- Sidebar / Media Area -->
        <div class="lg:col-span-5 space-y-10">
          <div
            v-if="displayProject.youtube"
            class="aspect-video rounded-3xl overflow-hidden ring-1 ring-[var(--accent)]/30 shadow-[0_0_50px_rgba(110,61,255,0.2)] bg-[#000]"
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

          <div class="bg-[rgba(116,245,255,0.02)] p-8 rounded-3xl border border-[rgba(116,245,255,0.08)] backdrop-blur-sm">
            <h4 class="text-[10px] font-black text-[var(--accent)] uppercase mb-6 tracking-[0.5em]">
              System Specs
            </h4>
            <div class="space-y-6">
              <div
                v-if="displayProject.link"
                class="flex justify-between items-center group"
              >
                <span class="text-xs text-[var(--muted)] uppercase tracking-widest font-bold">Repository</span>
                <a
                  :href="displayProject.link"
                  target="_blank"
                  class="text-sm text-[var(--accent)] flex items-center gap-2 group-hover:underline"
                >
                  SOURCE <UIcon
                    name="i-lucide-arrow-up-right"
                    class="text-xs"
                  />
                </a>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-[var(--muted)] uppercase tracking-widest font-bold">Year</span>
                <span class="text-sm text-[#fff] font-mono">2026</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-[var(--muted)] uppercase tracking-widest font-bold">Category</span>
                <span class="text-sm text-white uppercase tracking-tighter">High-End Development</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UModal>
</template>

<style>
/* Global-level override for the modal portal to ensure it stays below the nav */
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
</style>
