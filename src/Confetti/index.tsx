import {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  useCallback,
  useState,
} from "react";
import sample from "lodash/sample";
import random from "lodash/random";
import { Portal } from "@radix-ui/react-portal";
import { useWindowSize } from "../useScreenSize";

const defaultColors: Array<string> = [
  "#00D8D6",
  "#5028C6",
  "#B7A3F3",
  "#FECA57",
  "#019492",
];

export type ConfettiRef = {
  trigger: () => void;
  hide: () => void;
};

export const Confetti = forwardRef<
  ConfettiRef,
  {
    imperative?: boolean;
    className?: string;
    colors?: Array<string>;
    count?: number;
    speed?: number;
    maxSpeed?: number;
    acceleration?: number;
    isFromBottom?: boolean;
    minSize?: number;
    maxSize?: number;
  }
>(
  (
    {
      imperative = false,
      className = "",
      colors = defaultColors,
      count = 400,
      speed = -200,
      maxSpeed = 8,
      acceleration = 4,
      isFromBottom = true,
      minSize = 5,
      maxSize = 15,
    },
    ref
  ) => {
    const [width, height] = useWindowSize();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationTimerRef = useRef<number | null>(null);
    const particlesRef = useRef<Array<Particle>>([]);
    const [isHidden, setIsHidden] = useState(false);

    const trigger = useCallback(() => {
      setIsHidden(false);
      const canvas = canvasRef.current;
      if (!canvas) {
        return;
      }
      const context = canvas.getContext("2d")!;

      const particles = particlesRef.current;
      let waveAngle: number = 0;

      repopulateParticles();
      if (animationTimerRef.current == null) {
        tick();
      }

      function tick() {
        if (!canvas) {
          return;
        }
        const width = (canvas.width = canvas.offsetWidth);
        const height = (canvas.height = canvas.offsetHeight);
        context.clearRect(0, 0, width, height);
        if (particles.length === 0) {
          animationTimerRef.current = null;
          return;
        }
        update();
        draw();
        animationTimerRef.current = requestAnimationFrame(tick);

        function update() {
          waveAngle += 0.01;
          for (let i = 0; i < particles.length; i++) {
            const particle = particles[i]!;
            particle.tiltAngle += particle.tiltAngleIncrement;
            particle.x += Math.sin(waveAngle);
            particle.y +=
              (Math.cos(waveAngle) + particle.diameter + particle.speed) * 0.5;
            particle.speed = Math.min(maxSpeed, particle.speed + acceleration);
            particle.tilt = Math.sin(particle.tiltAngle) * 15;
            if (
              particle.x > width + 20 ||
              particle.x < -20 ||
              particle.y > height * 2
            ) {
              particles.splice(i, 1);
              i--;
            }
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
            context.lineTo(
              x,
              particle.y + particle.tilt + particle.diameter / 2
            );
            context.stroke();
          });
        }
      }

      function createParticle(): Particle {
        const width = canvas?.width || 0;
        const height = canvas?.height || 0;
        return {
          color: sample(colors)!,
          x: random(0, width ?? 0, true),
          y: isFromBottom
            ? random(height, height * 2, true)
            : random(-height, 0, true),
          speed: random(speed / 2, speed, true),
          diameter: random(minSize, maxSize, true),
          tilt: random(-10, 0, true),
          tiltAngleIncrement: random(0.05, 0.12, true),
          tiltAngle: 0,
        };
      }

      function repopulateParticles() {
        while (particles.length < count) {
          particles.push(createParticle());
        }
      }
    }, [
      acceleration,
      colors,
      count,
      isFromBottom,
      maxSize,
      maxSpeed,
      minSize,
      speed,
    ]);
    useImperativeHandle(
      ref,
      () => ({
        trigger,
        hide: () => {
          setIsHidden(true);
        },
      }),
      [trigger]
    );
    useEffect(() => {
      if (!imperative) {
        trigger();
      }
    }, [imperative, trigger]);
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
          width={width}
          height={height}
          className={`${className} pointer-events-none fixed inset-0 block h-screen w-screen transition-opacity duration-500`}
          style={{
            opacity: isHidden ? 0 : 1,
          }}
        />
      </Portal>
    );
  }
);

type Particle = {
  color: string;
  x: number;
  y: number;
  speed: number;
  diameter: number;
  tilt: number;
  tiltAngleIncrement: number;
  tiltAngle: number;
};
