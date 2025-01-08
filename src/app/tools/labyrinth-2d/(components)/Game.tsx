'use client'

import { useEffect, useRef } from 'react'
import { useMazeGame } from './useMazeGame'

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { maze, playerPos, gameStarted, startGame } = useMazeGame()

  const CELL_SIZE = 20

  // 描画処理
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!gameStarted) return

    // 迷路の描画
    maze.forEach((row, i) => {
      row.forEach((cell, j) => {
        ctx.fillStyle = cell === 1 ? '#333' : cell === 2 ? '#4CAF50' : '#fff'
        ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      })
    })

    // プレイヤーの描画
    ctx.fillStyle = '#FF5722'
    ctx.fillRect(
      playerPos[1] * CELL_SIZE + CELL_SIZE / 4,
      playerPos[0] * CELL_SIZE + CELL_SIZE / 4,
      CELL_SIZE / 2,
      CELL_SIZE / 2
    )
  }, [maze, playerPos, gameStarted])


  return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <canvas
          ref={canvasRef}
          width={15 * CELL_SIZE}
          height={15 * CELL_SIZE}
          className="border-2 border-gray-300"
        />
        <div className="mt-4 text-center">
          {!gameStarted ? (
            <button
              onClick={startGame}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ゲームスタート
            </button>
          ) : (
            <p className="text-gray-600">
              矢印キーで移動してください。緑のマスがゴールです。
            </p>
          )}
        </div>
    </div>)
  
}
