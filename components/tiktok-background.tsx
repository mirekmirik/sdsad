"use client"

import { useEffect, useRef } from "react"

export function TikTokBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Create floating TikTok note icons
    const icons: {
      x: number
      y: number
      size: number
      speed: number
      drift: number
      driftSpeed: number
      opacity: number
      rotation: number
      rotSpeed: number
      phase: number
    }[] = []

    for (let i = 0; i < 30; i++) {
      icons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 16 + Math.random() * 28,
        speed: 0.15 + Math.random() * 0.35,
        drift: 0,
        driftSpeed: 0.3 + Math.random() * 0.5,
        opacity: 0.04 + Math.random() * 0.08,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.005,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const drawTikTokLogo = (
      x: number,
      y: number,
      size: number,
      opacity: number,
      rotation: number,
    ) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.globalAlpha = opacity
      const s = size / 24

      // Teal/cyan shadow
      ctx.save()
      ctx.translate(-1.5 * s, 0.8 * s)
      ctx.fillStyle = "hsl(174, 62%, 47%)"
      ctx.beginPath()
      const p1 = new Path2D(
        "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.24 8.24 0 004.79 1.53V6.79a4.85 4.85 0 01-1.03-.1z",
      )
      ctx.scale(s, s)
      ctx.fill(p1)
      ctx.restore()

      // Red/pink shadow
      ctx.save()
      ctx.translate(1.5 * s, -0.8 * s)
      ctx.fillStyle = "hsl(347, 77%, 55%)"
      ctx.beginPath()
      const p2 = new Path2D(
        "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.24 8.24 0 004.79 1.53V6.79a4.85 4.85 0 01-1.03-.1z",
      )
      ctx.scale(s, s)
      ctx.fill(p2)
      ctx.restore()

      // White main shape
      ctx.fillStyle = "rgba(255, 255, 255, 1)"
      ctx.beginPath()
      ctx.save()
      const p3 = new Path2D(
        "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.71a8.24 8.24 0 004.79 1.53V6.79a4.85 4.85 0 01-1.03-.1z",
      )
      ctx.scale(s, s)
      ctx.fill(p3)
      ctx.restore()

      ctx.restore()
    }

    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      for (const icon of icons) {
        icon.y -= icon.speed
        icon.drift = Math.sin(time * icon.driftSpeed + icon.phase) * 30
        icon.rotation += icon.rotSpeed

        if (icon.y + icon.size < 0) {
          icon.y = canvas.height + icon.size
          icon.x = Math.random() * canvas.width
        }

        drawTikTokLogo(
          icon.x + icon.drift,
          icon.y,
          icon.size,
          icon.opacity,
          icon.rotation,
        )
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  )
}
