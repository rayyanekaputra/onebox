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

export default worksAnimations;