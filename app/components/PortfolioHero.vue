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
      
      <!-- Premium CV Button -->
      <div class="hero__actions mt-8 flex justify-center">
        <a
          href="Robert_Catalin_Crisan_CV.pdf"
          target="_blank"
          class="hero__cv-btn"
        >
          <UIcon name="i-lucide-file-text" class="w-5 h-5 text-current" />
          <span>View CV</span>
        </a>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-30 animate-pulse pointer-events-none">
      <span class="text-[9px] font-black uppercase tracking-[0.5em] text-[var(--muted)]">Scroll</span>
      <UIcon
        name="i-lucide-chevron-down"
        class="text-lg text-[var(--accent)]"
      />
    </div>
  </section>
</template>

<style scoped>
.hero__cv-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 2rem;
  font-size: 0.9rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #000000;
  background: var(--accent);
  border: 1px solid var(--accent-strong);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 102, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
}

.hero__cv-btn:hover {
  transform: translateY(-2px) scale(1.03);
  background: var(--accent-strong);
  color: #ffffff;
  border-color: var(--accent);
  box-shadow: 0 6px 25px rgba(110, 61, 255, 0.5), 0 0 15px rgba(0, 102, 255, 0.3);
}

@media (max-width: 620px) {
  .hero__cv-btn {
    padding: 0.65rem 1.5rem;
    font-size: 0.8rem;
    border-radius: 10px;
  }
}
</style>

