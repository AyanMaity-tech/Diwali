/* ==================================
   MEGHNA DIWALI WEBSITE
   JAVASCRIPT SYSTEM
================================== */


/* ==================================
   1. BACKGROUND MUSIC
================================== */

const bgMusic = document.getElementById("bgMusic");

const musicButtons = document.querySelectorAll("[data-music]");

let musicPlaying = false;

musicButtons.forEach(button => {

    button.addEventListener("click", async () => {

        if (!bgMusic) return;

        try {

            if (!musicPlaying) {

                await bgMusic.play();

                musicPlaying = true;

                musicButtons.forEach(btn => {

                    btn.classList.add("playing");

                    btn.textContent = "♫";

                });

            } else {

                bgMusic.pause();

                musicPlaying = false;

                musicButtons.forEach(btn => {

                    btn.classList.remove("playing");

                    btn.textContent = "♫";

                });

            }

        } catch (error) {

            console.log("Music error:", error);

        }

    });

});


/* ==================================
   2. FIREWORKS
================================== */

const canvas = document.getElementById("fireworks");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let particles = [];

    function resizeCanvas() {

        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);


    class Particle {

        constructor(x, y, color) {

            this.x = x;

            this.y = y;

            this.color = color;

            const angle = Math.random() * Math.PI * 2;

            const speed = Math.random() * 4 + 1;

            this.velocityX = Math.cos(angle) * speed;

            this.velocityY = Math.sin(angle) * speed;

            this.alpha = 1;

            this.decay = Math.random() * 0.015 + 0.008;

            this.size = Math.random() * 2.5 + 1;

        }

        update() {

            this.x += this.velocityX;

            this.y += this.velocityY;

            this.velocityY += 0.035;

            this.alpha -= this.decay;

        }

        draw() {

            ctx.save();

            ctx.globalAlpha = Math.max(0, this.alpha);

            ctx.fillStyle = this.color;

            ctx.shadowBlur = 12;

            ctx.shadowColor = this.color;

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.restore();

        }

    }


    const colors = [

        "#FFD700",
        "#FF69B4",
        "#A855F7",
        "#FFFFFF",
        "#FF9D42",
        "#65E8FF"

    ];


    function launchFirework(x, y) {

        const color = colors[
            Math.floor(Math.random() * colors.length)
        ];

        for (let i = 0; i < 65; i++) {

            particles.push(
                new Particle(x, y, color)
            );

        }

    }


    function automaticFireworks() {

        if (Math.random() < 0.025) {

            const x = Math.random() * canvas.width;

            const y = Math.random() * canvas.height * 0.55;

            launchFirework(x, y);

        }

    }


    function animateFireworks() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        automaticFireworks();

        for (let i = particles.length - 1; i >= 0; i--) {

            const particle = particles[i];

            particle.update();

            particle.draw();

            if (particle.alpha <= 0) {

                particles.splice(i, 1);

            }

        }

        requestAnimationFrame(animateFireworks);

    }

    animateFireworks();

    window.launchFirework = launchFirework;

}


/* ==================================
   3. PREMIUM PHOTO GIFT REVEAL
================================== */

const giftButton = document.getElementById("giftButton");

const photoSurprise = document.getElementById("photoSurprise");

const giftIcon = document.getElementById("giftIcon");

const giftCaption = document.getElementById("giftCaption");


if (giftButton && photoSurprise) {

    giftButton.addEventListener("click", () => {

        const isOpened = !photoSurprise.classList.contains("hidden");


        if (!isOpened) {

            /* OPEN GIFT */

            photoSurprise.classList.remove("hidden");

            giftIcon.textContent = "💝";

            giftCaption.textContent = "তোমার ছোট্ট উপহার ❤️";


            /* FIREWORK CELEBRATION */

            if (typeof window.launchFirework === "function") {

                window.launchFirework(
                    window.innerWidth / 2,
                    window.innerHeight / 3
                );

                setTimeout(() => {

                    window.launchFirework(
                        window.innerWidth * 0.25,
                        window.innerHeight / 3
                    );

                }, 300);

                setTimeout(() => {

                    window.launchFirework(
                        window.innerWidth * 0.75,
                        window.innerHeight / 3
                    );

                }, 600);

            }


            /* SCROLL TO PHOTO */

            setTimeout(() => {

                photoSurprise.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }, 200);

        } else {

            /* CLOSE GIFT */

            photoSurprise.classList.add("hidden");

            giftIcon.textContent = "🎁";

            giftCaption.textContent = "উপহারটি খুলতে এখানে স্পর্শ করো";

        }

    });

}


/* ==================================
   4. PAGE LOADING EFFECT
================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.body.style.opacity = "0";

    document.body.style.transition = "opacity 1.2s ease";

    requestAnimationFrame(() => {

        document.body.style.opacity = "1";

    });

});
