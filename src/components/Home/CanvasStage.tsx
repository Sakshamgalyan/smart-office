"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function CanvasStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const users = useSelector((s: any) => s.presence.users);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;
    let frame: number;

    const render = () => {
      ctx.clearRect(0, 0, 2000, 2000);

      users.forEach((u: any) => {
        ctx.fillStyle = u.isSelf ? "#22c55e" : "#3b82f6";
        ctx.beginPath();
        ctx.arc(u.x, u.y, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frame);
  }, [users]);

  return <canvas ref={canvasRef} width={2000} height={2000} />;
}
