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

const introTimeline = ($el1, $el2, $el3) => createTimeline()
    .set($el1, {
        y: "0px",
    })
    .set($el2, {
        y: "400px",
    })
    .set($el3, {
        y: "800px",
    })
    .add($el3, {
        y: "0",
        delay: stagger(100),
        ease: "inOutExpo",
        duration: 1000,
    })

    .add($el2, {
        y: "0",
        delay: stagger(100),
        ease: "inOutExpo",
        duration: 1500,
    })
    .add($el1, {
        y: "1000px",
        delay: stagger(100, {
            start: 150, //kapan mulai
            reversed: false,
        }),
        ease: "inOutCirc",
        duration: 1000,
    })
    .set(utils.$(".intro"), {
        display: "none",
    });

    export default introTimeline