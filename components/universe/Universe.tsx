"use client"
import Link from "next/link"
import { useMemo } from "react"
import { motion } from "framer-motion"

type Service = {
  id: string
  label: string
  connected: boolean
}

export default function Universe({
  me,
  services
}: { me: { name: string, displayName: string }, services: Service[] }) {
  const nodes = useMemo(() => services, [services])
  const radius = 160

  return (
    <div className="relative w-full max-w-3xl mx-auto" style={{ height: 420 }}>
      {/* Center (Me) */}
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 card glow px-6 py-5 text-center"
      >
        <div className="text-sm text-akari-muted">私</div>
        <div className="text-lg">{me.displayName}（{me.name}）</div>
      </motion.div>

      {/* Service nodes */}
      {nodes.map((s, i) => {
        const angle = (i / nodes.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return (
          <Link
            key={s.id}
            href={`/dashboard/${s.id}`}
            className="absolute"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)"
            }}
          >
            <motion.div
              className={`card px-3 py-2 text-sm select-none ${s.connected ? "glow" : ""}`}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.98 }}
              animate={{ y: [0, -2, 0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
            >
              <span className={s.connected ? "" : "text-akari-muted"}>{s.label}</span>
            </motion.div>
          </Link>
        )
      })}

      {/* Orbital lines + soft glow using SVG */}
      <motion.svg
        className="absolute inset-0"
        width="100%"
        height="100%"
        viewBox="-240 -240 480 480"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <defs>
          <radialGradient id="u-bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(244,162,97,0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="u-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--akari-accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--akari-warm)" stopOpacity="0.4" />
          </linearGradient>
          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft inner planet glow */}
        <motion.circle
          cx={0}
          cy={0}
          r={120}
          fill="url(#u-bg)"
          filter="url(#soft-glow)"
          animate={{ r: [110, 125, 110] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Spokes to each service */}
        {nodes.map((_, i) => {
          const angle = (i / nodes.length) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          return (
            <motion.line
              key={`spoke-${i}`}
              x1={0}
              y1={0}
              x2={x}
              y2={y}
              stroke="url(#u-stroke)"
              strokeWidth={1}
              strokeLinecap="round"
              strokeDasharray="6 8"
              animate={{ strokeDashoffset: [0, -30] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
              opacity={0.5}
            />
          )
        })}

        {/* Outer orbital ring */}
        <motion.circle
          cx={0}
          cy={0}
          r={radius}
          stroke="url(#u-stroke)"
          strokeWidth={1}
          fill="none"
          opacity={0.35}
          animate={{ strokeDashoffset: [0, 60] }}
          strokeDasharray="4 10"
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </motion.svg>
    </div>
  )
}
