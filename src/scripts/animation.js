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

	const locomotiveScroll = new LocomotiveScroll();

	const $logoletters = utils.$(".logo-letters");
	const $navtexts = utils.$(".nav-texts");

	const heroTimeline = createTimeline({});
	heroTimeline
		.set($logoletters, {
			clipPath: "inset(0px 400px 0px 0px)",
			translateY: "1000px",
		})
		.set($navtexts, {
			clipPath: "inset(0px 100px 0px 0px)",
			translateY: "1000px",
		})
		.add($logoletters, {
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
			$navtexts,
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
				onComplete: () => {

					$navtexts.forEach((navText, i) => {
						const { chars: splitNavText} = splitText(navText, {
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
								ease:'inOutExpo',
								delay:stagger(150),
								duration: 750,
							})
							console.log("HOVER DETECTED! FIRIMG", e.target)
						})
						navText.addEventListener('mouseleave', (e) => {
							animate(splitNavText, {
								y: '0%',
								ease:'inOutExpo',
								delay:stagger(150),
								duration: 750,
							})
							console.log("LEAVING DETECTED! FIRIMG", e.target)
						})
					})
				},
			},
			"-=2000",
		);

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
		.sync(heroTimeline, "3550")
		.call(worksAnimations);

	// masterTimeline.pause();