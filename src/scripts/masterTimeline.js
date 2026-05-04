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
import { worksAnimations, worksTextAnimations } from "./animations/worksAnimations.js";
import { LogoLetters, NavTexts, Boxes, IntroHours, IntroWelcome } from "./utils/elements.js";


const locomotiveScroll = new LocomotiveScroll();

//workDifferent text iterator.
//TODO: contemplate if using splitText is feasible because its splitted per (.)
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




//master timeline -> main control
const masterTimeline = createTimeline();
masterTimeline
	.sync(introTimeline(Boxes, IntroHours, IntroWelcome))
	.sync(heroTimelineAnimation(LogoLetters, NavTexts, () => navTextsHoverAnimation(NavTexts)) //expects a function, if just nav..() it returns whats inside instead
		, "3550")
	.call(() => worksAnimations())
	.call(() => worksTextAnimations($workDifferent, splitWorkDifferentTextSpan))