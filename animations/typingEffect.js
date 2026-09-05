document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("bot-type");
    const typingSpeed = 100;
    const defaultIntroTxt = "I'm a ";
    let index = 0;
    let charIndex = 0;
    let cursorVisible = false;
    let introText = defaultIntroTxt;
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.textContent = "_";

    const botTypes = [
        { name: "Discord", color: "#5865F2", intro: defaultIntroTxt, pauseTime: 1000 },
        { name: "Bluesky", color: "#0095FF", intro: defaultIntroTxt, pauseTime: 1000 },
        { name: "Twitte", color: "#1DA1F2", intro: defaultIntroTxt, pauseTime: 100 },
        { name: "𝕏", color: "#1DA1F2", intro: "I was an ", pauseTime: 1000 }
    ];

    function renderText(chars) {
        const name = document.createElement("span");
        name.style.color = botTypes[index].color;
        name.textContent = chars.slice(0, charIndex).join("");

        const bot = document.createElement("span");
        bot.className = "text-white";
        bot.textContent = "bot";

        textElement.replaceChildren(document.createTextNode(introText), name, cursor, bot);
    }

    function typeEffect(isDeleting) {
        const chars = Array.from(botTypes[index].name);

        const isTransitioning = introText !== botTypes[index].intro;
        if (isTransitioning) {
            if (isDeleting && introText.length > 1) {
                introText = introText.slice(0, -1);
            } else {
                introText += botTypes[index].intro[introText.length];
                isDeleting = false;
            }
            renderText(chars);
            setTimeout(
                () => typeEffect(isDeleting),
                isDeleting ? typingSpeed / 2 : typingSpeed
            );
            return;
        }

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        renderText(chars);

        if (!isDeleting && charIndex === chars.length) {
            setTimeout(() => {
                typeEffect(true);
            }, botTypes[index].pauseTime);
            return;
        } else if (isDeleting && charIndex === 0) {
            index = (index + 1) % botTypes.length;
            isDeleting = introText !== botTypes[index].intro;
        }

        setTimeout(() => typeEffect(isDeleting), isDeleting ? typingSpeed / 2 : typingSpeed);
    }

    function blinkCursor() {
        cursorVisible = !cursorVisible;
        cursor.style.opacity = cursorVisible ? "1" : "0";
        setTimeout(blinkCursor, 500);
    }

    typeEffect(false);
    blinkCursor();
});