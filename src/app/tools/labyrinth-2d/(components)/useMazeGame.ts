import { useState, useEffect, useCallback, useRef } from "react";
import { MazeGame } from "./MazeGame";

type Direction = "up" | "down" | "left" | "right";

declare global {
	interface Window {
		AudioContext: typeof AudioContext;
		webkitAudioContext: typeof AudioContext;
	}
}

const playGoalSound = () => {
	const audioContext = new (window.AudioContext || window.webkitAudioContext)();
	const gainNode = audioContext.createGain();
	const oscillators = [
		{ freq: [440, 880], time: 0.2 },
		{ freq: [554.37, 1108.74], time: 0.2 },
	].map(({ freq, time }) => {
		const osc = audioContext.createOscillator();
		osc.type = "sine";
		osc.frequency.setValueAtTime(freq[0], audioContext.currentTime);
		osc.frequency.setValueAtTime(freq[1], audioContext.currentTime + time);
		osc.connect(gainNode);
		return osc;
	});

	gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
	gainNode.gain.exponentialRampToValueAtTime(
		0.01,
		audioContext.currentTime + 1,
	);
	gainNode.connect(audioContext.destination);

	oscillators.forEach((osc) => osc.start());
	setTimeout(() => oscillators.forEach((osc) => osc.stop()), 1000);
};

export const useMazeGame = () => {
	const [game] = useState(() => new MazeGame());
	const [maze, setMaze] = useState<number[][]>([]);
	const [playerPos, setPlayerPos] = useState<[number, number]>([1, 1]);
	const [gameStarted, setGameStarted] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const isMoving = useRef(false);
	const timerRef = useRef<NodeJS.Timeout>(null);

	const startGame = useCallback(() => {
		setMaze(game.initializeMaze());
		setPlayerPos([1, 1]);
		setGameStarted(true);
		setElapsedTime(0);

		timerRef.current = setInterval(() => {
			setElapsedTime((prev) => prev + 1);
		}, 1000);
	}, [game]);

	const handleMove = useCallback(
		(direction: Direction) => {
			if (!gameStarted || isMoving.current) return;

			const [currentRow, currentCol] = playerPos;
			const moves: Record<Direction, [number, number]> = {
				up: [-1, 0],
				down: [1, 0],
				left: [0, -1],
				right: [0, 1],
			};

			const [dRow, dCol] = moves[direction];
			const newRow = currentRow + dRow;
			const newCol = currentCol + dCol;

			if (game.isValidMove(newRow, newCol)) {
				isMoving.current = true;
				setPlayerPos([newRow, newCol]);

				if (game.isGoal(newRow, newCol)) {
					if (timerRef.current) clearInterval(timerRef.current);
					playGoalSound();
					setTimeout(() => {
						alert(
							`ゴール！おめでとうございます！\nクリアタイム: ${elapsedTime}秒`,
						);
						setGameStarted(false);
						isMoving.current = false;
					}, 3000);
				} else {
					requestAnimationFrame(() => {
						isMoving.current = false;
					});
				}
			}
		},
		[playerPos, gameStarted, game, elapsedTime],
	);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			const keyMap: Record<string, Direction> = {
				ArrowUp: "up",
				ArrowDown: "down",
				ArrowLeft: "left",
				ArrowRight: "right",
			};
			const direction = keyMap[e.key];
			if (direction) handleMove(direction);
		},
		[handleMove],
	);

	useEffect(() => {
		if (gameStarted) {
			window.addEventListener("keydown", handleKeyDown);
			return () => window.removeEventListener("keydown", handleKeyDown);
		}
	}, [gameStarted, handleKeyDown]);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, []);

	return {
		maze,
		playerPos,
		gameStarted,
		startGame,
		handleKeyDown,
		handleMove,
		elapsedTime,
	};
};
