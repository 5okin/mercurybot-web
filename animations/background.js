const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;

let points = [];
canvas.width = window.innerWidth * dpr;
canvas.height = document.querySelector(".animated-section").offsetHeight * dpr;

function setupPoints() {
    const basePoints = 400 * dpr;// Minimum number of points
    const scaleFactor = Math.max(window.innerWidth * dpr * 0.4, basePoints); // Ensure enough points

    for (let i = 0; i < scaleFactor; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.2 * dpr,
            vy: (Math.random() - 0.5) * 0.2 * dpr
        });
    }
}

function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            let dx = points[i].x - points[j].x;
            let dy = points[i].y - points[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }
    }
}

function updatePoints() {
    for (let point of points) {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
    }
}

function animate() {
    updatePoints();
    drawLines();
    requestAnimationFrame(animate);
}
setupPoints();
animate();


document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.getElementById("about");

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                aboutSection.classList.remove("opacity-0", "translate-y-10");
            }
        },
        { threshold: 0.2 }
    );

    observer.observe(aboutSection);
});

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("[data-animate]");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const animationClass = `animate-${entry.target.dataset.animate}`;
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target); // Stop observing after animation runs
                }
            });
        },
        { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    elements.forEach((el) => observer.observe(el));
});


const fan = document.getElementById('fan');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fan.classList.add('active');
    } else {
      fan.classList.remove('active');
    }
  });
}, { threshold: 0.5 });

observer.observe(fan);