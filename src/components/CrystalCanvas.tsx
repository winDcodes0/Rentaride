"use client";

import React, { useEffect, useRef } from "react";

interface Vertex {
  x: number;
  y: number;
  z: number;
}

interface Face {
  indices: [number, number, number];
  color: string;
}

export default function CrystalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.clientWidth;
    let height = canvas.height = canvas.clientHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = (x / (width / 2)) * 0.5; // Max tilt offset
      mouseRef.current.targetY = (y / (height / 2)) * 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Setup 3D Quartz Crystal Geometry (Double-terminated hexagonal prism)
    const baseVertices: Vertex[] = [];
    
    // 6 vertices on upper ring (Y = 0.6)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      baseVertices.push({
        x: Math.cos(angle) * 0.9,
        y: 0.5,
        z: Math.sin(angle) * 0.9,
      });
    }

    // 6 vertices on lower ring (Y = -0.6)
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      baseVertices.push({
        x: Math.cos(angle) * 0.9,
        y: -0.5,
        z: Math.sin(angle) * 0.9,
      });
    }

    // Top cap vertex (Y = 1.3)
    baseVertices.push({ x: 0, y: 1.3, z: 0 });
    // Bottom cap vertex (Y = -1.3)
    baseVertices.push({ x: 0, y: -1.3, z: 0 });

    const topCapIdx = 12;
    const bottomCapIdx = 13;

    // Define 24 triangular faces
    const faces: [number, number, number][] = [];

    // Top pyramid faces
    for (let i = 0; i < 6; i++) {
      faces.push([topCapIdx, i, (i + 1) % 6]);
    }

    // Side prism faces (each rectangle split into two triangles)
    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      faces.push([i, next, i + 6]);
      faces.push([next, next + 6, i + 6]);
    }

    // Bottom pyramid faces
    for (let i = 0; i < 6; i++) {
      faces.push([bottomCapIdx, (i + 1) % 6 + 6, i + 6]);
    }

    // Setup background floating particles (3D stars/dust)
    const particles: { x: number; y: number; z: number; speed: number; size: number }[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
        z: (Math.random() - 0.5) * 4,
        speed: 0.002 + Math.random() * 0.003,
        size: 1 + Math.random() * 2,
      });
    }

    // Rotational angles
    let rx = 0.5;
    let ry = 0.8;
    let rz = 0.2;

    const render = () => {
      // Clear with dark ambient transparent color to allow radial mesh background to shine through
      ctx.clearRect(0, 0, width, height);

      // Lerp mouse coordinates for ultra-smooth responsiveness
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Update base rotations
      rx += 0.004;
      ry += 0.006;
      rz += 0.002;

      // Add mouse tilt offset to rotation
      const currentRx = rx + mouse.y;
      const currentRy = ry + mouse.x;

      const cosX = Math.cos(currentRx);
      const sinX = Math.sin(currentRx);
      const cosY = Math.cos(currentRy);
      const sinY = Math.sin(currentRy);
      const cosZ = Math.cos(rz);
      const sinZ = Math.sin(rz);

      // Project vertices to screen
      const scaleFactor = Math.min(width, height) * 0.22;
      const cameraDepth = 4;

      const projectedVertices = baseVertices.map((v) => {
        // Rotate in 3D space
        // Rotate Y
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.x * sinY + v.z * cosY;

        // Rotate X
        let y2 = v.y * cosX - z1 * sinX;
        let z2 = v.y * sinX + z1 * cosX;

        // Rotate Z
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = x1 * sinZ + y2 * cosZ;

        // Perspective Projection
        const distance = cameraDepth - z2;
        const projX = (x3 * scaleFactor) / distance + width / 2;
        const projY = (y3 * scaleFactor) / distance + height / 2;

        return { x: projX, y: projY, z: z2 };
      });

      // Render floating particles
      particles.forEach((p) => {
        // Slowly float particles upward
        p.y -= p.speed;
        if (p.y < -2) p.y = 2;

        // Rotate particles in sync with the crystal space (Y-axis only for simplicity)
        const px = p.x * cosY - p.z * sinY;
        const pz = p.x * sinY + p.z * cosY;

        const distance = cameraDepth - pz;
        const projX = (px * scaleFactor) / distance + width / 2;
        const projY = (p.y * scaleFactor) / distance + height / 2;

        if (projX >= 0 && projX <= width && projY >= 0 && projY <= height) {
          const alpha = Math.max(0, Math.min(1, (pz + 2) / 4)) * 0.4;
          ctx.beginPath();
          ctx.arc(projX, projY, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 51, 68, ${alpha})`; // Red dust
          ctx.fill();
        }
      });

      // Painter's Algorithm: Sort faces by average depth (Z value)
      const sortedFaces = faces
        .map((faceIndices) => {
          const avgZ =
            (projectedVertices[faceIndices[0]].z +
              projectedVertices[faceIndices[1]].z +
              projectedVertices[faceIndices[2]].z) /
            3;
          return { indices: faceIndices, depth: avgZ };
        })
        .sort((a, b) => b.depth - a.depth); // Deepest first

      // Draw crystal faces
      sortedFaces.forEach(({ indices: [a, b, c] }) => {
        const pA = projectedVertices[a];
        const pB = projectedVertices[b];
        const pC = projectedVertices[c];

        // Draw face fill
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.lineTo(pC.x, pC.y);
        ctx.closePath();

        // Calculate face normal in 2D (to simulate dynamic lighting reflections)
        const ux = pB.x - pA.x;
        const uy = pB.y - pA.y;
        const vx = pC.x - pA.x;
        const vy = pC.y - pA.y;
        const normalZ = ux * vy - uy * vx;

        // Define refraction colors based on orientation and depth
        const depthOpacity = Math.max(0.1, Math.min(0.45, (pA.z + pB.z + pC.z + 3) / 6));
        
        let grad = ctx.createLinearGradient(pA.x, pA.y, pC.x, pC.y);
        if (normalZ > 0) {
          // Facing front-ish: Holographic Refracting Gradients (red and dark crimson)
          grad.addColorStop(0, `rgba(255, 51, 68, ${depthOpacity * 0.7})`); // neon red
          grad.addColorStop(0.5, `rgba(153, 0, 17, ${depthOpacity * 0.4})`); // dark crimson
          grad.addColorStop(1, `rgba(220, 38, 38, ${depthOpacity * 0.8})`); // logo red
        } else {
          // Facing away/back: Deep darker crimson/dark shades
          grad.addColorStop(0, `rgba(153, 0, 17, ${depthOpacity * 0.25})`);
          grad.addColorStop(1, `rgba(16, 24, 38, ${depthOpacity * 0.4})`);
        }

        ctx.fillStyle = grad;
        ctx.fill();

        // Outer Neon Glow wireframe stroke
        ctx.beginPath();
        ctx.moveTo(pA.x, pA.y);
        ctx.lineTo(pB.x, pB.y);
        ctx.lineTo(pC.x, pC.y);
        ctx.closePath();

        const strokeAlpha = normalZ > 0 ? 0.35 : 0.12;
        ctx.lineWidth = normalZ > 0 ? 1.2 : 0.6;
        ctx.strokeStyle = normalZ > 0 ? `rgba(255, 51, 68, ${strokeAlpha})` : `rgba(153, 0, 17, ${strokeAlpha})`;
        ctx.stroke();
      });

      // Add a floating glowing node in the core
      const coreZ = projectedVertices.reduce((sum, v) => sum + v.z, 0) / baseVertices.length;
      const coreDepth = cameraDepth - coreZ;
      const coreSize = (32 * scaleFactor) / (coreDepth * 300);

      const coreX = projectedVertices.reduce((sum, v) => sum + v.x, 0) / baseVertices.length;
      const coreY = projectedVertices.reduce((sum, v) => sum + v.y, 0) / baseVertices.length;

      let radialGrad = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, coreSize * 15);
      radialGrad.addColorStop(0, "rgba(255, 51, 68, 0.4)");
      radialGrad.addColorStop(0.3, "rgba(153, 0, 17, 0.2)");
      radialGrad.addColorStop(0.7, "rgba(220, 38, 38, 0.05)");
      radialGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(coreX, coreY, coreSize * 15, 0, Math.PI * 2);
      ctx.fillStyle = radialGrad;
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[350px] md:min-h-[500px] flex items-center justify-center">
      {/* Background neon radial glow ring */}
      <div className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-accent-cyan/15 via-accent-purple/5 to-transparent blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />
      <canvas
        ref={canvasRef}
        className="w-full h-full relative z-10 select-none pointer-events-none"
      />
    </div>
  );
}
