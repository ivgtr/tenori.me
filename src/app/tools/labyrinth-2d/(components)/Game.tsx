'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useMazeGame } from './useMazeGame'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  life: number
  size: number
}

export default function Game() {
  const { maze, playerPos, gameStarted, startGame, handleMove, elapsedTime } = useMazeGame()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGoalEffect, setIsGoalEffect] = useState(false)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const hueRef = useRef(0)
  const CELL_SIZE = 20

  // パーティクルの生成
  const createParticles = (x: number, y: number) => {
    const particles: Particle[] = []
    for (let i = 0; i < 200; i++) {
      const angle = (Math.PI * 2 * i) / 200
      const speed = 5 + Math.random() * 8
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        life: 150,
        size: 2 + Math.random() * 6
      })
    }
    return particles
  }

  // ゴールエフェクトのアニメーション
  const animateGoalEffect = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const animate = () => {
      ctx.fillStyle = `rgba(255, 255, 255, 0.05)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 迷路の描画（レインボーエフェクト）
      maze.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell === 1) {
            const hue = (hueRef.current + i * 10 + j * 10) % 360
            ctx.fillStyle = `hsl(${hue}, 70%, 20%)`
          } else if (cell === 2) {
            hueRef.current = (hueRef.current + 2) % 360
            ctx.fillStyle = `hsl(${hueRef.current}, 100%, 50%)`
          } else {
            const hue = (hueRef.current + i * 10 + j * 10) % 360
            ctx.fillStyle = `hsl(${hue}, 70%, 90%)`
          }
          ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        })
      })

      // パーティクルの更新と描画
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.1
        particle.life -= 1

        ctx.shadowBlur = 15
        ctx.shadowColor = particle.color
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.life / 150

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.shadowBlur = 0
        ctx.globalAlpha = 1

        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1)
        }
      })

      if (particlesRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animate()
  }

  useEffect(() => {
    if (maze.length > 0 && maze[playerPos[0]][playerPos[1]] === 2) {
      setIsGoalEffect(true)
      const goalX = playerPos[1] * CELL_SIZE + CELL_SIZE / 2
      const goalY = playerPos[0] * CELL_SIZE + CELL_SIZE / 2
      particlesRef.current = createParticles(goalX, goalY)
      animateGoalEffect()

      setTimeout(() => {
        setIsGoalEffect(false)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }, 3000)
    }
  }, [playerPos, maze])

  // 通常の描画
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !gameStarted || isGoalEffect) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    maze.forEach((row, i) => {
      row.forEach((cell, j) => {
        ctx.fillStyle = cell === 1 ? '#333' : cell === 2 ? '#4CAF50' : '#fff'
        ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      })
    })

    ctx.fillStyle = '#FF5722'
    ctx.fillRect(
      playerPos[1] * CELL_SIZE + CELL_SIZE / 4,
      playerPos[0] * CELL_SIZE + CELL_SIZE / 4,
      CELL_SIZE / 2,
      CELL_SIZE / 2
    )
  }, [maze, playerPos, gameStarted, isGoalEffect])

  const controlButtons = [
    { direction: 'up' as const, label: '↑' },
    { direction: 'left' as const, label: '←' },
    { direction: 'right' as const, label: '→' },
    { direction: 'down' as const, label: '↓' }
  ]

  return (
    <div 
      id="game-container"
      className={`
        bg-white p-6 rounded-lg shadow-lg relative overflow-hidden
        flex flex-col items-center
        ${isGoalEffect ? 'animate-bounce' : ''}
      `}
      style={{ transformOrigin: 'center center' }}
    >
      <div className="text-gray-600 text-xl font-bold mb-2">
        経過時間: {elapsedTime}秒
      </div>
      <canvas
        ref={canvasRef}
        width={15 * CELL_SIZE}
        height={15 * CELL_SIZE}
        className={`border-2 border-gray-300 ${isGoalEffect ? 'animate-spin' : ''}`}
      />
      <div className={`mt-4 text-center w-full ${isGoalEffect ? 'animate-pulse' : ''}`}>
        {!gameStarted ? (
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ゲームスタート
          </button>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              矢印キーまたはボタンで移動してください。緑のマスがゴールです。
            </p>
            <div className={`grid grid-cols-3 gap-2 max-w-[200px] mx-auto ${isGoalEffect ? 'animate-bounce' : ''}`}>
              {controlButtons.map(({ direction, label }, index) => (
                <React.Fragment key={`button-group-${index}`}>
                  {index % 2 === 0 && <div key={`space-${index}`} />}
                  <button
                    onClick={() => handleMove(direction)}
                    className="bg-gray-600 hover:bg-gray-700 text-gray-300 p-2 rounded"
                  >
                    {label}
                  </button>
                  {index % 2 === 0 && <div key={`space-end-${index}`} />}
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
