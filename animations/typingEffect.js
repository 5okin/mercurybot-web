document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("bot-type");

    const botTypes = [
        { name: "Twitter", color: "#1DA1F2" },
        { name: "Discord", color: "#5865F2" },
        { name: "Bluesky", color: "#0095FF" }
    ];
    
    let index = 1;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let pauseTime = 1000;
    let cursorVisible = true;

    function typeEffect() {
        let currentText = botTypes[index].name;
        let cursor = `<span class="cursor" style="opacity: ${cursorVisible ? "1" : "0"}">_</span>`;

        textElement.innerHTML = `I'm a <span style="color: ${botTypes[index].color}">${currentText.substring(0, charIndex)}</span>${cursor}<span class="text-white">bot</span>`;

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, pauseTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % botTypes.length;
        }

        setTimeout(typeEffect, isDeleting ? typingSpeed / 2 : typingSpeed);
    }

    function blinkCursor() {
        cursorVisible = !cursorVisible;
        setTimeout(blinkCursor, 500);
    }

    typeEffect();
    blinkCursor();
});