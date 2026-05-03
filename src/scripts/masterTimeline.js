//@ts-nocheck
import {
	animate,
	createTimeline,
	onScroll,
	utils
} from "animejs";
import LocomotiveScroll from "locomotive-scroll";
import navTextsHoverAnimation from "./animations/navTextsHoverAnimation.js"
import heroTimelineAnimation from "./timelines/heroTimeline.js";
import introTimeline from "./timelines/splitIntroTextsTimeline.js";
import worksAnimations from "./animations/worksAnimations.js";
import { LogoLetters, NavTexts, Boxes, IntroHours, IntroWelcome } from "./utils/elements.js";


const locomotiveScroll = new LocomotiveScroll();


const $workDifferent = utils.$('.deadline-std')

animate($workDifferent, {
	backgroundSize: ['200vw', '100vw'],
	'--bg-overlay-transparent':[0.5, 0.8],
	autoplay: onScroll({
		debug: true,
		enter: 'bottom-=250 top',
		leave: 'top+=250 bottom',
		sync: true,
	}),
	ease: "linear",
	duration: 1500,
})

//master timeline -> main control
const masterTimeline = createTimeline();
masterTimeline
	// .sync(introTimeline(Boxes, IntroHours, IntroWelcome))
	.sync(heroTimelineAnimation(LogoLetters, NavTexts, () => navTextsHoverAnimation(NavTexts)) //expects a function, if just nav..() it returns whats inside instead
		, "3550")
	.call(() => worksAnimations());