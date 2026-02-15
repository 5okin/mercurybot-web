document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("bot-type");

    const botTypes = [
        { name: "Twitte", color: "#1DA1F2" },
        { name: "𝕏"     , color: "#1DA1F2" },
        { name: "Discord", color: "#5865F2" },
        { name: "Bluesky", color: "#0095FF" }
    ];
    
    let index = 0;
    let charIndex = 0;
    let cursorVisible = true;
    let isDeleting = false;
    const typingSpeed = 100;
    const pauseTime = 1000;
    const shortPauseTime = 100
    

    function typeEffect() {
        const chars = Array.from(botTypes[index].name);
        const cursor = `<span class="cursor" style="opacity: ${cursorVisible ? "1" : "0"}">_</span>`;

        textElement.innerHTML = `I'm a <span style="color: ${botTypes[index].color}">${chars.slice(0, charIndex).join("")}</span>${cursor}<span class="text-white">bot</span>`;

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        if (!isDeleting && charIndex === chars.length) {
            const pause = index === 0 ? shortPauseTime : pauseTime;
            setTimeout(() => isDeleting = true, pause);
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