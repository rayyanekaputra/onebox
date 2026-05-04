//@ts-nocheck
import {
	animate,
	createTimeline,
	onScroll,
	split,
	utils,
	stagger
} from "animejs";
import LocomotiveScroll from "locomotive-scroll";
import navTextsHoverAnimation from "./animations/navTextsHoverAnimation.js"
import heroTimelineAnimation from "./timelines/heroTimeline.js";
import introTimeline from "./timelines/splitIntroTextsTimeline.js";
import worksAnimations from "./animations/worksAnimations.js";
import { LogoLetters, NavTexts, Boxes, IntroHours, IntroWelcome } from "./utils/elements.js";


const locomotiveScroll = new LocomotiveScroll();

//workDifferent text iterator
const [$workDifferent] = utils.$('.deadline-std')
const workDifferentText = document.querySelector('.work-row-different')
const splitWorkDifferentText = workDifferentText.textContent.split('.')
workDifferentText.textContent = ''
const splitWorkDifferentTextSpan = splitWorkDifferentText.map((textPart, i) => {
	if (i < splitWorkDifferentText.length - 1) { //to skip that empty string after '.'
		let spanEl = document.createElement('span')
		spanEl.textContent = `${textPart}.`
		spanEl.className = `span-works span-work-${i}`
		// console.log(spanEl.textContent, typeof (spanEl.textContent))
		return workDifferentText.appendChild(spanEl)
	}
})


animate($workDifferent, {
	backgroundSize: {
		to: ['200vw', '100vw'],
		ease: "linear"
	},
	'--bg-overlay-transparent': {
		to: [0.0, 0.8],
		ease: "outExpo"
	},
	autoplay: onScroll({
		enter: 'bottom-=250 top',
		leave: 'top+=250 bottom',
		sync: true,
	}),
})

animate(splitWorkDifferentTextSpan, {
	opacity: [0.0, 1.0],
	delay: stagger(250),
	autoplay: onScroll({
		enter: 'bottom',
		leave: 'top',
		sync: true,
	}),
	ease: "inOutExpo",
	duration: 1500,
})


//master timeline -> main control
const masterTimeline = createTimeline();
masterTimeline
	// .sync(introTimeline(Boxes, IntroHours, IntroWelcome))
	.sync(heroTimelineAnimation(LogoLetters, NavTexts, () => navTextsHoverAnimation(NavTexts)) //expects a function, if just nav..() it returns whats inside instead
		, "3550")
	.call(() => worksAnimations());