import { utils, splitText } from "animejs";

const $logoletters = utils.$(".logo-letters");
const $navtexts = utils.$(".nav-texts");
const $boxes = utils.$(".boxes");


const $introHourHeader = utils.$(".intro-header");
const $introWelcomeHeader = utils.$(".intro-welcome");

const { chars: $splitIntroHourHeader } = splitText($introHourHeader, {
    chars: {
        class: "intro-split-chars",
        wrap: "clip",
    },
});
const { words: $splitIntroWelcomeHeader } = splitText($introWelcomeHeader, {
    words: {
        class: "intro-split-words",
        wrap: "clip",
    },
    includeSpaces: true,
});

export {$logoletters as LogoLetters, $navtexts as NavTexts, $boxes as Boxes, $splitIntroHourHeader as IntroHours, $splitIntroWelcomeHeader as IntroWelcome}
