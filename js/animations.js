gsap.from("#title-text-container", {
    y: 200,
    opacity: 0,
    duration: 0.8,
    ease: "power1.inOut"
});

// Animationen mit GSAP + ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- Szene 1: Titelbereich mit Parallax-Effekt ---
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#title",
    start: "top top",
    end: "+=200%", // Länge des Scrollabschnitts
    scrub: true,
    pin: true, // fixiert den gesamten Bereich
  },
});

// Text und Hintergrund bleiben stehen
// Das obere Bild (Collage) gleitet von unten nach oben
tl.fromTo(
  "#title-pic-top-container",
  { y: "100%" },   // Start: unterhalb
  { y: "0%", ease: "none" } // Ziel: überlagert das untere Bild
);


const smoother = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: ".smooth-content",
  smooth: 1.2
});

let splitQuoteText = SplitText.create("#quote-text", {type:"lines"});

gsap.from(splitQuoteText.lines, {
    scrollTrigger: {
        trigger: "#opener-quote",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    ease: "power2.out",
    duration: 1,
    stagger: 0.1,
});

let splitQuoteSource = SplitText.create("#quote-source", {type:"chars"});

gsap.from(splitQuoteSource.chars, {
    scrollTrigger: {
        trigger: "#opener-quote",
        start: "bottom 80%",
    },
    y: 50,
    opacity: 0,
    ease: "power2.out",
    duration: 1,
    stagger: 0.05,
});

// --- Szene 2: Opener – Titel bewegt sich horizontal ---

const title = document.querySelector("#story-title");
const titleWidth = title.scrollWidth;
const windowWidth = window.innerWidth;

// Scrolldistanz anpassen: nur so weit scrollen, bis das "E" sichtbar ist
// → wir ziehen ca. 20% der Fensterbreite ab
const scrollDistance = titleWidth - windowWidth * 1;

gsap.to("#story-title", {
  x: -scrollDistance,
  ease: "none",
  scrollTrigger: {
    trigger: "#opener",
    start: "top top",
    end: `+=${scrollDistance}`, // scrollt nur bis "E" sichtbar ist
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

// --- Szene 3: Kapitel 0 – Spalten erscheinen von unten ---
gsap.registerPlugin(ScrollTrigger);

// Linke und rechte Spalte auswählen
const leftCol = document.querySelector(".text-human");
const rightCol = document.querySelector(".text-plants");

// Timeline für sanft versetztes Einblenden
const tlColumns = gsap.timeline({
  scrollTrigger: {
    trigger: "#story-chapter-0",
    start: "top 80%",   // Animation startet, wenn 80% des Viewports erreicht
    end: "bottom 60%",
    toggleActions: "play none none reverse", // rückwärts animieren beim Scrollen zurück
  },
});

// Animationen
tlColumns
  .from(leftCol, {
    y: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  })
  .from(
    rightCol,
    {
      y: 120,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    },
    "-=0.7" // startet leicht versetzt (0.7s nach der linken Spalte)
  );

  // --- Szene 4: Kapitel 1 – Parallax-Bild mit zentriertem Titel ---

gsap.to("#pic-chapter-1 img", {
  yPercent: -30, // bewegt sich 30% langsamer als der Scroll
  ease: "none",
  scrollTrigger: {
    trigger: "#parallax-chapter-1-container",
    start: "top bottom",  // wenn der obere Rand das Viewport-Ende erreicht
    end: "bottom top",    // bis der untere Rand oben ist
    scrub: true,          // sanfter Übergang
  },
});

// Horizontal Scroll Animation für Carousel

gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  const carousel = document.querySelector("#carusel-horizontal-scroll");
  const items = gsap.utils.toArray("#carusel-horizontal-scroll .carusel-item");

  // sichere Abfrage
  if (!carousel || items.length === 0) return;

  // totale Breite der Carousel-Spur (inkl. margins)
  const totalWidth = carousel.scrollWidth;
  const viewportW = document.documentElement.clientWidth;
  const scrollDistance = totalWidth - viewportW + (0.02 * viewportW); // wie weit wir die Spur verschieben müssen

  // Falls scrollDistance <= 0: nichts tun
  if (scrollDistance <= 0) return;

  // wir animieren die ganze spur (den container) nach links
  gsap.to(carousel, {
    x: () => -scrollDistance,
    ease: "none",
    scrollTrigger: {
      trigger: "#chapter-1-container",  // beginnt wenn der section-Block oben ist
      start: "top top",                 // sofort pinned, wenn oben
      end: () => "+=" + scrollDistance, // genug Scroll-Länge bis letztes Bild sichtbar
      scrub: true,
      pin: true,                        // pinnt das ganze section-Block-Verhalten
      anticipatePin: 0.5,
      invalidateOnRefresh: true
    }
  });

  // wichtig: ScrollTrigger neu berechnen, falls responsive oder später geladen wird
  ScrollTrigger.refresh();
});

// --- Szene 5: Icons mit unterschiedlicher Scrollgeschwindigkeit ---
// (setzt voraus, dass ScrollSmoother bereits initialisiert wurde)

const icons = gsap.utils.toArray(".img-group div");

icons.forEach((icon, i) => {
  // Geschwindigkeit aus data-speed lesen (Fallback: 1)
  const speed = parseFloat(icon.dataset.speed) || 1;

  // Mit ScrollSmoother bewegen sich Elemente je nach Geschwindigkeit unterschiedlich
  smoother.effects(icon, { speed: speed, lag: 0 });
});


// --- Szene 6: Kapitel 3 – Hover-Zeilen ändern das Bild ---

// Optional: SplitText, falls du noch Texteffekte planst
// const split = new SplitText("#chapter-3-title", { type: "lines" });
// const lines = split.lines;

const lines = document.querySelectorAll("#chapter-3-title .line");
const image = document.querySelector("#chapter-3-img");

lines.forEach((line) => {
  line.addEventListener("mouseenter", () => {
    const newSrc = line.dataset.img;

    if (image.src.includes(newSrc)) return; // wenn gleiches Bild, nichts tun

    gsap.to(image, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        image.src = newSrc;
        gsap.to(image, { opacity: 1, duration: 0.4 });
      },
    });
  });
});

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------
   1. Progressbar erscheint und wächst mit Scroll
-------------------------------------------------- */

// Fade-In
gsap.fromTo(
  "#chapter-4-progress",
  { opacity: 0 },
  {
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#chapter-4",
      start: "top bottom",   // Section kommt ins Sichtfeld
      once: true             // Fade-In nur beim ersten Mal
    }
  }
);

// Wachstum
gsap.to("#chapter-4-progress", {
  height: "100%",
  ease: "none",
  scrollTrigger: {
    trigger: "#chapter-4",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});


/* --------------------------------------------------
   2. Texte erscheinen, wenn die Progressbar ihre Höhe erreicht
-------------------------------------------------- */

function animateWhenReached(textID) {
  gsap.from(textID, {
    opacity: 0,
    x: textID.includes("mid-left") ? -150 : 150,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: textID,
      start: "top center+=10%",
      toggleActions: "play none none reverse"
    }
  });
}

animateWhenReached("#chapter-4-text-mid-left");
animateWhenReached("#chapter-4-text-top-right");
animateWhenReached("#chapter-4-text-bottom-right");

  // --- Szene 7: Kapitel 5 – Parallax-Bild mit zentriertem Titel ---

gsap.to("#pic-chapter-5 img", {
  yPercent: -30, // bewegt sich 30% langsamer als der Scroll
  ease: "none",
  scrollTrigger: {
    trigger: "#parallax-chapter-5-container",
    start: "top bottom",  // wenn der obere Rand das Viewport-Ende erreicht
    end: "bottom top",    // bis der untere Rand oben ist
    scrub: true,          // sanfter Übergang
  },
});

 // --- Szene 8: Kapitel 5 – Scrubbed Vertical Rodolex ---

gsap.registerPlugin(ScrollTrigger);

/* Alle vier Würfel abrufen */
const sliders = [
  gsap.utils.toArray(".slider-1 .slide"),
  gsap.utils.toArray(".slider-2 .slide"),
  gsap.utils.toArray(".slider-3 .slide"),
  gsap.utils.toArray(".slider-4 .slide")
];

const wrapper = document.querySelector(".quad-wrapper");

/* Prüfen ob alle OK */
sliders.forEach((arr, i) => {
  if (!arr.length) console.warn("Slider", i, "hat keine Slides!");
});

/* Anzahl Slides (mindestens 2) */
const slidesCount = Math.min(
  sliders[0].length,
  sliders[1].length,
  sliders[2].length,
  sliders[3].length
);

/* Grund-Start: erstes Slide sichtbar, andere -90° */
sliders.forEach(slides => {
  gsap.set(slides, {
    rotationX: i => (i ? -90 : 0),
    transformOrigin: "center center -150px"
  });
});

/* Timeline */
const delay = 0.45;
const tlRodolex = gsap.timeline({
  scrollTrigger: {
    trigger: wrapper,
    pin: true,
    scrub: true,
    start: "top top",
    end: `+=${(slidesCount - 1) * 200}%`,
    anticipatePin: 0.5,
    markers: false
  }
});

/* Reihenfolge: 1 → 2 → 3 → 4 → dann nächste Slide */
const order = [3, 1, 2, 0];

for (let i = 0; i < slidesCount - 1; i++) {
  order.forEach(index => {
    const cubeSlides = sliders[index];
    const current = cubeSlides[i];
    const next = cubeSlides[i + 1];

    tlRodolex.to(
      current,
      {
        rotationX: 90,
        duration: 0.6,
        ease: "power1.inOut",
        onComplete: () => gsap.set(current, { rotationX: -90 })
      },
      "+=" + delay
    ).to(
      next,
      {
        rotationX: 0,
        duration: 0.6,
        ease: "power1.inOut"
      },
      "<"
    );
  });
}

/* Abschluss */
tlRodolex.to({}, { duration: delay });
