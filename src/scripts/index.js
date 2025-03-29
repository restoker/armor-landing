import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import SplitType from "split-type";

gsap.registerPlugin(CustomEase);

// DOM elements and animation-related variables
let title;
let logo;
let buttons;
let centerDescription;
let leftDescription;
let gridElements;
let gridElement;
let video;
let animationTimeline; // GSAP timeline instance

CustomEase.create(
    "hop",
    "M0,0 C0,0 0.056,0.445 0.175,0.445 0.294,0.445 0.332,0 0.332,0 0.332,0 0.414,1 0.671,1 0.991,1 1,0 1,0"
);

// Initialize DOM elements used in the animations.
const initializeVariables = () => {
    title = document.querySelector('.title');
    logo = document.querySelector('.logo');
    buttons = document.querySelector('.buttons');
    centerDescription = document.querySelector('center__description');
    leftDescription = document.querySelector('.left__description');
    centerDescription = document.querySelector('.center__description');
    gridElement = document.querySelector('.grid__element');
    video = document.querySelector('.video__element');
    gridElements = document.querySelectorAll('.grid__elements');
};


const animateHomepageElements = () => {
    // if (!gridContainer || !gridItems.length) return;
    const letters = new SplitType(centerDescription);
    // Hide the grid container before starting the animation.
    // gsap.set([logo, buttons, leftDescription, gridElements, gridElement, centerDescription], { opacity: 0 });

    const tl = gsap.timeline({
        //     defaults: {
        //         duration: 1.4,
        //         ease: 'power4',
        //     },
        //     onComplete: () => {
        //         // Dispatch a custom event after all animations complete.
        //         const event = new CustomEvent('gridRendered');
        //         document.dispatchEvent(event);
        //     },
    });
    animationTimeline = tl;

    // tl
    // .from(video, {
    //     yPercent: 180,
    //     duration: 1.6,
    //     ease: 'expo.out'
    // })
    //     .to(video, {
    //         opacity: 1,

    //     })
    tl
        .fromTo(video, {
            yPercent: 180,
        }, {
            duration: 1,
            yPercent: -16,
            ease: "elastic.out(1,0.9)",
        })
        .to(video, {
            duration: 1.5,
            yPercent: 0,
            clipPath: 'circle(100%)',
            delay: 0.8,
        }, '<')
        .fromTo(logo, {
            yPercent: 50,
            opacity: 0,
        }, {
            yPercent: 0,
            opacity: 1,
            ease: 'elastic.out(0.5, 0.4)',
        }, '>-0.9')
        // .to(gridElement, {
        //     opacity: 1,
        // }, '>-0.2')
        // .to(centerDescription, {
        //     opacity: 1,
        // }, '<')
        // .to(title, {
        //     opacity: 1,
        // }, '<')
        .from(title, {
            opacity: 0,
            yPercent: -100,
            duration: 1.3,
        }, '<')
        .from(letters.chars, {
            opacity: 0,
            stagger: {
                from: 'random',
                each: 0.03
            },
        }, '<')
        // .to(leftDescription, {
        //     opacity: 1,
        // }, '<')
        .from(leftDescription, {
            opacity: 0,
            duration: 1.5,
            rotateZ: '-15deg',
            yPercent: 100,
            ease: 'elastic.out(0.5, 0.4)'
        }, '<')
        // .to(buttons, {
        //     opacity: 1,
        // }, '<')
        .from(buttons, {
            opacity: 0,
            duration: 1.5,
            rotateZ: '15deg',
            yPercent: 100,
            ease: 'elastic.out(0.5, 0.4)'
        }, '<')
        // .to(gridElements, {
        //     opacity: 1,
        // }, '<')
        .from(gridElements, {
            opacity: 0,
            duration: 1.9,
            rotateZ: '25deg',
            yPercent: 100,
            ease: 'elastic.out(0.5, 0.4)'
        }, '<')
        .from(gridElement, {
            opacity: 0,

        }, '<0.1')
    //     .fromTo(
    //         lines,
    //         { transformOrigin: '0% 50%', scaleX: 0 },
    //         { duration: 1.6, ease: 'power2', stagger: 0.9, scaleX: 1 }
    //     )
    //     .from(textSliders, { yPercent: 100, stagger: 0.1 }, 0.2)
    //     .set(gridContainer, { autoAlpha: 1 }, '<+=1')
    //     .from(gridItems, { yPercent: 100, stagger: 0.08 }, '<')
    //     .from(gridItems, { ease: 'sine', autoAlpha: 0, stagger: 0.08 }, '<');
};

// Clean up animations and DOM references to prevent memory leaks.
const cleanup = () => {
    if (animationTimeline) {
        animationTimeline.kill(); // Stop the timeline
        animationTimeline = null;
    }
    title = null;
    logo = null;
    buttons = null;
    video = null;
    gridElement = null;
    gridElements = null;
    centerDescription = null;
    leftDescription = null;
};

const init = () => {
    initializeVariables();

    // Disable scroll restoration on browser back navigation.
    // if ('scrollRestoration' in history) {
    //     history.scrollRestoration = 'manual';
    // }
    // Scroll to the top of the page.
    // window.scrollTo(0, 0);

    // Wait for assets to load if a preloader is present.
    // if (hasPreloaderComponent && sessionStorage.getItem('preloadComplete') !== 'true') {
    //     document.addEventListener('assetsLoaded', animateHomepageElements, { once: true });
    // } else {
    animateHomepageElements();
    // }
};


window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('body').classList.remove('loading');
    init();
})

// Run a callback only if the current page is the home page.
// const handlePageEvent = (event, callback) => {
//     const page = document.documentElement.getAttribute('data-page');
//     if (page === 'home') callback();
// };

// // Astro lifecycle hook: initialize animations on page load.
// document.addEventListener('astro:page-load', () => {
//     handlePageEvent('page-load', init);
// });

// // Astro lifecycle hook: clean up before swapping pages.
// document.addEventListener('astro:before-swap', () => {
//     handlePageEvent('before-swap', cleanup);
// });