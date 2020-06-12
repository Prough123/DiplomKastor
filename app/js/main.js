
let $slides, interval, $selectors, $btns, currentIndex, nextIndex;

let cycle = (index) => {
    let $currentSlide, $nextSlide, $currentSelector, $nextSelector;

    nextIndex = index !== undefined ? index : nextIndex;

    $currentSlide = $($slides.get(currentIndex));
    $currentSelector = $($selectors.get(currentIndex));

    $nextSlide = $($slides.get(nextIndex));
    $nextSelector = $($selectors.get(nextIndex));

    $currentSlide.removeClass("active").css("z-index", "0");

    $nextSlide.addClass("active").css("z-index", "1");

    $currentSelector.removeClass("current");
    $nextSelector.addClass("current");

    currentIndex =
        index !== undefined
            ? nextIndex
            : currentIndex < $slides.length - 1
                ? currentIndex + 1
                : 0;

    nextIndex = currentIndex + 1 < $slides.length ? currentIndex + 1 : 0;
};

$(() => {
    currentIndex = 0;
    nextIndex = 1;

    $slides = $(".slide");
    $selectors = $(".selector");
    $btns = $(".btn");

    $slides.first().addClass("active");
    $selectors.first().addClass("current");

    interval = window.setInterval(cycle, 6000);

    $selectors.on("click", (e) => {
        let target = $selectors.index(e.target);
        if (target !== currentIndex) {
            window.clearInterval(interval);
            cycle(target);
            interval = window.setInterval(cycle, 6000);
        }
    });

    $btns.on("click", (e) => {
        window.clearInterval(interval);
        if ($(e.target).hasClass("prev")) {
            let target = currentIndex > 0 ? currentIndex - 1 : $slides.length - 1;
            cycle(target);
        } else if ($(e.target).hasClass("next")) {
            cycle();
        }
        interval = window.setInterval(cycle, 6000);
    });
});


(function () {
    var d = document,
        accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
        setAria,
        setAccordionAria,
        switchAccordion,
        touchSupported = ('ontouchstart' in window),
        pointerSupported = ('pointerdown' in window);

    skipClickDelay = function (e) {
        e.preventDefault();
        e.target.click();
    }

    setAriaAttr = function (el, ariaType, newProperty) {
        el.setAttribute(ariaType, newProperty);
    };
    setAccordionAria = function (el1, el2, expanded) {
        switch (expanded) {
            case "true":
                setAriaAttr(el1, 'aria-expanded', 'true');
                setAriaAttr(el2, 'aria-hidden', 'false');
                break;
            case "false":
                setAriaAttr(el1, 'aria-expanded', 'false');
                setAriaAttr(el2, 'aria-hidden', 'true');
                break;
            default:
                break;
        }
    };
    //function
    switchAccordion = function (e) {
        console.log("triggered");
        e.preventDefault();
        var thisAnswer = e.target.parentNode.nextElementSibling;
        var thisQuestion = e.target;
        if (thisAnswer.classList.contains('is-collapsed')) {
            setAccordionAria(thisQuestion, thisAnswer, 'true');
        } else {
            setAccordionAria(thisQuestion, thisAnswer, 'false');
        }
        thisQuestion.classList.toggle('is-collapsed');
        thisQuestion.classList.toggle('is-expanded');
        thisAnswer.classList.toggle('is-collapsed');
        thisAnswer.classList.toggle('is-expanded');

        thisAnswer.classList.toggle('animateIn');
    };
    for (var i = 0, len = accordionToggles.length; i < len; i++) {
        if (touchSupported) {
            accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
        }
        if (pointerSupported) {
            accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
        }
        accordionToggles[i].addEventListener('click', switchAccordion, false);
    }
})();


