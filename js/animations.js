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
gsap.registerPlugin(ScrollTrigger);

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

