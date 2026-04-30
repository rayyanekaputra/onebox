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
import navTextsHoverAnimation from "./animations/navTextsHoverAnimation.js"
import heroTimelineAnimation from "./timelines/heroTimeline.js";
import introTimeline from "./timelines/splitIntroTextsTimeline.js";
import worksAnimations from "./animations/worksAnimations.js";

console.log(worksAnimations())

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


//master timeline -> main control
const masterTimeline = createTimeline();
masterTimeline
	.sync(introTimeline($boxes,splitIntroHourHeader, splitIntroWelcomeHeader))
	.sync(heroTimelineAnimation($logoletters, $navtexts, ()=> navTextsHoverAnimation($navtexts)) //expects a function, if just nav..() it returns whats inside instead
		, "3550") 
	.call(worksAnimations);
// masterTimeline.pause();