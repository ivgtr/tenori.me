export class MazeGame {
  private maze: number[][]
  readonly ROWS: number = 15
  readonly COLS: number = 15
  
  constructor() {
    this.maze = []
  }

  initializeMaze(): number[][] {
    const maze = Array(this.ROWS).fill(null).map(() => Array(this.COLS).fill(1))
    const stack: [number, number][] = []
    const start: [number, number] = [1, 1]
    
    maze[start[0]][start[1]] = 0
    stack.push(start)

    while (stack.length > 0) {
      const current = stack[stack.length - 1]
      const neighbors = this.getUnvisitedNeighbors(current[0], current[1], maze)

      if (neighbors.length === 0) {
        stack.pop()
      } else {
        const [nextRow, nextCol] = neighbors[Math.floor(Math.random() * neighbors.length)]
        maze[nextRow][nextCol] = 0
        maze[current[0] + (nextRow - current[0]) / 2][current[1] + (nextCol - current[1]) / 2] = 0
        stack.push([nextRow, nextCol])
      }
    }

    maze[this.ROWS - 2][this.COLS - 2] = 2
    this.maze = maze
    return maze
  }

  private getUnvisitedNeighbors(row: number, col: number, maze: number[][]): [number, number][] {
    const neighbors: [number, number][] = []
    const directions = [[-2, 0], [2, 0], [0, -2], [0, 2]]

    for (const [dr, dc] of directions) {
      const newRow = row + dr
      const newCol = col + dc
      if (newRow >= 0 && newRow < this.ROWS && newCol >= 0 && newCol < this.COLS && maze[newRow][newCol] === 1) {
        neighbors.push([newRow, newCol])
      }
    }
    return neighbors
  }

  isValidMove(row: number, col: number): boolean {
    return row >= 0 && row < this.ROWS &&
           col >= 0 && col < this.COLS &&
           this.maze[row][col] !== 1
  }

  isGoal(row: number, col: number): boolean {
    return this.maze[row][col] === 2
  }
}
