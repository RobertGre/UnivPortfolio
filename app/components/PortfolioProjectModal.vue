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
    summary: '',
    youtube: 'dQw4w9WgXcQ',
    link: '#'
  }
})
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[2000000] flex items-center justify-center p-4 sm:p-8"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-[#000000]/90 backdrop-blur-xl"
        @click="closeModal"
      />

      <!-- Content "Screen" -->
      <div class="relative w-full max-w-[1400px] h-[90vh] bg-[#0a0f1e] rounded-3xl ring-1 ring-[rgba(116,245,255,0.2)] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        <div class="project-modal p-6 sm:p-10 text-[#e8f7ff] h-full flex flex-col overflow-hidden">
          <header class="flex justify-between items-start mb-4 py-2 flex-shrink-0">
            <div>
              <h2 class="text-3xl sm:text-4xl font-black tracking-tighter uppercase text-(--accent) leading-tight">
                {{ displayProject.title }}
              </h2>
              <p class="text-[var(--muted)] mt-1 uppercase tracking-[0.3em] text-[10px] font-bold">
                Project Deep-Dive
              </p>
            </div>
            <button
              class="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-[var(--accent)] hover:text-[#000] transition-colors group"
              aria-label="Close modal"
              @click="closeModal"
            >
              <UIcon
                name="i-lucide-x"
                class="text-xl"
              />
            </button>
          </header>

          <div class="flex-1 overflow-hidden">
            <div class="h-full grid grid-cols-1 lg:grid-cols-12 gap-8 content-start overflow-y-auto pr-4 custom-scrollbar">
              <!-- Main Content Area with Video Wrap -->
              <div class="lg:col-span-12 space-y-6">
                <div class="relative">
                  <!-- Video positioned to the right for wrapping effect on large screens -->
                  <div
                    v-if="displayProject.youtube"
                    class="lg:float-right lg:ml-8 lg:mb-4 w-full lg:w-[45%] aspect-video rounded-2xl overflow-hidden ring-1 ring-[var(--accent)]/30 shadow-[0_0_40px_rgba(110,61,255,0.15)] bg-[#000]"
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

                  <section class="mb-6">
                    <h3 class="text-[10px] font-black text-[var(--accent)] uppercase mb-2 tracking-[0.4em] flex items-center gap-2">
                      Overview
                    </h3>
                    <p class="text-sm sm:text-base leading-snug text-[#fff] font-light">
                      {{ displayProject.description }}
                    </p>
                  </section>

                  <section
                    v-if="displayProject.summary"
                    class="mb-6"
                  >
                    <h3 class="text-[10px] font-black text-[var(--accent)] uppercase mb-2 tracking-[0.4em] flex items-center gap-2">
                      Detailed Analysis
                    </h3>
                    <p class="text-sm sm:text-base leading-relaxed text-[var(--muted)] text-justify">
                      {{ displayProject.summary }}
                    </p>
                  </section>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:clear-none">
                    <section>
                      <h3 class="text-[10px] font-black text-[var(--accent)] uppercase mb-2 tracking-[0.4em] flex items-center gap-2">
                        Skills
                      </h3>
                      <p class="text-[var(--muted)] leading-relaxed text-sm">
                        {{ displayProject.learned }}
                      </p>
                    </section>

                    <section>
                      <h3 class="text-[10px] font-black text-[var(--accent)] uppercase mb-2 tracking-[0.4em] flex items-center gap-2">
                        Execution
                      </h3>
                      <p class="text-[var(--muted)] leading-relaxed text-sm">
                        {{ displayProject.done }}
                      </p>
                    </section>
                  </div>
                </div>
              </div>

              <!-- Bottom Bar / System Specs -->
              <div class="lg:col-span-12 mt-auto pt-4 border-t border-[rgba(116,245,255,0.08)]">
                <div class="flex flex-wrap justify-between items-center gap-4">
                  <div
                    v-if="displayProject.link"
                    class="flex items-center gap-4"
                  >
                    <span class="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Repository</span>
                    <a
                      :href="displayProject.link"
                      target="_blank"
                      class="text-xs text-[var(--accent)] flex items-center gap-1 hover:underline"
                    >
                      SOURCE <UIcon
                        name="i-lucide-arrow-up-right"
                        class="text-[10px]"
                      />
                    </a>
                  </div>
                  <div class="flex items-center gap-6">
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Year</span>
                      <span class="text-xs text-[#fff] font-mono">2026</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Category</span>
                      <span class="text-xs text-white uppercase tracking-tighter">High-End Development</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--accent);
  border-radius: 10px;
}

.project-modal {
  user-select: text;
}
</style>
