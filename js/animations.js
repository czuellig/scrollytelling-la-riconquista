// -------------------------------------------------------------
//   GSAP PLANT EDGE-REVEAL FÜR 5 DEFINIERTE SCROLL-PUNKTE
// -------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

// Abschnitts-Trigger für die 5 Pflanzen
const revealPoints = [
  "#opener",
  "#story-chapter-0",
  "#parallax-chapter-1-container",
  "#chapter-2-container",
  "#chapter-4"
];

// Alle Pflanzen im Plant-Layer
const plants = gsap.utils.toArray("#plant-layer .plant");

// Falls Anzahl nicht stimmt → warnen
if (plants.length < revealPoints.length) {
  console.warn("Es wurden weniger Pflanzen als Scroll-Punkte definiert!");
}

// Jede Pflanze einem Scrollpunkt zuordnen
plants.forEach((plant, index) => {

  // ---------------------------
  // 1) Richtung korrekt erkennen
  // ---------------------------
  let direction;

  if (plant.dataset.direction) {
    direction = plant.dataset.direction;
  } else if (plant.classList.contains("left")) {
    direction = "left";
  } else if (plant.classList.contains("right")) {
    direction = "right";
  } else if (plant.classList.contains("top")) {
    direction = "top";
  } else if (plant.classList.contains("bottom")) {
    direction = "bottom";
  } else {
    direction = "left"; // fallback
  }

  // ---------------------------
  // 2) Zufallsposition entlang der Kante
  // ---------------------------
  if (direction === "left" || direction === "right") {
    const randTop = Math.round(5 + Math.random() * 75);
    plant.style.setProperty("--plant-top", randTop + "vh");
  } else {
    const randLeft = Math.round(3 + Math.random() * 92);
    plant.style.setProperty("--plant-left", randLeft + "vw");
  }

  // ---------------------------
  // 3) Animationsparameter
  // ---------------------------
  const animProps = {
    opacity: 1,
    ease: "power3.out",
    duration: 1.6
  };

  if (direction === "left" || direction === "right") {
    animProps.x = 0;
  } else {
    animProps.y = 0;
  }

  gsap.set(plant, { opacity: 0 });

  // ---------------------------
  // 4) ScrollTrigger für den spezifischen Abschnitt
  // ---------------------------
  gsap.to(plant, {
    ...animProps,
    scrollTrigger: {
      trigger: revealPoints[index],   // ← Abschnitt, der Pflanze triggert
      start: "top center",            // erscheint wenn Kapitel ins Zentrum scrollt
      end: "bottom center",
      scrub: true,
      // markers: true, // Debug falls nötig
    },
    onStart: () => gsap.set(plant, { opacity: 1 })
  });

});




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

function animateChapter(chapterNumber) {

  const chapter = `#chapter-${chapterNumber}`;
  const progress = `#chapter-${chapterNumber}-progress`;

  /* --------------------------------------------------
     1. Progressbar erscheint und wächst mit Scroll
  -------------------------------------------------- */

  // Fade-In
  gsap.fromTo(
    progress,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: chapter,
        start: "top bottom",
        once: true
      }
    }
  );

  // Wachstum
  gsap.to(progress, {
    height: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: chapter,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  /* --------------------------------------------------
     2. Texte erscheinen
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

  animateWhenReached(`#chapter-${chapterNumber}-text-mid-left`);
  animateWhenReached(`#chapter-${chapterNumber}-text-top-right`);
  animateWhenReached(`#chapter-${chapterNumber}-text-bottom-right`);
}


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

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.timeline({
  scrollTrigger: {
    trigger: "#chapter-7-end",
    start: "90% bottom",
    once: true,
    markers: true
  },
  delay: 5
})
.from("#chapter-7-end-title", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  ease: "power3.out"
})
.from("#chapter-7-end button", {
  opacity: 0,
  y: 30,
  duration: 1,
  ease: "power3.out"
}, "-=0.4");

const backToTopButton = document.querySelector("#chapter-7-end button");

backToTopButton.addEventListener("click", () => {
  gsap.to(window, {
    scrollTo: { y: 0 },
    duration: 3,
  });
});



animateChapter(4);
animateChapter(6);

