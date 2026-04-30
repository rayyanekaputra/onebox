// These are client-sided/browser


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
import LocomotiveScroll from "locomotive-scroll";
import navTextsHoverAnimation from "./timelines/navTextsHoverAnimation.js"
import heroTimelineAnimation from "./timelines/heroTimeline.js";



const locomotiveScroll = new LocomotiveScroll();

const $logoletters = utils.$(".logo-letters");
const $navtexts = utils.$(".nav-texts");




//POC
const $boxes = utils.$(".boxes");
const $introHourHeader = utils.$(".intro-header");
const $introWelcomeHeader = utils.$(".intro-welcome");

const { chars: splitIntroHourHeader } = splitText($introHourHeader, {
	chars: {
		class: "intro-split-chars",
		wrap: "clip",
	},
});
const { words: splitIntroWelcomeHeader } = splitText($introWelcomeHeader, {
	words: {
		class: "intro-split-words",
		wrap: "clip",
	},
	includeSpaces: true,
});

const introTimeline = createTimeline();
introTimeline
	.set($boxes, {
		y: "0px",
	})
	.set(splitIntroHourHeader, {
		y: "400px",
	})
	.set(splitIntroWelcomeHeader, {
		y: "800px",
	})
	.add(splitIntroWelcomeHeader, {
		y: "0",
		delay: stagger(100),
		ease: "inOutExpo",
		duration: 1000,
	})

	.add(splitIntroHourHeader, {
		y: "0",
		delay: stagger(100),
		ease: "inOutExpo",
		duration: 1500,
	})
	.add($boxes, {
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

// too lazy to animate one by one.
const worksAnimations = () => {
	let workSectionChilds = [];
	const workSection = document.querySelectorAll(".works-rows");
	workSection.forEach((workNode, index, _) => {
		workSectionChilds.push(workNode.querySelectorAll(".works-header"));
		workSectionChilds.push(
			workNode.querySelectorAll(".works-paragraph"),
		);
		workSectionChilds.push(
			workNode.querySelectorAll(".works-indicator"),
		);
	});

	const fadeUpAnimation = (htmlElement) => {
		animate(htmlElement, {
			opacity: { to: [0, 1], ease: "inOutExpo" },
			y: { to: ["100px", 0], ease: "inOutExpo" },
			autoplay: onScroll({
				// debug: true,
				enter: "bottom start",
				leave: "start bottom",
			}),
			duration: 1500,
		});
	}

	workSectionChilds.forEach((el, i, _) => {
		fadeUpAnimation(el)
	});
};

//master timeline -> main control
const masterTimeline = createTimeline();
masterTimeline
	.sync(introTimeline)
	.sync(heroTimelineAnimation($logoletters, $navtexts, ()=> navTextsHoverAnimation($navtexts)) //expects a function, if just nav..() it returns whats inside instead
		, "3550") 
	.call(worksAnimations);
// masterTimeline.pause();