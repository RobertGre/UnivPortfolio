<template>
  <section
    id="about"
    class="about section"
  >
    <div class="section__header">
      <div class="cyber-box px-8 py-3 mb-4 inline-block">
        <p class="section__label !mb-0 font-black">
          PROFILE & CAPABILITIES
        </p>
      </div>
    </div>
    <div class="about__grid">
      <!-- About Me Card -->
      <div class="about__card about__card--full">
        <h3>About Me</h3>
        <p class="about__item text-[var(--muted)] leading-relaxed">
          Graduating BSc (Hons) student at the University of Greenwich with a strong foundation in C#, C++, and Web Technologies (HTML/JS). Experienced in shipping and prototyping both single-player and multiplayer co-op games across Unity and Unreal Engine, including VR development. My portfolio spans a diverse range of projects, from immersive puzzle games like Echo: Bound by Choice and VR co-op adventures like Echoes Of The Twin Tombs, to highly technical AI modeling, simulation software, and custom shader programming.
        </p>
      </div>

      <!-- Technical Skills Matrix Card -->
      <div class="about__card about__card--full">
        <h3>Technical Skills Matrix</h3>
        <div class="skills-grid">
          <!-- Languages Column -->
          <div class="skills-group">
            <h4 class="skills-group__title">
              <UIcon name="i-lucide-code" class="skills-group__icon text-[var(--accent)]" />
              Languages
            </h4>
            <div class="skills-list">
              <div class="skill-badge" data-skill="csharp">
                <UIcon name="i-simple-icons-csharp" class="skill-badge__icon text-[#512BD4]" />
                <span class="skill-badge__name">C#</span>
              </div>
              <div class="skill-badge" data-skill="cpp">
                <UIcon name="i-simple-icons-cplusplus" class="skill-badge__icon text-[#00599C]" />
                <span class="skill-badge__name">C++</span>
              </div>
              <div class="skill-badge" data-skill="hlsl">
                <UIcon name="i-lucide-terminal" class="skill-badge__icon text-[var(--accent)]" />
                <span class="skill-badge__name">HLSL (Shaders)</span>
              </div>
              <div class="skill-badge" data-skill="javascript">
                <UIcon name="i-simple-icons-javascript" class="skill-badge__icon text-[#F7DF1E]" />
                <span class="skill-badge__name">JavaScript</span>
              </div>
              <div class="skill-badge" data-skill="htmlcss">
                <div class="flex gap-1 items-center">
                  <UIcon name="i-simple-icons-html5" class="skill-badge__icon text-[#E34F26]" />
                  <UIcon name="i-simple-icons-css3" class="skill-badge__icon text-[#1572B6] text-sm" />
                </div>
                <span class="skill-badge__name">HTML / CSS</span>
              </div>
            </div>
          </div>

          <!-- Engines & Tech Column -->
          <div class="skills-group">
            <h4 class="skills-group__title">
              <UIcon name="i-lucide-cpu" class="skills-group__icon text-[var(--accent)]" />
              Engines & Tech
            </h4>
            <div class="skills-list">
              <div class="skill-badge" data-skill="unity">
                <UIcon name="i-simple-icons-unity" class="skill-badge__icon text-[#FFFFFF]" />
                <span class="skill-badge__name">Unity Engine</span>
              </div>
              <div class="skill-badge" data-skill="unreal">
                <UIcon name="i-simple-icons-unrealengine" class="skill-badge__icon text-[#FFFFFF] opacity-80" />
                <span class="skill-badge__name">Unreal Engine 5</span>
              </div>
              <div class="skill-badge" data-skill="xrit">
                <UIcon name="i-lucide-glasses" class="skill-badge__icon text-[var(--accent)]" />
                <span class="skill-badge__name">XRIT (VR/AR)</span>
              </div>
              <div class="skill-badge" data-skill="normcore">
                <UIcon name="i-lucide-network" class="skill-badge__icon text-[var(--accent)]" />
                <span class="skill-badge__name">Normcore VR</span>
              </div>
            </div>
          </div>

          <!-- Core Competencies Column -->
          <div class="skills-group">
            <h4 class="skills-group__title">
              <UIcon name="i-lucide-brain" class="skills-group__icon text-[var(--accent)]" />
              Competencies
            </h4>
            <div class="skills-list">
              <div class="skill-badge" data-skill="gameplay">
                <UIcon name="i-lucide-gamepad-2" class="skill-badge__icon text-[var(--accent)]" />
                <span class="skill-badge__name">Gameplay Prog.</span>
              </div>
              <div class="skill-badge" data-skill="replication">
                <UIcon name="i-lucide-server" class="skill-badge__icon text-[var(--accent)]" />
                <span class="skill-badge__name">Network Replication</span>
              </div>
              <div class="skill-badge" data-skill="shadermath">
                <UIcon name="i-lucide-activity" class="skill-badge__icon text-[var(--accent)]" />
                <span class="skill-badge__name">GPU Shader Math</span>
              </div>
              <div class="skill-badge" data-skill="ai">
                <UIcon name="i-lucide-bot" class="skill-badge__icon text-[var(--accent)]" />
                <span class="skill-badge__name">Agent-Based AI</span>
              </div>
              <div class="skill-badge" data-skill="git">
                <UIcon name="i-simple-icons-git" class="skill-badge__icon text-[#F05032]" />
                <span class="skill-badge__name">Git Version Control</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Education Card -->
      <div class="about__card flex flex-col justify-center">
        <h3>Education</h3>
        <p class="about__item">
          <span class="about__key text-lg font-bold">University of Greenwich</span>
        </p>
        <p class="about__item">
          <span class="about__key text-sm text-[var(--accent)]">BSc (Hons) Games Development</span>
        </p>
        <p class="about__item">
          <span class="about__key text-xs font-mono opacity-65">2023 - 2026</span>
        </p>
      </div>

      <!-- Reach Out Card -->
      <div class="about__card about__card--accent flex flex-col justify-between">
        <div>
          <h3>Reach Out</h3>
          <p class="about__item flex items-center gap-3 w-full min-w-0">
            <span class="w-6 flex-shrink-0 flex justify-center">
              <UIcon
                name="i-lucide-mail"
                class="text-[var(--accent)] text-lg"
              />
            </span>
            <a
              href="mailto:robert.crisan2106@gmail.com"
              class="about__link"
            >robert.crisan2106@gmail.com</a>
          </p>
          <p class="about__item flex items-center gap-3 w-full min-w-0">
            <span class="w-6 flex-shrink-0 flex justify-center">
              <UIcon
                name="i-lucide-linkedin"
                class="text-[var(--accent)] text-lg"
              />
            </span>
            <a
              href="https://www.linkedin.com/in/robertcatalincrisan/"
              target="_blank"
              class="about__link"
            >linkedin.com/in/robertcatalincrisan</a>
          </p>
          <p class="about__item flex items-center gap-3 w-full min-w-0">
            <span class="w-6 flex-shrink-0 flex justify-center">
              <UIcon
                name="i-lucide-github"
                class="text-[var(--accent)] text-lg"
              />
            </span>
            <a
              href="https://github.com/RobertGre"
              target="_blank"
              class="about__link"
            >github.com/RobertGre</a>
          </p>
        </div>

        <!-- Premium CV CTA Button -->
        <div class="mt-6 pt-4 border-t border-[rgba(116,245,255,0.1)] w-full">
          <a
            href="/Robert_Catalin_Crisan_Resume.pdf"
            target="_blank"
            class="about__cv-link"
          >
            <UIcon name="i-lucide-file-text" class="text-base text-current" />
            <span>View CV / Resume</span>
            <UIcon name="i-lucide-external-link" class="text-xs text-current ml-1 opacity-70" />
          </a>
        </div>
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
  border: 1px solid var(--border);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  flex: 1;
  min-width: 0;
}

.about__link:hover {
  color: var(--accent);
  text-shadow: 0 0 8px rgba(116, 245, 255, 0.4);
  transform: translateX(4px);
  background: rgba(116, 245, 255, 0.08);
  border-color: var(--accent);
}

@media (max-width: 620px) {
  .about__link {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
}

/* Premium CV CTA Link styling */
.about__cv-link {
  color: #000000;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: var(--accent);
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  border: 1px solid var(--accent-strong);
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(116, 245, 255, 0.2);
}

.about__cv-link:hover {
  color: #ffffff;
  background: var(--accent-strong);
  border-color: var(--accent);
  box-shadow: 0 4px 15px rgba(110, 61, 255, 0.4), 0 0 10px rgba(116, 245, 255, 0.3);
  transform: translateY(-1px);
}

/* Skills Matrix Styling */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

@media (max-width: 1080px) {
  .skills-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

.skills-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.skills-group__title {
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(116, 245, 255, 0.15);
  padding-bottom: 0.6rem;
  margin-bottom: 0.4rem;
  min-height: 2.5rem;
}

.skills-group__icon {
  font-size: 1.1rem;
}

.skills-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.skill-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.85rem;
  background: rgba(12, 12, 15, 0.6);
  border: 1px solid rgba(116, 245, 255, 0.08);
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.skill-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: transparent;
  transition: background-color 0.3s ease;
}

.skill-badge:hover {
  transform: translateX(4px);
  background: rgba(116, 245, 255, 0.06);
  border-color: rgba(116, 245, 255, 0.35);
  box-shadow: 0 4px 15px rgba(116, 245, 255, 0.08);
}

.skill-badge:hover::before {
  background: linear-gradient(to bottom, var(--accent), var(--accent-strong));
}

.skill-badge__icon {
  font-size: 1.1rem;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.skill-badge:hover .skill-badge__icon {
  transform: scale(1.15);
}

.skill-badge__name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--muted);
  transition: color 0.3s ease;
}

.skill-badge:hover .skill-badge__name {
  color: var(--text);
}
</style>

