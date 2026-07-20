"use client";

import React, { useEffect, useRef, useState } from "react";

export default function BackgroundShader() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = window.innerWidth || 1280;
      const h = window.innerHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    syncSize();
    window.addEventListener("resize", syncSize);

    const gl =
      canvas.getContext("webgl", { preserveDrawingBuffer: false, powerPreference: "low-power" }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    let isContextLost = false;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      isContextLost = true;
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      void main() {
          vec2 uv = v_texCoord;
          vec2 mouse = u_mouse / u_resolution;
          
          float noise = sin(uv.x * 8.0 + u_time * 0.4) * cos(uv.y * 8.0 + u_time * 0.4);
          noise += sin(uv.x * 16.0 - u_time * 0.2) * 0.5;
          
          vec3 color1 = vec3(0.078, 0.074, 0.074); // #141313
          vec3 color2 = vec3(0.125, 0.121, 0.125); // #201f20
          vec3 accent = vec3(0.8, 0.8, 0.82);      // Subtle silver telemetry glow
          
          float gradient = smoothstep(0.0, 1.0, uv.y + noise * 0.08);
          vec3 finalColor = mix(color1, color2, gradient);
          
          float dist = length(uv - mouse);
          finalColor += accent * (1.0 - smoothstep(0.0, 0.5, dist)) * 0.03;
          
          float vignette = 1.0 - length(uv - 0.5) * 0.4;
          finalColor *= vignette;

          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(type: number, src: string) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    }

    const vertShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fs);

    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;

    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    let lastFrameTime = 0;
    const targetFpsInterval = 1000 / 30;

    function render(t: number) {
      if (isContextLost || !gl || !canvas) return;
      const elapsed = t - lastFrameTime;

      if (elapsed > targetFpsInterval) {
        lastFrameTime = t - (elapsed % targetFpsInterval);
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (uTime) gl.uniform1f(uTime, t * 0.001);
        if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
        if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", syncSize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      cancelAnimationFrame(animationFrameId);

      try {
        if (gl) {
          gl.deleteBuffer(buf);
          gl.deleteProgram(prog);
          gl.deleteShader(vertShader);
          gl.deleteShader(fragShader);
        }
      } catch (err) {
        console.warn("WebGL cleanup error:", err);
      }
    };
  }, [mounted]);

  if (!mounted) {
    return <div className="fixed inset-0 w-full h-full bg-[#141313] -z-10" />;
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-70"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
