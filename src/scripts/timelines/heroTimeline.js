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

const heroTimelineAnimation = ($el1, $el2, $el3) => {
    return createTimeline({}).set($el1, {
        clipPath: "inset(0px 400px 0px 0px)",
        translateY: "1000px",
    })
        .set($el2, {
            clipPath: "inset(0px 100px 0px 0px)",
            translateY: "1000px",
        })
        .add($el1, {
            clipPath: {
                to: "inset(0px 0px 0px 0px)",
                delay: stagger(200, { ease: "linear" }),
            },
            translateY: {
                to: "0px",
                delay: stagger(200, { ease: "linear" }),
            },
            duration: 2500,
            ease: "inOutExpo",
        })
        .add(
            $el2,
            {
                clipPath: {
                    to: "inset(0px 0px 0px 0px)",
                    delay: stagger(500, { ease: "linear" }),
                    ease: "inOutCirc",
                },
                translateY: {
                    to: "0px",
                    delay: stagger(200, { ease: "linear" }),
                    ease: "inOutExpo",
                },

                duration: 2500,

                //POC on hover
                onComplete: () => $el3(), //expects a function, then execute it

            },
            "-=2000",
        );



}


export default heroTimelineAnimation;