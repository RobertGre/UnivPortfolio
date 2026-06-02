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
  isVideoActive.value = false
  emit('update:modelValue', false)
  emit('close')
}

const handleNext = () => emit('next')
const handlePrev = () => emit('prev')

const isVideoActive = ref(false)
const handleVideoClick = () => {
  isVideoActive.value = true
}

const copied = ref(false)
const copyCode = (text) => {
  if (!text) return
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}

const isExpanded = ref(false)

// Reset video state, copy state, and collapse state when project changes
watch(() => props.project, () => {
  isVideoActive.value = false
  copied.value = false
  isExpanded.value = false
})

const highlightCode = (code, lang) => {
  if (!code) return ''

  // Escape HTML entities to prevent injection/broken tags
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  if (lang === 'csharp') {
    const csharpKeywords = [
      'abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char', 'checked',
      'class', 'const', 'continue', 'decimal', 'default', 'delegate', 'do', 'double', 'else',
      'enum', 'event', 'explicit', 'extern', 'false', 'finally', 'fixed', 'float', 'for',
      'foreach', 'goto', 'if', 'implicit', 'in', 'int', 'interface', 'internal', 'is', 'lock',
      'long', 'namespace', 'new', 'null', 'object', 'operator', 'out', 'override', 'params',
      'private', 'protected', 'public', 'readonly', 'ref', 'return', 'sbyte', 'sealed',
      'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch', 'this', 'throw',
      'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked', 'unsafe', 'ushort', 'using',
      'virtual', 'void', 'volatile', 'while', 'var', 'get', 'set', 'yield', 'IEnumerator'
    ].join('|')

    const csharpTypes = [
      'MonoBehaviour', 'Vector3', 'GameObject', 'NavMeshAgent', 'Collider', 'Ray', 'RaycastHit',
      'Physics', 'Range', 'SerializeField', 'Header', 'RequireComponent', 'Coroutine',
      'WaitForSeconds', 'Random', 'EvacuationManager', 'Instance', 'NavMeshPath', 'NavMeshPathStatus',
      'NavMesh', 'Action', 'List', 'IDamageable', 'Queue', 'Dictionary'
    ].join('|')

    const regex = new RegExp(
      '(\\/\\/\\/.*|\\/\\/.*)|' +                                      // 1: Comments
      '(".*?")|' +                                                    // 2: Strings
      '(\\[[^\\]]*\\])|' +                                            // 3: Attributes
      '\\b(' + csharpKeywords + ')\\b|' +                             // 4: Keywords
      '\\b(' + csharpTypes + ')\\b|' +                                // 5: Types
      '\\b(\\d+f|\\d+\\.\\d+f|\\d+\\.\\d+|\\d+)\\b',                   // 6: Numbers
      'g'
    )

    return escaped.replace(regex, (match, g1, g2, g3, g4, g5, g6) => {
      if (g1) return `<span class="code-comment">${g1}</span>`
      if (g2) return `<span class="code-string">${g2}</span>`
      if (g3) return `<span class="code-attribute">${g3}</span>`
      if (g4) return `<span class="code-keyword">${g4}</span>`
      if (g5) return `<span class="code-type">${g5}</span>`
      if (g6) return `<span class="code-number">${g6}</span>`
      return match
    })
  } 
  
  if (lang === 'hlsl') {
    const hlslKeywords = [
      'float', 'float2', 'float3', 'float4', 'int', 'bool', 'void', 'for', 'if', 'else', 'return',
      'struct', 'in', 'out', 'inout', 'const', 'discard'
    ].join('|')

    const hlslFunctions = [
      'frac', 'floor', 'lerp', 'min', 'max', 'normalize', 'saturate', 'exp', 'abs', 'sin', 'cos', 'tan'
    ].join('|')

    const regex = new RegExp(
      '(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*)|' +                           // 1: Comments
      '(#[a-zA-Z]+)|' +                                               // 2: Preprocessor
      '\\b(' + hlslKeywords + ')\\b|' +                               // 3: Keywords
      '\\b(' + hlslFunctions + ')\\b|' +                               // 4: Functions
      '\\b(\\d+\\.\\d+|\\d+)\\b',                                     // 5: Numbers
      'g'
    )

    return escaped.replace(regex, (match, g1, g2, g3, g4, g5) => {
      if (g1) return `<span class="code-comment">${g1}</span>`
      if (g2) return `<span class="code-preprocessor">${g2}</span>`
      if (g3) return `<span class="code-keyword">${g3}</span>`
      if (g4) return `<span class="code-type">${g4}</span>`
      if (g5) return `<span class="code-number">${g5}</span>`
      return match
    })
  }

  return escaped
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
      <div class="absolute inset-y-0 inset-x-0 pointer-events-none hidden lg:flex items-center justify-between z-[2000002] px-1 sm:px-6 lg:px-10">
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
      <div class="relative w-full max-w-[95vw] sm:max-w-[90vw] 2xl:max-w-[80vw] 3xl:max-w-[70vw] h-full bg-[#0a0f1e] rounded-2xl sm:rounded-3xl ring-1 ring-[rgba(0,102,255,0.2)] shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col z-[2000001]">
        <div class="project-modal py-4 px-4 sm:py-6 sm:px-8 md:p-10 text-[#e8f7ff] h-full flex flex-col">
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
              <div class="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
                <!-- TOP BLOCK: 2-COLUMN GRID (Overview & Video) -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <!-- Left Column: Overview and Analysis -->
                  <div class="lg:col-span-7 space-y-6">
                    <section>
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

                    <!-- Skills (Minigames/Game Jams) -->
                    <section v-if="displayProject.isMinigame || displayProject.isGameJam">
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

                    <!-- Detailed Analysis -->
                    <section v-if="displayProject.summary">
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

                  <!-- Right Column: Premium Video Player -->
                  <div class="lg:col-span-5">
                    <div
                      v-if="displayProject.youtube"
                      class="w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden ring-1 ring-[var(--accent)]/30 shadow-[0_0_40px_rgba(110,61,255,0.15)] bg-[#000] relative cursor-pointer group/video"
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
                      ></iframe>
                    </div>
                  </div>
                </div>

                <!-- ROW 2: ARCHITECTURAL CASE STUDY SECTION (Full Width, Under Video & Texts) -->
                <div 
                  v-if="displayProject.challenge || displayProject.architecture || displayProject.tradeoff"
                  class="case-study-box p-4 sm:p-6 rounded-2xl border border-[rgba(0,102,255,0.12)] bg-white/5 relative overflow-hidden"
                >
                  <div class="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500 via-[var(--accent)] to-emerald-500" />
                  
                  <h3 class="text-xs font-black text-white uppercase mb-6 tracking-[0.3em] flex items-center gap-2">
                    <UIcon name="i-lucide-binary" class="text-[var(--accent)] text-sm animate-pulse" />
                    ARCHITECTURAL CASE STUDY
                  </h3>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Challenge -->
                    <div v-if="displayProject.challenge" class="case-study-card p-4 sm:p-5 rounded-xl bg-black/40 border border-orange-500/20 hover:border-orange-500/40 transition-all flex flex-col gap-3">
                      <div class="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
                        <UIcon name="i-lucide-zap" class="text-sm" />
                        <span>The Challenge</span>
                      </div>
                      <p class="text-xs sm:text-sm leading-relaxed text-[rgba(232,247,255,0.8)]">
                        {{ displayProject.challenge }}
                      </p>
                    </div>

                    <!-- Architecture -->
                    <div v-if="displayProject.architecture" class="case-study-card p-4 sm:p-5 rounded-xl bg-black/40 border border-[var(--accent)]/20 hover:border-[var(--accent)]/40 transition-all flex flex-col gap-3">
                      <div class="flex items-center gap-2 text-[var(--accent)] font-bold text-xs uppercase tracking-wider">
                        <UIcon name="i-lucide-cpu" class="text-sm" />
                        <span>The Architecture</span>
                      </div>
                      <p class="text-xs sm:text-sm leading-relaxed text-[rgba(232,247,255,0.8)]">
                        {{ displayProject.architecture }}
                      </p>
                    </div>

                    <!-- Tradeoffs -->
                    <div v-if="displayProject.tradeoff" class="case-study-card p-4 sm:p-5 rounded-xl bg-black/40 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col gap-3">
                      <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                        <UIcon name="i-lucide-trending-up" class="text-sm" />
                        <span>Tradeoff & Result</span>
                      </div>
                      <p class="text-xs sm:text-sm leading-relaxed text-[rgba(232,247,255,0.8)]">
                        {{ displayProject.tradeoff }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- ROW 2.5: INTERACTIVE COLLAPSIBLE CODE EDITOR DRAWER -->
                <div
                  v-if="displayProject.codeSnippet"
                  class="code-editor-wrapper mt-6"
                >
                  <!-- Toggle Banner Button -->
                  <button
                    class="w-full flex items-center justify-between p-4 rounded-xl border border-[rgba(0,102,255,0.15)] bg-gradient-to-r from-black/50 via-[#0a0f1e]/80 to-black/50 hover:from-[var(--accent)]/10 hover:to-[var(--accent)]/5 hover:border-[var(--accent)]/30 transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.3)] cursor-pointer"
                    @click="isExpanded = !isExpanded"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-8 h-8 rounded-lg bg-[var(--accent)]/10 group-hover:bg-[var(--accent)]/20 border border-[var(--accent)]/20 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                        <UIcon 
                          name="i-lucide-terminal" 
                          class="text-[var(--accent)] text-lg group-hover:scale-110 transition-transform" 
                          :class="{ 'animate-pulse': !isExpanded }"
                        />
                      </div>
                      <div class="text-left min-w-0">
                        <h4 class="text-xs font-black text-white uppercase tracking-wider flex flex-wrap items-center gap-1.5">
                          Source Code Blueprint
                          <span class="inline-flex items-center gap-1.5 text-[9px] font-bold font-mono bg-[var(--accent)]/10 text-[var(--accent)] px-1.5 py-0.5 rounded border border-[var(--accent)]/20 uppercase tracking-normal">
                            <UIcon 
                              :name="displayProject.codeLanguage === 'csharp' ? 'i-simple-icons-csharp' : 'i-lucide-cpu'" 
                              class="text-[10px]" 
                            />
                            {{ displayProject.codeLanguage }}
                          </span>
                        </h4>
                        <p class="text-[9px] text-[var(--muted)] uppercase tracking-wider mt-0.5 font-bold truncate">
                          {{ displayProject.codeTitle || 'script.cs' }} &bull; Click to toggle preview
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-3 flex-shrink-0">
                      <span class="hidden sm:inline text-[9px] font-black uppercase tracking-widest text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">
                        Toggle
                      </span>
                      <UIcon
                        name="i-lucide-chevron-down"
                        class="text-lg text-[var(--muted)] group-hover:text-[var(--accent)] transition-transform duration-300"
                        :class="{ 'rotate-180 text-[var(--accent)]': isExpanded }"
                      />
                    </div>
                  </button>

                  <!-- Expanded Code Window -->
                  <Transition name="slide-fade">
                    <div
                      v-if="isExpanded"
                      class="code-editor-box mt-4 rounded-xl border border-[rgba(0,102,255,0.12)] bg-black/40 relative overflow-hidden"
                    >
                      <!-- Visual Editor Header -->
                      <div class="code-editor-header flex justify-between items-center px-4 py-3 bg-[#0a0f1e]/80 border-b border-[rgba(0,102,255,0.1)]">
                        <div class="flex items-center gap-2">
                          <!-- Mac dots -->
                          <div class="flex gap-1.5 mr-2">
                            <span class="w-2 h-2 rounded-full bg-[#ff5f56]" />
                            <span class="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                            <span class="w-2 h-2 rounded-full bg-[#27c93f]" />
                          </div>
                          <span class="text-xs font-mono font-medium text-[rgba(232,247,255,0.7)] flex items-center gap-1.5">
                            <UIcon name="i-lucide-file-code" class="text-[var(--accent)] text-xs" />
                            {{ displayProject.codeTitle || 'script.cs' }}
                          </span>
                        </div>
                        <button
                          class="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-black transition-all duration-200 active:scale-95 text-[10px] font-black uppercase tracking-wider text-[rgba(232,247,255,0.9)] cursor-pointer"
                          @click="copyCode(displayProject.codeSnippet)"
                        >
                          <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="text-xs" />
                          <span class="hidden sm:inline">{{ copied ? 'COPIED!' : 'COPY CODE' }}</span>
                        </button>
                      </div>

                      <!-- Code Body with Syntax Highlighting -->
                      <div class="code-editor-body p-5 bg-[#05070e] overflow-x-auto custom-scrollbar select-text max-h-[400px] overflow-y-auto">
                        <pre class="bg-transparent m-0 font-mono text-[11px] sm:text-xs leading-relaxed text-[rgba(232,247,255,0.9)] whitespace-pre"><code class="select-text whitespace-pre" v-html="highlightCode(displayProject.codeSnippet, displayProject.codeLanguage)"></code></pre>
                      </div>
                    </div>
                  </Transition>
                </div>

                <!-- ROW 3: BOTTOM SECTION: Skills & Execution (Full Width) -->
                <div class="clear-both grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 border-t border-[rgba(0,102,255,0.08)]">
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

            <!-- Fixed Bottom Bar - Positioned as page footer -->
            <div class="mt-4 pt-4 border-t border-[rgba(0,102,255,0.08)] flex-shrink-0">
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
  overflow-x: hidden;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 0px;
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

/* Case Study Styling */
.case-study-box {
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.35);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.03) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.case-study-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.case-study-card:hover {
  transform: translateY(-2px);
  background: rgba(12, 12, 15, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

/* Code Editor Styling */
.code-editor-wrapper {
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  min-width: 0;
}

.code-editor-box {
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.45);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.3s ease;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  min-width: 0;
}

.code-editor-box:hover {
  border-color: rgba(0, 102, 255, 0.25);
}

.code-editor-header {
  user-select: none;
}

.code-editor-body {
  border-radius: 0 0 16px 16px;
  background-color: #05070e;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  min-width: 0;
  scrollbar-width: thin;
  scrollbar-color: var(--accent) transparent;
}
.code-editor-body::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}
.code-editor-body::-webkit-scrollbar-thumb {
  background-color: var(--accent);
  border-radius: 10px;
}

.code-editor-body pre {
  max-width: 100%;
  width: 100%;
  overflow-x: auto;
  min-width: 0;
}

.code-editor-body code {
  min-width: 0;
  display: block;
}

/* Slide-fade transition for expanded code drawer */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  overflow: hidden;
}

/* Custom Syntax Highlighting Styles */
:deep(.code-comment) {
  color: #6272a4;
  font-style: italic;
}

:deep(.code-string) {
  color: #ff9e3b;
}

:deep(.code-attribute) {
  color: #f685c8;
}

:deep(.code-keyword) {
  color: #0066ff;
  font-weight: bold;
}

:deep(.code-type) {
  color: #3de68b;
  font-weight: 500;
}

:deep(.code-number) {
  color: #ff5376;
}

:deep(.code-preprocessor) {
  color: #c678dd;
  font-weight: bold;
}
</style>
