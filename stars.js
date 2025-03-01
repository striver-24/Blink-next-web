class Star {
    constructor(canvas, ctx, x, y) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.speed = Math.random() * 0.05;
        this.amplitude = Math.random() * 1.5;
        this.initialY = y;
        this.offset = Math.random() * Math.PI * 2;
    }

    update(time) {
        this.y = this.initialY + Math.sin(time * this.speed + this.offset) * this.amplitude;
    }

    draw() {
        this.ctx.fillStyle = '#FF69B4'; // Barbie pink color
        this.ctx.shadowBlur = 15;
        this.ctx.shadowColor = '#FF69B4';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

class StarsAnimation {
    constructor() {
        this.canvas = document.getElementById('starsCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numberOfStars = 100;
        this.maxDistance = 100;
        this.time = 0;
        this.mouseX = 0;
        this.mouseY = 0;

        this.init();
        this.addEventListeners();
        this.animate();
    }

    init() {
        this.resizeCanvas();
        this.createStars();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createStars() {
        this.stars = [];
        for (let i = 0; i < this.numberOfStars; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.stars.push(new Star(this.canvas, this.ctx, x, y));
        }
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createStars();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });
    }

    drawConnections() {
        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const dx = this.stars[i].x - this.stars[j].x;
                const dy = this.stars[i].y - this.stars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    const opacity = 1 - (distance / this.maxDistance);
                    this.ctx.strokeStyle = `rgba(255, 105, 180, ${opacity * 0.5})`; // Barbie pink with opacity
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
                    this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.time += 0.01;

        // Update and draw stars
        this.stars.forEach(star => {
            star.update(this.time);
            star.draw();
        });

        // Draw connections
        this.drawConnections();

        // Mouse interaction
        if (this.mouseX && this.mouseY) {
            this.stars.forEach(star => {
                const dx = star.x - this.mouseX;
                const dy = star.y - this.mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.maxDistance) {
                    const opacity = 1 - (distance / this.maxDistance);
                    this.ctx.strokeStyle = `rgba(255, 105, 180, ${opacity})`; // Barbie pink with opacity
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(star.x, star.y);
                    this.ctx.lineTo(this.mouseX, this.mouseY);
                    this.ctx.stroke();
                }
            });
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StarsAnimation();
}); 