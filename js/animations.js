document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const stripes = document.querySelectorAll(".zebrastreifen");
  let hasScrolled = false;

  main.addEventListener("scroll", () => {
    if (!hasScrolled && main.scrollTop > 0) {
      hasScrolled = true;
      stripes.forEach((stripe, i) => {
        // Leichter Delay pro Streifen für dynamischeren Effekt
        setTimeout(() => {
          stripe.classList.add("active");
        }, i * 150);
      });
    }
  });
});

main.addEventListener("scroll", () => {
  if (main.scrollTop === 0) {
    stripes.forEach(stripe => stripe.classList.remove("active"));
    hasScrolled = false;
  }
});