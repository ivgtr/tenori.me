import { useState, useEffect, useCallback } from 'react'
import { MazeGame } from './MazeGame'

export const useMazeGame = () => {
  const [game] = useState(() => new MazeGame())
  const [maze, setMaze] = useState<number[][]>([])
  const [playerPos, setPlayerPos] = useState<[number, number]>([1, 1])
  const [gameStarted, setGameStarted] = useState(false)

  const startGame = useCallback(() => {
    const newMaze = game.initializeMaze()
    setMaze(newMaze)
    setPlayerPos([1, 1])
    setGameStarted(true)
  }, [game])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!gameStarted) return

    const [currentRow, currentCol] = playerPos
    let newRow = currentRow
    let newCol = currentCol

    switch (e.key) {
      case 'ArrowUp': newRow--; break
      case 'ArrowDown': newRow++; break
      case 'ArrowLeft': newCol--; break
      case 'ArrowRight': newCol++; break
    }

    if (game.isValidMove(newRow, newCol)) {
      setPlayerPos([newRow, newCol])
      
      if (game.isGoal(newRow, newCol)) {
        alert('ゴール！おめでとうございます！')
        setGameStarted(false)
      }
    }
  }, [playerPos, gameStarted, game])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return {
    maze,
    playerPos,
    gameStarted,
    startGame
  }
} 
