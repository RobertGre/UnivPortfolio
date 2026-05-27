<template>
  <section
    id="home"
    class="hero section"
  >
    <div class="hero__content">
      <span class="hero__eyebrow">Game Developer | Technical Programmer</span>
      <h1>Robert Catalin Crisan</h1>
      <p class="hero__tagline text-sm sm:text-base max-w-lg mx-auto text-[var(--muted)] mt-4">
        A portfolio showcasing my core work, technical projects, and game development journey during my time at the University of Greenwich.
      </p>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-pulse pointer-events-none">
      <span class="text-[9px] font-black uppercase tracking-[0.5em] text-[var(--muted)]">Scroll</span>
      <UIcon
        name="i-lucide-chevron-down"
        class="text-lg text-[var(--accent)]"
      />
    </div>
  </section>
</template>
