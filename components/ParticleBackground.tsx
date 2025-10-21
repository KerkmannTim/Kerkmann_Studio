import React, { useRef, useEffect } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const interactionPoint = useRef({ x: Infinity, y: Infinity, radius: 120 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleColor = 'rgba(255, 255, 255, 0.7)';
    const particleHighlightColor = 'rgba(184, 115, 51, 0.8)'; // Copper color

    let animationFrameId: number;

    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // --- Unified Interaction Handlers ---
    const updateInteractionPoint = (x: number, y: number) => {
      interactionPoint.current.x = x;
      interactionPoint.current.y = y;
    };

    const resetInteractionPoint = () => {
      interactionPoint.current.x = Infinity;
      interactionPoint.current.y = Infinity;
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateInteractionPoint(event.x, event.y);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        updateInteractionPoint(event.touches[0].clientX, event.touches[0].clientY);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', resetInteractionPoint);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchend', resetInteractionPoint);


    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      density: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2.5 + 1;
        this.density = (Math.random() * 30) + 1;
        // Ambient velocity for constant drift
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
      }

      draw() {
        if (!ctx) return;
        const dx = this.x - interactionPoint.current.x;
        const dy = this.y - interactionPoint.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        ctx.fillStyle = distance < interactionPoint.current.radius ? particleHighlightColor : particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if(!canvas) return;
        
        // Interaction logic
        const dx = interactionPoint.current.x - this.x;
        const dy = interactionPoint.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const maxDistance = interactionPoint.current.radius;
        const force = (maxDistance - distance) / maxDistance;
        let directionX = 0;
        let directionY = 0;

        if (distance < maxDistance) {
          directionX = forceDirectionX * force * this.density;
          directionY = forceDirectionY * force * this.density;
          this.x -= directionX;
          this.y -= directionY;
        } else {
            // Return to base position if displaced
            if (this.x !== this.baseX) {
                const dxToBase = this.x - this.baseX;
                this.x -= dxToBase / 20;
            }
            if (this.y !== this.baseY) {
                const dyToBase = this.y - this.baseY;
                this.y -= dyToBase / 20;
            }
        }
        
        // Apply ambient drift
        this.x += this.vx;
        this.y += this.vy;

        // Screen boundaries - bouncing logic
        if (this.x <= this.size) {
            this.vx *= -1;
            this.x = this.size;
        } else if (this.x >= canvas.width - this.size) {
            this.vx *= -1;
            this.x = canvas.width - this.size;
        }

        if (this.y <= this.size) {
            this.vy *= -1;
            this.y = this.size;
        } else if (this.y >= canvas.height - this.size) {
            this.vy *= -1;
            this.y = canvas.height - this.size;
        }
        
        // Update base for next frame
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX <= this.size) {
            this.baseX = this.size;
        } else if (this.baseX >= canvas.width - this.size) {
            this.baseX = canvas.width - this.size;
        }

        if (this.baseY <= this.size) {
            this.baseY = this.size;
        } else if (this.baseY >= canvas.height - this.size) {
            this.baseY = canvas.height - this.size;
        }
      }
    }

    function init() {
      if (!canvas) return;
      particles = [];
      const particleCount = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * (canvas.width - 20) + 10;
        const y = Math.random() * (canvas.height - 20) + 10;
        particles.push(new Particle(x, y));
      }
    }

    function connect() {
      if (!ctx) return;
      const connectDistance = 120;
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectDistance) {
            opacityValue = 1 - (distance / connectDistance);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    }

    const handleResize = () => {
      cancelAnimationFrame(animationFrameId);
      setCanvasSize();
      init();
      animate();
    };

    setCanvasSize();
    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', resetInteractionPoint);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchend', resetInteractionPoint);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />;
};

export default ParticleBackground;