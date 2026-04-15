"use client"

import { useEffect, useId, useState, type RefObject } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null> // Container ref
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  repeat?: number
  repeatDelay?: number
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false, // Include the reverse prop
  duration = 5,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  repeat = Infinity,
  repeatDelay = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })
  const [coords, setCoords] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 })

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const rectA = fromRef.current.getBoundingClientRect()
        const rectB = toRef.current.getBoundingClientRect()

        const svgWidth = containerRect.width
        const svgHeight = containerRect.height
        setSvgDimensions({ width: svgWidth, height: svgHeight })

        // Simplify anchor points to center to avoid artifacts
        const sX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset
        const sY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset
        
        const eX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset
        const eY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset

        setCoords({ startX: sX, startY: sY, endX: eX, endY: eY })

        let d = ""
        if (curvature === 0) {
          // Pure straight line to avoid any bezier logic artifacts
          d = `M ${sX},${sY} L ${eX},${eY}`
        } else {
          // Bezier logic for curved paths
          const isVertical = Math.abs(rectA.left - rectB.left) < 50
          let controlX1, controlY1, controlX2, controlY2

          if (isVertical) {
            controlX1 = sX
            controlY1 = sY + (eY - sY) * 0.5 - curvature
            controlX2 = eX
            controlY2 = eY - (eY - sY) * 0.5 - curvature
          } else {
            controlX1 = sX + (eX - sX) * 0.5
            controlY1 = sY - curvature
            controlX2 = eX - (eX - sX) * 0.5
            controlY2 = eY - curvature
          }
          d = `M ${sX},${sY} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${eX},${eY}`
        }

        setPathD(d)
      }
    }

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updatePath()
    })

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Call the updatePath initially to set the initial path
    updatePath()

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect()
    }
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
          <motion.linearGradient
            className="transform-gpu"
            id={id}
            gradientUnits={"userSpaceOnUse"}
            initial={{
              x1: coords.startX,
              x2: coords.startX,
              y1: coords.startY,
              y2: coords.startY,
            }}
            animate={{
              x1: [coords.startX, coords.endX],
              x2: [coords.startX - (coords.endX - coords.startX) * 0.1, coords.endX],
              y1: [coords.startY, coords.endY],
              y2: [coords.startY - (coords.endY - coords.startY) * 0.1, coords.endY],
            }}
            transition={{
              delay,
              duration,
              ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
              repeat,
              repeatDelay,
            }}
          >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  )
}
