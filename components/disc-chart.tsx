"use client"

import { useEffect, useRef } from "react"

type DiscData = {
  d: number
  i: number
  s: number
  c: number
}

export function DiscChart({ data }: { data: DiscData }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(centerX, centerY) - 20

    // Draw background
    ctx.fillStyle = "#f9fafb"
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fill()

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Draw concentric circles
    for (let i = 1; i <= 4; i++) {
      const r = (radius / 4) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, r, 0, 2 * Math.PI)
      ctx.stroke()
    }

    // Draw cross lines
    ctx.beginPath()
    ctx.moveTo(centerX - radius, centerY)
    ctx.lineTo(centerX + radius, centerY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX, centerY - radius)
    ctx.lineTo(centerX, centerY + radius)
    ctx.stroke()

    // Draw DISC labels
    ctx.fillStyle = "#111827"
    ctx.font = "bold 14px sans-serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    ctx.fillText("D", centerX, centerY - radius - 15)
    ctx.fillText("I", centerX + radius + 15, centerY)
    ctx.fillText("S", centerX, centerY + radius + 15)
    ctx.fillText("C", centerX - radius - 15, centerY)

    // Draw data points
    const normalizeValue = (value: number) => (value / 100) * radius

    const points = [
      { x: centerX, y: centerY - normalizeValue(data.d) }, // D (top)
      { x: centerX + normalizeValue(data.i), y: centerY }, // I (right)
      { x: centerX, y: centerY + normalizeValue(data.s) }, // S (bottom)
      { x: centerX - normalizeValue(data.c), y: centerY }, // C (left)
    ]

    // Draw the polygon
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.closePath()

    ctx.fillStyle = "rgba(59, 130, 246, 0.2)"
    ctx.fill()

    ctx.strokeStyle = "rgb(59, 130, 246)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw data points
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
      ctx.fillStyle = "rgb(59, 130, 246)"
      ctx.fill()
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2
      ctx.stroke()
    })
  }, [data])

  return (
    <div className="w-full aspect-square">
      <canvas ref={canvasRef} width={300} height={300} className="w-full h-full" />
      <div className="grid grid-cols-4 gap-2 mt-4">
        <div className="text-center">
          <div className="text-sm font-medium">D</div>
          <div className="text-lg font-bold">{data.d}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium">I</div>
          <div className="text-lg font-bold">{data.i}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium">S</div>
          <div className="text-lg font-bold">{data.s}%</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium">C</div>
          <div className="text-lg font-bold">{data.c}%</div>
        </div>
      </div>
    </div>
  )
}
