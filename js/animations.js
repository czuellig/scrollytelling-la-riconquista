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


let smoother = ScrollSmoother.create({
    wrapper: ".smooth-wrapper",
    content: ".smooth-content", 
   
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
        markers: true,
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



