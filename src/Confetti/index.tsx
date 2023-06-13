import { useEffect, useRef } from "react";
import sample from "lodash/sample";
import random from "lodash/random";
import { Portal } from "@radix-ui/react-portal";

const defaultColors: Array<string> = [
  "#00D8D6",
  "#5028C6",
  "#B7A3F3",
  "#FECA57",
  "#019492",
];

export const Confetti = ({
  className = "",
  animated = true,
  colors = defaultColors,
  count = 500,
  // speed = 2,
  speed = 0.2,
}: {
  className?: string;
  animated?: boolean;
  colors?: Array<string>;
  count?: number;
  speed?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationTimerRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<Particle>>([]);
  const isAnimatedRef = useRef(animated);
  useEffect(() => {
    isAnimatedRef.current = animated;
  }, [animated]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);
    const context = canvas.getContext("2d")!;

    const particles = particlesRef.current;
    let waveAngle: number = 0;

    function resetParticle(particle: Particle): Particle {
      particle.color = sample(colors)!;
      particle.x = random(0, width, true);
      // particle.y = random(height, height * 2, true);
      // particle.yIncrement = random(-150, -10, true);
      particle.y = random(-height, 0, true);
      particle.yIncrement = speed;
      particle.diameter = random(5, 15, true);
      particle.tilt = random(-10, 0, true);
      particle.tiltAngleIncrement = random(0.05, 0.12, true);
      particle.tiltAngle = 0;
      return particle;
    }

    function tick() {
      context.clearRect(0, 0, width, height);
      if (particles.length === 0) {
        animationTimerRef.current = null;
        return;
      }
      update();
      draw();
      animationTimerRef.current = requestAnimationFrame(tick);
    }

    function repopulateParticles() {
      while (particles.length < count) {
        particles.push(resetParticle({} as any));
      }
    }

    function start() {
      repopulateParticles();
      if (animationTimerRef.current == null) {
        tick();
      }
    }

    function draw() {
      particles.forEach((particle) => {
        context.beginPath();
        context.lineWidth = particle.diameter;
        context.strokeStyle = particle.color;
        context.lineCap = "round";
        const x = particle.x + particle.tilt;
        context.moveTo(x + particle.diameter / 2, particle.y);
        context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
        context.stroke();
      });
    }

    function update() {
      const isAnimated = isAnimatedRef.current;
      waveAngle += 0.01;
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i]!;
        if (!isAnimated && particle.y < -15) {
          particle.y = height + 100;
        } else {
          particle.tiltAngle += particle.tiltAngleIncrement;
          particle.x += Math.sin(waveAngle);
          particle.y +=
            (Math.cos(waveAngle) + particle.diameter + particle.yIncrement) *
            0.5;
          particle.yIncrement += speed;
          particle.tilt = Math.sin(particle.tiltAngle) * 15;
        }
        if (
          particle.x > width + 20 ||
          particle.x < -20 ||
          particle.y > height * 2
        ) {
          if (isAnimated && particles.length <= count) {
            resetParticle(particle);
          } else {
            particles.splice(i, 1);
            i--;
          }
        }
      }
    }

    if (isAnimatedRef.current) {
      start();
    }
  }, [animated, colors, count, speed]);
  useEffect(() => {
    return () => {
      if (animationTimerRef.current != null) {
        cancelAnimationFrame(animationTimerRef.current);
        animationTimerRef.current = null;
      }
    };
  }, []);
  return (
    <Portal>
      <canvas
        ref={canvasRef}
        className={`${className} pointer-events-none fixed inset-0 block h-screen w-screen`}
      />
    </Portal>
  );
};

type Particle = {
  color: string;
  x: number;
  y: number;
  yIncrement: number;
  diameter: number;
  tilt: number;
  tiltAngleIncrement: number;
  tiltAngle: number;
};
