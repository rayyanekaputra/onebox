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

// too lazy to animate one by one.


const worksElementIterator = () => {
		let workSectionChilds = [];
	const workSection = document.querySelectorAll(".works-rows");
	const workSectionDifferent = document.querySelectorAll(".works-rows-differ");
	
	workSection.forEach((workNode, index, _) => {
		workSectionChilds.push(workNode.querySelectorAll(".works-header"));
		workSectionChilds.push(
			workNode.querySelectorAll(".works-paragraph"),
		);
		workSectionChilds.push(
			workNode.querySelectorAll(".works-indicator"),
		);
	});
	workSectionDifferent.forEach((workNode, index, _) => {
		workSectionChilds.push(workNode.querySelectorAll(".works-header"));
		workSectionChilds.push(
			workNode.querySelectorAll(".works-paragraph"),
		);
		workSectionChilds.push(
			workNode.querySelectorAll(".works-indicator"),
		);
	});
	return workSectionChilds;

}

const fadeUpAnimation = (htmlElement) => {
		return animate(htmlElement, {
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

const worksAnimations = () => {
	worksElementIterator().map((el, i, _) => {
		fadeUpAnimation(el)
	});
};

const worksTextAnimations = ($el1, $el2) => {
	animate($el1, {
	opacity:{
		to:['0.0','1.0'],
		ease:"outExpo"
		},
	padding:{
		to:['0','40px'],
		ease:"linear",
	},
	height:{
		to:['0','100vh'],
		ease:"linear",
	},
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
		sync: 0.25,
	}),
})

animate($el2, {
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

}

export {worksAnimations,worksTextAnimations};