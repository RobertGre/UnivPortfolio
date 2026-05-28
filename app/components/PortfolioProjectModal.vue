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
  hasNext: {
    type: Boolean,
    default: true
  },
  hasPrev: {
    type: Boolean,
    default: true
  },
  sectionTitle: {
    type: String,
    default: 'Project'
  }
})

const emit = defineEmits(['update:modelValue', 'close', 'next', 'prev'])

const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleNext = () => emit('next')
const handlePrev = () => emit('prev')

const isVideoActive = ref(false)
const handleVideoClick = () => {
  isVideoActive.value = true
}

// Reset video state when project changes
watch(() => props.project, () => {
  isVideoActive.value = false
})

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

// Text processing for stylized bullets
const formatContent = (text) => {
  if (!text) return []
  return text.split('\n').map((line) => {
    const trimmed = line.trim()
    if (trimmed.startsWith('-')) {
      return { type: 'bullet', content: trimmed.substring(1).trim() }
    }
    return { type: 'text', content: line }
  })
}

const handleGlobalKeydown = (e) => {
  if (!props.modelValue) return
  if (e.key === 'ArrowRight') handleNext()
  if (e.key === 'ArrowLeft') handlePrev()
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[2000000] flex items-center justify-center p-4 sm:p-20"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-[#000000]/95 backdrop-blur-xl"
        @click="closeModal"
      />

      <!-- External Navigation Arrows ( Gutters ) -->
      <div class="absolute inset-y-0 inset-x-0 pointer-events-none flex items-center justify-between z-[2000002] px-1 sm:px-6 lg:px-10">
        <button
          v-if="hasPrev"
          class="pointer-events-auto w-8 h-16 sm:w-12 sm:h-32 rounded-xl sm:rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center gap-2 hover:bg-[var(--accent)] hover:text-black transition-all group shadow-[0_0_20px_rgba(0,0,0,0.5)] active:scale-95"
          aria-label="Previous project"
          @click="handlePrev"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="text-lg sm:text-2xl"
          />
          <span class="hidden sm:block text-[8px] font-black uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">Previous</span>
        </button>
        <button
          v-if="hasNext"
          class="pointer-events-auto w-8 h-16 sm:w-12 sm:h-32 rounded-xl sm:rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center gap-2 hover:bg-[var(--accent)] hover:text-black transition-all group shadow-[0_0_20px_rgba(0,0,0,0.5)] active:scale-95"
          aria-label="Next project"
          @click="handleNext"
        >
          <UIcon
            name="i-lucide-chevron-right"
            class="text-lg sm:text-2xl"
          />
          <span class="hidden sm:block text-[8px] font-black uppercase tracking-widest [writing-mode:vertical-lr]">Next</span>
        </button>
      </div>

      <!-- Content "Screen" -->
      <div class="relative w-[95vw] sm:w-[90vw] 2xl:w-[80vw] 3xl:w-[70vw] max-w-none h-full bg-[#0a0f1e] rounded-2xl sm:rounded-3xl ring-1 ring-[rgba(116,245,255,0.2)] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col z-[2000001]">
        <div class="project-modal py-6 px-8 sm:p-10 text-[#e8f7ff] h-full flex flex-col">
          <header class="flex justify-between items-start mb-4 py-2 flex-shrink-0 gap-4">
            <div>
              <h2 class="text-2xl sm:text-4xl font-black tracking-tighter uppercase text-(--accent) leading-tight">
                {{ displayProject.fullTitle || displayProject.title }}
              </h2>
              <p class="text-[var(--muted)] mt-1 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[9px] sm:text-[10px] font-bold">
                Project Deep-Dive
              </p>
            </div>
            <button
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center bg-white/5 hover:bg-[var(--accent)] hover:text-[#000] transition-colors group flex-shrink-0"
              aria-label="Close modal"
              @click="closeModal"
            >
              <UIcon
                name="i-lucide-x"
                class="text-lg sm:text-xl"
              />
            </button>
          </header>

          <div class="flex-1 overflow-hidden flex flex-col relative">
            <div class="flex-1 overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 content-start animate-in fade-in slide-in-from-bottom-4 duration-700">
                <!-- Main Content Area with Video Wrap -->
                <div class="lg:col-span-12 space-y-6 sm:space-y-10">
                  <!-- Top Section: Overview & Analysis (Wraps Video) -->
                  <div class="relative flex flex-col lg:block">
                    <!-- Video positioned to the right for wrapping effect on large screens -->
                    <div
                      v-if="displayProject.youtube"
                      class="lg:float-right lg:ml-10 mb-6 w-full lg:w-[48%] aspect-video rounded-xl sm:rounded-2xl overflow-hidden ring-1 ring-[var(--accent)]/30 shadow-[0_0_40px_rgba(110,61,255,0.15)] bg-[#000] relative lg:top-1.5 order-first lg:order-none cursor-pointer group/video"
                      :class="{ 'disable-custom-cursor active-video': isVideoActive }"
                      @click="handleVideoClick"
                    >
                      <template v-if="!isVideoActive">
                        <!-- High-res Thumbnail Placeholder -->
                        <div class="absolute inset-0 z-10 flex items-center justify-center bg-black/20 group-hover/video:bg-black/0 transition-colors">
                          <div class="w-16 h-16 rounded-full bg-[var(--accent)]/80 flex items-center justify-center pl-1 shadow-[0_0_30px_var(--accent)] group-hover/video:scale-110 transition-transform">
                            <UIcon
                              name="i-lucide-play"
                              class="text-black text-3xl"
                            />
                          </div>
                        </div>
                        <img
                          :src="displayProject.bg"
                          class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity"
                          alt="Project thumbnail"
                        >
                      </template>
                      <iframe
                        v-else
                        width="100%"
                        height="100%"
                        :src="`https://www.youtube.com/embed/${displayProject.youtube}?autoplay=1&rel=0`"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      />
                    </div>

                    <section class="mb-8">
                      <h3 class="text-[10px] font-black text-[var(--accent)] uppercase mb-3 tracking-[0.4em] flex items-center gap-2">
                        Overview
                      </h3>
                      <div class="text-sm sm:text-base leading-relaxed text-[rgba(232,247,255,0.85)] font-normal">
                        <template
                          v-for="(line, i) in formatContent(displayProject.description)"
                          :key="i"
                        >
                          <div
                            v-if="line.type === 'bullet'"
                            class="flex items-start gap-3 my-1"
                          >
                            <span class="bullet-dot mt-2" />
                            <span>{{ line.content }}</span>
                          </div>
                          <div
                            v-else
                            class="whitespace-pre-wrap"
                          >
                            {{ line.content }}
                          </div>
                        </template>
                      </div>
                    </section>

                    <!-- NEW: Skills moved under Overview specifically for Minigames and Game Jams -->
                    <section
                      v-if="displayProject.isMinigame || displayProject.isGameJam"
                      class="mb-8"
                    >
                      <h3 class="text-[10px] font-black text-[var(--accent)] uppercase mb-3 tracking-[0.4em] flex items-center gap-2">
                        Skills
                      </h3>
                      <div class="text-sm sm:text-base leading-relaxed text-[rgba(232,247,255,0.85)] font-normal">
                        <template
                          v-for="(line, i) in formatContent(displayProject.learned)"
                          :key="i"
                        >
                          <div
                            v-if="line.type === 'bullet'"
                            class="flex items-start gap-3 my-1"
                          >
                            <span class="bullet-dot mt-2" />
                            <span>{{ line.content }}</span>
                          </div>
                          <div
                            v-else
                            class="whitespace-pre-wrap"
                          >
                            {{ line.content }}
                          </div>
                        </template>
                      </div>
                    </section>

                    <section
                      v-if="displayProject.summary"
                      class="mb-8"
                    >
                      <h3 class="text-[10px] font-black text-[var(--accent)] uppercase mb-3 tracking-[0.4em] flex items-center gap-2">
                        Detailed Analysis
                      </h3>
                      <div class="text-sm sm:text-base leading-relaxed text-[rgba(232,247,255,0.85)] font-normal">
                        <template
                          v-for="(line, i) in formatContent(displayProject.summary)"
                          :key="i"
                        >
                          <div
                            v-if="line.type === 'bullet'"
                            class="flex items-start gap-3 my-1"
                          >
                            <span class="bullet-dot mt-2" />
                            <span>{{ line.content }}</span>
                          </div>
                          <div
                            v-else
                            class="whitespace-pre-wrap"
                          >
                            {{ line.content }}
                          </div>
                        </template>
                      </div>
                    </section>
                  </div>

                  <!-- Bottom Section: Skills & Execution (Cleared, Multi-column) -->
                  <div class="clear-both grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 border-t border-[rgba(116,245,255,0.08)]">
                    <!-- Standard Skills Column (Hidden for Minigames/GameJams as it is now above) -->
                    <section
                      v-if="!displayProject.isMinigame && !displayProject.isGameJam"
                      class="lg:col-span-4"
                    >
                      <h3 class="text-[10px] font-black text-[var(--accent)] uppercase mb-4 tracking-[0.4em] flex items-center gap-2">
                        Skills
                      </h3>
                      <div class="text-sm sm:text-base leading-relaxed text-[rgba(232,247,255,0.85)] font-normal">
                        <template
                          v-for="(line, i) in formatContent(displayProject.learned)"
                          :key="i"
                        >
                          <div
                            v-if="line.type === 'bullet'"
                            class="flex items-start gap-3 my-1 break-inside-avoid"
                          >
                            <span class="bullet-dot mt-2" />
                            <span>{{ line.content }}</span>
                          </div>
                          <div
                            v-else
                            class="whitespace-pre-wrap mb-1"
                          >
                            {{ line.content }}
                          </div>
                        </template>
                      </div>
                    </section>

                    <section :class="(displayProject.isMinigame || displayProject.isGameJam) ? 'lg:col-span-12' : 'lg:col-span-8'">
                      <h3 class="text-[10px] font-black text-[var(--accent)] uppercase mb-4 tracking-[0.4em] flex items-center gap-2">
                        Execution
                      </h3>
                      <div
                        class="text-sm sm:text-base leading-relaxed text-[rgba(232,247,255,0.85)] font-normal"
                        :class="{
                          'columns-1 sm:columns-2 gap-x-10': !displayProject.isMinigame && !displayProject.isGameJam,
                          'columns-1 sm:columns-3 gap-x-10': displayProject.isGameJam
                        }"
                      >
                        <template
                          v-for="(line, i) in formatContent(displayProject.done)"
                          :key="i"
                        >
                          <div
                            v-if="line.type === 'bullet'"
                            class="flex items-start gap-3 mb-2 break-inside-avoid"
                          >
                            <span class="bullet-dot mt-2" />
                            <span>{{ line.content }}</span>
                          </div>
                          <div
                            v-else
                            class="whitespace-pre-wrap mt-4 mb-1 first:mt-0 break-inside-avoid"
                            :class="line.content.trim().endsWith(':') ? 'text-[var(--accent)] font-bold' : 'text-[rgba(232,247,255,0.85)]'"
                          >
                            {{ line.content }}
                          </div>
                        </template>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fixed Bottom Bar - Positioned as page footer -->
            <div class="mt-4 pt-4 border-t border-[rgba(116,245,255,0.08)] flex-shrink-0">
              <div class="flex flex-wrap justify-between items-center gap-4">
                <div
                  v-if="!displayProject.hideLinks"
                  class="flex items-center gap-4"
                >
                  <template v-if="!displayProject.isTech">
                    <span class="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Play Now</span>
                    <a
                      v-if="displayProject.itch"
                      :href="displayProject.itch"
                      target="_blank"
                      class="text-xs text-[var(--accent)] flex items-center gap-1 hover:underline uppercase bg-white/5 px-2 py-1 rounded-md border border-white/10"
                    >
                      itch.io <UIcon
                        name="i-lucide-arrow-up-right"
                        class="text-[10px]"
                      />
                    </a>
                    <span
                      v-else
                      class="text-xs text-[var(--accent)] uppercase"
                    >
                      itch.io TBA
                    </span>
                  </template>
                  <template v-else-if="displayProject.isTech">
                    <span class="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Source Code</span>
                    <span class="text-xs text-[var(--accent)] uppercase">Available on request</span>
                  </template>
                </div>
                <div class="flex items-center gap-6">
                  <div
                    v-if="displayProject.year"
                    class="flex items-center gap-2"
                  >
                    <span class="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Year</span>
                    <span class="text-xs text-[#fff] font-mono">{{ displayProject.year }}</span>
                  </div>                  <div class="flex items-center gap-2">
                    <span class="text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">Category</span>
                    <span class="text-xs text-white uppercase tracking-tighter">{{ sectionTitle.includes('Technical') ? 'Technical Project' : 'Game Project' }}</span>
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
  overscroll-behavior: contain;
  touch-action: pan-y;
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

.bullet-dot {
  width: 6px;
  height: 6px;
  background: var(--accent);
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 8px var(--accent);
}
</style>
