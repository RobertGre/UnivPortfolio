<template>
  <section
    id="about"
    class="about section"
  >
    <div class="section__header">
      <div class="cyber-box px-8 py-3 mb-4 inline-block">
        <p class="section__label !mb-0 font-black">
          EDUCATION & CONTACT
        </p>
      </div>
    </div>
    <div class="about__grid">
      <div class="about__card about__card--full">
        <h3>About Me</h3>
        <p class="about__item text-[var(--muted)] leading-relaxed">
          Graduating BSc (Hons) student at the University of Greenwich with a strong foundation in C#, C++, and Web Technologies (HTML/JS). Experienced in shipping and prototyping both single-player and multiplayer co-op games across Unity and Unreal Engine, including VR development. My portfolio spans a diverse range of projects, from immersive puzzle games like Echo: Bound by Choice and VR co-op adventures like Echoes Of The Twin Tombs, to highly technical AI modeling, simulation software, and custom shader programming.
        </p>
      </div>
      <div class="about__card">
        <h3>Education</h3>
        <p class="about__item">
          <span class="about__key">University of Greenwich</span>
        </p>
        <p class="about__item">
          <span class="about__key">BSc (Hons) Games Development</span>
        </p>
        <p class="about__item">
          <span class="about__key">2023 - 2026</span>
        </p>
      </div>
      <div class="about__card about__card--accent">
        <h3>Reach Out</h3>
        <p class="about__item flex items-center gap-3">
          <UIcon
            name="i-lucide-mail"
            class="text-[var(--accent)] text-lg"
          />
          <a
            href="mailto:robert.crisan2106@gmail.com"
            class="about__link"
          >robert.crisan2106@gmail.com</a>
        </p>
        <p class="about__item flex items-center gap-3">
          <UIcon
            name="i-lucide-linkedin"
            class="text-[var(--accent)] text-lg"
          />
          <a
            href="https://www.linkedin.com/in/robertcatalincrisan/"
            target="_blank"
            class="about__link"
          >linkedin.com/in/robertcatalincrisan</a>
        </p>
        <p class="about__item flex items-center gap-3">
          <UIcon
            name="i-lucide-github"
            class="text-[var(--accent)] text-lg"
          />
          <a
            href="https://github.com/RobertGre"
            target="_blank"
            class="about__link"
          >github.com/RobertGre</a>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__link {
  color: var(--text);
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(116, 245, 255, 0.1);
  display: inline-block;
}

.about__link:hover {
  color: var(--accent);
  text-shadow: 0 0 8px rgba(116, 245, 255, 0.4);
  transform: translateX(4px);
  background: rgba(116, 245, 255, 0.08);
  border-color: var(--accent);
}
</style>
