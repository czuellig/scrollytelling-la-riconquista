gsap.from("#title-text-container", {
    y: 200,
    opacity: 0,
    duration: 0.8,
    ease: "power1.inOut"
})

gsap.to("#title-pic-top-container", {
    y: -500,
    scrollTrigger: {
        trigger: "#title",
        start: "top top",
        end: "bottom top",
        scrollSpace: false,
    }
})

let smoother = ScrollSmoother.create({
    wrapper: ".smooth-wrapper",
    content: ".smooth-content", 
   
})
