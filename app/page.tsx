import Image from "next/image";
import MotionEffects from "./components/MotionEffects";
import SmoothScroll from "./components/SmoothScroll";

const projects = [
  {
    number: "01",
    title: "BEH NA BOSO TATRY",
    services: "WEB / BRAND / EVENT",
    className: "project project-orange",
  },
  {
    number: "02",
    title: "PLATKO CATERING",
    services: "WEB / E-SHOP / IDENTITY",
    className: "project project-black",
  },
  {
    number: "03",
    title: "APARTMÁN JULI",
    services: "WEB / FOTO / SEO / EMAIL",
    className: "project project-white",
  },
  {
    number: "04",
    title: "OHENTANÉ DIVADLO",
    services: "WEB / SEO / EMAIL",
    className: "project project-orange",
  },
  {
    number: "05",
    title: "LOVE COFFEE",
    services: "E-SHOP / PRODUKTY / MARKETING / SEO",
    className: "project project-black",
  },
];

const processSteps = [
  {
    number: "01",
    title: "SPOZNÁME",
    text: "Krátky call alebo stretnutie. Ciele, potreby, problémy a predstava.",
  },
  {
    number: "02",
    title: "NAVRHNEME",
    text: "Štruktúra, obsah, dizajn a konkrétne riešenie, ktoré dáva zmysel.",
  },
  {
    number: "03",
    title: "POSTAVÍME",
    text: "Implementácia, funkcie, testovanie, optimalizácia a doladenie detailov.",
  },
  {
    number: "04",
    title: "SPUSTÍME",
    text: "Launch nie je koniec. Sledujeme výsledky a pripravujeme ďalší rast.",
  },
];

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <MotionEffects />
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress-bar" />
      </div>
      <div className="rocket-cursor" aria-hidden="true" />
      <section className="hero" aria-labelledby="hero-title">
        <header className="nav shell">
          <a className="brand" href="#top" aria-label="Rocketman domov">
            <Image
              src="/rocketman-logo.svg"
              alt="Rocketman"
              width={170}
              height={48}
              priority
            />
          </a>

          <nav aria-label="Hlavná navigácia">
            <a href="#work">WORK</a>
            <a href="#services">SLUŽBY</a>
            <a href="#process">PROCES</a>
            <a href="#contact">KONTAKT</a>
          </nav>
        </header>

        <div className="hero-grid shell" id="top">
          <div className="hero-copy">
            <p className="eyebrow">DIGITAL STUDIO / EST. 2026</p>

            <h1 id="hero-title">
              WE DON&apos;T
              <br />
              BUILD
              <br />
              <span>WEBSITES.</span>
            </h1>

            <p className="hero-punchline">WE BUILD MOMENTUM.</p>

            <p className="hero-description">
              Web, marketing a digitálne riešenia pre značky, ktoré nechcú
              zostať stáť na mieste.
            </p>

            <div className="hero-actions">
              <a className="button button-orange" href="#contact" data-magnetic>
                BEZPLATNÁ KONZULTÁCIA ↗
              </a>
              <a className="text-link" href="#work">
                POZRIEŤ WORK ↓
              </a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <Image
              src="/01-astronaut-launch.png"
              alt=""
              width={900}
              height={900}
              priority
              sizes="(max-width: 850px) 90vw, 46vw"
              className="hero-astronaut"
            />
          </div>
        </div>

        <div className="hero-foot shell">
          <span>DESIGN / WEB / MARKETING / GROWTH</span>
          <span>SCROLL TO LAUNCH ↓</span>
        </div>
      </section>

      <section className="manifest section-light section-with-transition">
        <div className="shell manifest-grid">
          <div className="section-index" data-drift>01 / APPROACH</div>

          <div>
            <h2 className="manifest-title" data-kinetic>
              Dizajn,
              <br />
              ktorý
              <br />
              <span>komunikuje.</span>
            </h2>

            <p className="manifest-copy">
              Pekný web nestačí. Každý detail musí mať dôvod, smer a úlohu.
              Dizajn má človeka viesť, nie len zaplniť obrazovku.
            </p>
          </div>
        </div>
              <div className="color-transition transition-to-orange transition-diagonal" data-transition="diagonal" aria-hidden="true" />
      </section>

      <section className="technology section-orange">
        <div className="shell split-section">
          <div className="art-stage art-stage-clean" aria-hidden="true" data-tilt>
            <Image
              src="/03-web-ui-orbit.png"
              data-parallax="60"
              alt=""
              width={900}
              height={900}
              sizes="(max-width: 850px) 82vw, 43vw"
            />
          </div>

          <div className="split-copy">
            <p className="section-label">TECHNOLOGY / AUTOMATION</p>
            <h2>
              Technológia,
              <br />
              ktorá šetrí
              <br />
              <span>čas.</span>
            </h2>
            <p>
              Navrhujeme digitálne riešenia, ktoré nerobia viac práce.
              Robia správnu prácu jednoduchšie.
            </p>
          </div>
        </div>
      </section>
      <section className="marquee marquee-dark" aria-hidden="true">
  <div className="marquee-track">
    <span>WEB</span>
    <span className="marquee-dot">✦</span>
    <span>E-SHOP</span>
    <span className="marquee-dot">✦</span>
    <span>BRANDING</span>
    <span className="marquee-dot">✦</span>
    <span>SEO</span>
    <span className="marquee-dot">✦</span>
    <span>AUTOMATION</span>
    <span className="marquee-dot">✦</span>
    <span>AI</span>
    <span className="marquee-dot">✦</span>
    <span>WEB</span>
    <span className="marquee-dot">✦</span>
    <span>E-SHOP</span>
    <span className="marquee-dot">✦</span>
  </div>
</section>

      <section className="services-intro section-light section-with-transition" id="services">
        <div className="shell services-intro-grid">
          <div>
            <p className="section-label">WHAT WE DO</p>
            <h2>
              TRI SMERY.
              <br />
              <span>JEDEN CIEĽ.</span>
            </h2>
          </div>

          <div className="services-intro-copy" data-reveal="right">
            <p>
              Web, marketing a rast nevnímame ako tri oddelené služby.
              Spájame ich do jedného systému.
            </p>
            <p>
              Cieľ je jednoduchý: aby značka lepšie <strong>vyzerala</strong>,
              lepšie <strong>fungovala</strong> a mala kam <strong>rásť</strong>.
            </p>
          </div>
        </div>
              <div className="color-transition transition-to-black transition-diagonal" data-transition="diagonal" aria-hidden="true" />
      </section>

      <section className="service-section service-web section-with-transition">
        <div className="shell service-grid">
          <div className="service-copy">
            <p className="service-index">01 / WEB</p>
            <h2 data-kinetic>WEB</h2>
            <p className="service-tags">
              WEBY • E-SHOPY • AUTOMATIZÁCIE • AI RIEŠENIA
            </p>
            <p className="service-description">
              Digitálne priestory s jasnou logikou. Od jednoduchej prezentačnej
              stránky až po e-shop a custom riešenia.
            </p>
            <a className="text-link light" href="#">
              OBJAVIŤ WEB ↗
            </a>
          </div>

          <div className="service-art" aria-hidden="true" data-tilt>
            <Image
              src="/03-web-ui-orbit.png"
              data-parallax="70"
              alt=""
              width={850}
              height={850}
              sizes="(max-width: 850px) 82vw, 42vw"
            />
          </div>
        </div>
              <div className="color-transition transition-to-orange transition-radial" data-transition="radial" aria-hidden="true" />
      </section>

      <section className="service-section service-marketing section-with-transition">
        <div className="shell service-grid reverse-mobile">
          <div className="service-art" aria-hidden="true" data-tilt>
            <Image
              src="/04-marketing-megaphone.png"
              data-parallax="55"
              alt=""
              width={850}
              height={850}
              sizes="(max-width: 850px) 82vw, 42vw"
            />
          </div>

          <div className="service-copy">
            <p className="service-index">02 / MARKETING</p>
            <h2 data-kinetic>MARKETING</h2>
            <p className="service-tags">BRAND • SOCIAL • KAMPANE • SEO</p>
            <p className="service-description">
              Komunikácia, ktorá má hlas a charakter. Od vizuálnej identity
              cez obsah až po kampane postavené na výsledkoch.
            </p>
            <a className="text-link" href="#">
              OBJAVIŤ MARKETING ↗
            </a>
          </div>
        </div>
              <div className="color-transition transition-to-light transition-wipe" data-transition="wipe" aria-hidden="true" />
      </section>

      <section className="service-section service-growth section-with-transition">
        <div className="shell service-grid">
          <div className="service-copy">
            <p className="service-index">03 / RAST</p>
            <h2 data-kinetic>RAST</h2>
            <p className="service-tags">STRATÉGIA • DÁTA • PROCESY • ŠKÁLOVANIE</p>
            <p className="service-description">
              Rast nie je náhoda. Hľadáme slabé miesta, zjednodušujeme procesy
              a vytvárame systém pripravený na ďalší krok.
            </p>
            <a className="text-link" href="#">
              OBJAVIŤ RAST ↗
            </a>
          </div>

          <div className="service-art" aria-hidden="true" data-tilt>
            <Image
              src="/05-growth-rocket-analytics.png"
              data-parallax="65"
              alt=""
              width={850}
              height={850}
              sizes="(max-width: 850px) 82vw, 42vw"
            />
          </div>
        </div>
              <div className="color-transition transition-to-black transition-diagonal" data-transition="diagonal" aria-hidden="true" />
      </section>

      <section className="offer section-black section-with-transition">
        <div className="shell">
          <div className="offer-head" data-reveal="up">
            <div>
              <p className="section-label orange">NO STRINGS ATTACHED</p>
              <h2>
                ZAČAŤ
                <br />
                JE <span>JEDNODUCHÉ.</span>
              </h2>
            </div>
          </div>

          <div className="offer-grid">
            <article>
              <span>01</span>
              <h3>BEZPLATNÁ KONZULTÁCIA</h3>
              <p>
                Najprv pochopíme projekt, problém a cieľ. Bez záväzkov a bez
                predajných rečí.
              </p>
            </article>

            <article className="offer-highlight">
              <span>02</span>
              <h3>JASNÁ CENOVÁ PONUKA</h3>
              <p>
                Pred začiatkom dostanete návrh riešenia, rozsah projektu a
                cenu. Bez prekvapení po ceste.
              </p>
            </article>
          </div>
        </div>
              <div className="color-transition transition-to-orange transition-radial" data-transition="radial" aria-hidden="true" />
      </section>

      <section className="collaboration section-orange section-with-transition" id="process">
        <div className="shell">
          <div className="process-head" data-reveal="left" data-kinetic>
            <p className="section-label">HOW IT WORKS</p>
            <h2>
              OD PRVÉHO
              <br />
              CALLU PO
              <br />
              <span>LAUNCH.</span>
            </h2>
          </div>

          <div className="steps">
            {processSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
              <div className="color-transition transition-to-light transition-wipe-right" data-transition="wipe-right" aria-hidden="true" />
      </section>

      <section className="work section-light section-with-transition" id="work">
        <div className="shell">
          <div className="work-heading" data-reveal="up" data-kinetic>
            <p className="section-label">SELECTED WORK</p>
            <h2>
              NIE KARTY.
              <br />
              <span>DIGITÁLNE PLAGÁTY.</span>
            </h2>
            <p>
              Vybrané projekty, pri ktorých sme riešili rozdielne problémy,
              značky aj ciele.
            </p>
          </div>

          <div className="projects">
            {projects.map((project) => (
              <article
  className={project.className}
  key={project.number}
  data-clip
>
                <span className="project-number">{project.number}</span>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.services}</p>
                </div>
                <a href="#" aria-label={`Otvoriť projekt ${project.title}`}>
                  VIEW ↗
                </a>
              </article>
            ))}
          </div>
        </div>
              <div className="color-transition transition-to-black transition-diagonal" data-transition="diagonal" aria-hidden="true" />
      </section>

      <section className="mission section-black section-with-transition">
        <div className="shell mission-head" data-reveal="up">
          <div>
            <p className="section-label orange">THE ROCKETMAN METHOD</p>
            <h2>
              OD ZÁKLADU
              <br />
              AŽ PO
              <br />
              <span>ORBITU.</span>
            </h2>
          </div>

          <p>
            Namiesto troch obrovských slov bez významu ukazujeme tri reálne
            fázy projektu. Každá má vlastnú úlohu, rytmus a vizuálny moment.
          </p>
        </div>

        <div className="mission-flow shell">
          <article className="mission-step">
            <div className="mission-art" aria-hidden="true" data-tilt>
              <Image
                src="/06-build-modules-isometric.png"
                alt=""
                width={650}
                height={650}
                sizes="(max-width: 850px) 74vw, 31vw"
              />
            </div>
            <div className="mission-copy">
              <span>01 / BUILD</span>
              <h3>POSTAVÍME PEVNÝ ZÁKLAD.</h3>
              <p>
                Štruktúra, obsah, dizajn a technológia musia fungovať ako jeden
                systém. Najprv logika, potom efekty.
              </p>
            </div>
          </article>

          <article className="mission-step mission-step-reverse">
            <div className="mission-art" aria-hidden="true" data-tilt>
              <Image
                src="/07-launch-burst-arrow.png"
                alt=""
                width={650}
                height={650}
                sizes="(max-width: 850px) 74vw, 31vw"
              />
            </div>
            <div className="mission-copy">
              <span>02 / LAUNCH</span>
              <h3>SPUSTÍME TO MEDZI ĽUDÍ.</h3>
              <p>
                Testovanie, výkon, analytika a ostrý štart. Launch je moment,
                keď dizajn prestáva byť návrhom a začne pracovať.
              </p>
            </div>
          </article>

          <article className="mission-step">
            <div className="mission-art" aria-hidden="true" data-tilt>
              <Image
                src="/08-growth-chart-orbit.png"
                alt=""
                width={650}
                height={650}
                sizes="(max-width: 850px) 74vw, 31vw"
              />
            </div>
            <div className="mission-copy">
              <span>03 / SCALE</span>
              <h3>MERIAME. UPRAVUJEME. RASTIEME.</h3>
              <p>
                Dáta, nové funkcie, automatizácie a ďalšie kroky podľa toho,
                čo reálne funguje. Nie podľa pocitu.
              </p>
            </div>
          </article>
        </div>
              <div className="color-transition transition-to-purple transition-radial" data-transition="radial" aria-hidden="true" />
      </section>

      <section className="playground section-with-transition">
        <div className="shell playground-grid">
          <div>
            <p className="section-label">NO. 08 / PLAYGROUND</p>
            <h2>
              GRAVITY
              <br />
              IS JUST A
              <br />
              <span>SUGGESTION.</span>
            </h2>
            <p>
              Toto je priestor, kde neskôr pustíme motion, scroll effects,
              fyziku, 3D a experimenty. Zatiaľ držíme layout čistý.
            </p>
          </div>

          <div className="playground-art" aria-hidden="true" data-tilt>
            <Image
              src="/02-rocket-flame.png"
              alt=""
              width={850}
              height={850}
              sizes="(max-width: 850px) 82vw, 42vw"
            />
          </div>
        </div>
              <div className="color-transition transition-to-orange transition-diagonal" data-transition="diagonal" aria-hidden="true" />
      </section>

      <section className="final-cta section-orange section-with-transition" id="contact">
        <div className="shell final-cta-grid">
          <div>
            <p className="section-label">HAVE SOMETHING WORTH BUILDING?</p>
            <h2 data-kinetic>
              READY
              <br />
              FOR
              <br />
              <span>LAUNCH?</span>
            </h2>
            <p className="cta-copy">
              Prvé stretnutie je bezplatné. Povedzte nám, čo chcete postaviť,
              a pripravíme ďalší krok.
            </p>
            <a
  className="button button-black"
  href="mailto:info@rocketman.digital"
  data-magnetic
>
              START A PROJECT ↗
            </a>
          </div>

          <div className="cta-art" aria-hidden="true" data-tilt>
            <Image
              src="/01-astronaut-launch.png"
              alt=""
              width={850}
              height={850}
              sizes="(max-width: 850px) 82vw, 42vw"
            />
          </div>
        </div>
              <div className="color-transition transition-to-black transition-wipe" data-transition="wipe" aria-hidden="true" />
      </section>

      <footer className="footer section-black">
        <div className="shell footer-grid">
          <Image
            src="/rocketman-logo.svg"
            alt="Rocketman"
            width={160}
            height={45}
          />
          <p>
            THE TENDENCY TO <span>GROW.</span>
          </p>
          <div>
            <a href="#services">SLUŽBY</a>
            <a href="#work">WORK</a>
            <a href="#contact">KONTAKT</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 ROCKETMAN.DIGITAL</span>
          <span>WEB / MARKETING / GROWTH</span>
        </div>
      </footer>
    </main>
  );
}
