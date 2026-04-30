//@ts-nocheck
import {
    animate,
    stagger,
    utils,
    createTimeline,
    splitText,
    onScroll,
    steps,
} from "animejs";

const navTextsHoverAnimation = ($el) => {
    $el.forEach((navText, i) => {
        const { chars: splitNavText } = splitText(navText, {
            chars: {
                class: "nav-split-chars",
                wrap: "clip",
                clone: "bottom",
            },
            includeSpaces: true,
            debug: true
        });
        navText.addEventListener('mouseenter', (e) => {
            animate(splitNavText, {
                y: '-100%',
                ease: 'inOutExpo',
                delay: stagger(150),
                duration: 750,
            })
            console.log("HOVER DETECTED! FIRIMG", e.target)
        })
        navText.addEventListener('mouseleave', (e) => {
            animate(splitNavText, {
                y: '0%',
                ease: 'inOutExpo',
                delay: stagger(150),
                duration: 750,
            })
            console.log("LEAVING DETECTED! FIRIMG", e.target)
        })
    })

}

export default navTextsHoverAnimation;

