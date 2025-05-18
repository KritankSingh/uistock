"use client"

import { useEffect, useRef } from "react"

interface StockChartProps {
  data: number[]
  color: string
  showAxis?: boolean
}

export default function StockChart({ data, color, showAxis = false }: StockChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw chart
    if (data.length > 1) {
      const padding = showAxis ? 30 : 10
      const chartWidth = rect.width - padding * 2
      const chartHeight = rect.height - padding * 2

      const max = Math.max(...data)
      const min = Math.min(...data)
      const range = max - min

      // Draw axes if needed
      if (showAxis) {
        ctx.strokeStyle = "#e5e7eb"
        ctx.lineWidth = 1

        // X-axis
        ctx.beginPath()
        ctx.moveTo(padding, rect.height - padding)
        ctx.lineTo(rect.width - padding, rect.height - padding)
        ctx.stroke()

        // Y-axis
        ctx.beginPath()
        ctx.moveTo(padding, padding)
        ctx.lineTo(padding, rect.height - padding)
        ctx.stroke()

        // Y-axis labels
        ctx.fillStyle = "#9ca3af"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "right"
        ctx.textBaseline = "middle"

        ctx.fillText(max.toFixed(0), padding - 5, padding)
        ctx.fillText(min.toFixed(0), padding - 5, rect.height - padding)
        ctx.fillText(((max + min) / 2).toFixed(0), padding - 5, rect.height / 2)

        // X-axis labels
        ctx.textAlign = "center"
        ctx.textBaseline = "top"

        // Just show start, middle, and end points
        ctx.fillText("Day 1", padding, rect.height - padding + 5)
        ctx.fillText("Day " + Math.floor(data.length / 2), rect.width / 2, rect.height - padding + 5)
        ctx.fillText("Today", rect.width - padding, rect.height - padding + 5)
      }

      // Draw line chart
      ctx.beginPath()
      ctx.lineWidth = 2
      ctx.strokeStyle = color

      // Create gradient for area fill
      const gradient = ctx.createLinearGradient(0, padding, 0, rect.height - padding)
      gradient.addColorStop(0, color + "40") // 25% opacity
      gradient.addColorStop(1, color + "00") // 0% opacity

      data.forEach((value, index) => {
        const x = padding + index * (chartWidth / (data.length - 1))
        const y = padding + chartHeight - ((value - min) / range) * chartHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Fill area under the line
      ctx.lineTo(padding + chartWidth, rect.height - padding)
      ctx.lineTo(padding, rect.height - padding)
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()

      // Add dots at data points
      if (showAxis) {
        data.forEach((value, index) => {
          const x = padding + index * (chartWidth / (data.length - 1))
          const y = padding + chartHeight - ((value - min) / range) * chartHeight

          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        })
      }
    }
  }, [data, color, showAxis])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
