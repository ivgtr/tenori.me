"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StageGenerator } from "./stageGenerator";
import { GAME_CONSTANTS, THEME_COLORS, type Theme } from "./constants";

export interface GameState {
	player: {
		x: number;
		y: number;
		velocityY: number;
		velocityX: number;
		isJumping: boolean;
		isGrounded: boolean;
	};
	camera: {
		x: number;
	};
	obstacles: Array<{
		x: number;
		y: number;
		width: number;
		height: number;
		type: "normal" | "tall" | "wide" | "spike";
	}>;
	pits: Array<{
		x: number;
		width: number;
		type: "normal" | "wide" | "warning";
	}>;
	backgroundElements: Array<{
		x: number;
		y: number;
		type:
			| "tree"
			| "rock"
			| "bush"
			| "mountain"
			| "building"
			| "cloud"
			| "flower"
			| "cactus"
			| "crystal"
			| "antenna"
			| "pole"
			| "sign";
		scale: number;
		color?: string;
	}>;
	currentTheme: Theme;
	groundColor: string;
	difficulty: number;
	score: number;
	gameOver: boolean;
	isPlaying: boolean;
}

const getBaseSpeedForScore = (score: number): number => {
	const speedIncrease = Math.floor(score / GAME_CONSTANTS.SCORE_SPEED_INCREMENT) * GAME_CONSTANTS.SPEED_INCREMENT_VALUE;
	return Math.min(GAME_CONSTANTS.BASE_SCROLL_SPEED + speedIncrease, GAME_CONSTANTS.MAX_BASE_SPEED);
};

const getGroundColor = (theme: Theme): string => {
	return THEME_COLORS.grounds[theme];
};

export const useGameEngine = () => {
	const stageGenerator = useRef(new StageGenerator());

	const [gameState, setGameState] = useState<GameState>({
		player: {
			x: 100,
			y: GAME_CONSTANTS.GROUND_Y - GAME_CONSTANTS.PLAYER_SIZE,
			velocityY: 0,
			velocityX: GAME_CONSTANTS.BASE_SCROLL_SPEED,
			isJumping: false,
			isGrounded: true,
		},
		camera: {
			x: 0,
		},
		obstacles: [],
		pits: [],
		backgroundElements: [],
		currentTheme: "forest",
		groundColor: getGroundColor("forest"),
		difficulty: 1,
		score: 0,
		gameOver: false,
		isPlaying: false,
	});

	const gameLoopRef = useRef<number>(0);
	const keysRef = useRef<Set<string>>(new Set());

	const generateInitialStage = useCallback(() => {
		const obstacles: GameState["obstacles"] = [];
		const pits: GameState["pits"] = [];
		const backgroundElements: GameState["backgroundElements"] = [];

		// 初期ステージチャンクを生成
		for (let i = 0; i < 3; i++) {
			const chunk = stageGenerator.current.generateChunk(
				600 + i * GAME_CONSTANTS.CHUNK_WIDTH,
				1,
			);
			obstacles.push(...chunk.obstacles);
			pits.push(...chunk.pits);
			backgroundElements.push(...chunk.backgroundElements);
		}

		return { obstacles, pits, backgroundElements };
	}, []);

	const startGame = useCallback(() => {
		const initialStage = generateInitialStage();
		setGameState({
			player: {
				x: 100,
				y: GAME_CONSTANTS.GROUND_Y - GAME_CONSTANTS.PLAYER_SIZE,
				velocityY: 0,
				velocityX: getBaseSpeedForScore(0),
				isJumping: false,
				isGrounded: true,
			},
			camera: {
				x: 0,
			},
			...initialStage,
			currentTheme: stageGenerator.current.getCurrentTheme(),
			groundColor: getGroundColor(stageGenerator.current.getCurrentTheme()),
			difficulty: 1,
			score: 0,
			gameOver: false,
			isPlaying: true,
		});
	}, [generateInitialStage]);

	const resetGame = useCallback(() => {
		const initialStage = generateInitialStage();
		setGameState({
			player: {
				x: 100,
				y: GAME_CONSTANTS.GROUND_Y - GAME_CONSTANTS.PLAYER_SIZE,
				velocityY: 0,
				velocityX: getBaseSpeedForScore(0),
				isJumping: false,
				isGrounded: true,
			},
			camera: {
				x: 0,
			},
			...initialStage,
			currentTheme: stageGenerator.current.getCurrentTheme(),
			groundColor: getGroundColor(stageGenerator.current.getCurrentTheme()),
			difficulty: 1,
			score: 0,
			gameOver: false,
			isPlaying: true,
		});
	}, [generateInitialStage]);

	const checkCollision = (
		player: GameState["player"],
		obstacle: GameState["obstacles"][0],
	) => {
		// Add a small margin to make the game more forgiving
		const margin = 5;
		return (
			player.x + margin < obstacle.x + obstacle.width &&
			player.x + GAME_CONSTANTS.PLAYER_SIZE - margin > obstacle.x &&
			player.y + margin < obstacle.y + obstacle.height &&
			player.y + GAME_CONSTANTS.PLAYER_SIZE - margin > obstacle.y
		);
	};

	const gameLoop = useCallback(() => {
		setGameState((prev) => {
			if (!prev.isPlaying || prev.gameOver) return prev;

			const newState = { ...prev };

			// 現在のスコアに基づくベース速度を計算
			const currentBaseSpeed = getBaseSpeedForScore(newState.score);

			// Speed control with left/right arrows
			if (keysRef.current.has("ArrowLeft") || keysRef.current.has("a")) {
				newState.player.velocityX = Math.max(
					GAME_CONSTANTS.MIN_SPEED,
					newState.player.velocityX - GAME_CONSTANTS.ACCELERATION,
				);
			} else if (
				keysRef.current.has("ArrowRight") ||
				keysRef.current.has("d")
			) {
				newState.player.velocityX = Math.min(
					GAME_CONSTANTS.MAX_SPEED,
					newState.player.velocityX + GAME_CONSTANTS.ACCELERATION,
				);
			} else {
				// Gradually return to base speed when no input
				if (newState.player.velocityX > currentBaseSpeed) {
					newState.player.velocityX = Math.max(
						currentBaseSpeed,
						newState.player.velocityX - GAME_CONSTANTS.ACCELERATION * 0.5,
					);
				} else if (newState.player.velocityX < currentBaseSpeed) {
					newState.player.velocityX = Math.min(
						currentBaseSpeed,
						newState.player.velocityX + GAME_CONSTANTS.ACCELERATION * 0.5,
					);
				}
			}

			// Auto-scroll camera
			newState.camera.x += newState.player.velocityX;

			// Keep player in center of screen horizontally
			newState.player.x = newState.camera.x + 200;

			// Jump
			if (
				(keysRef.current.has("ArrowUp") ||
					keysRef.current.has("w") ||
					keysRef.current.has(" ")) &&
				newState.player.isGrounded
			) {
				newState.player.velocityY = GAME_CONSTANTS.JUMP_FORCE;
				newState.player.isJumping = true;
				newState.player.isGrounded = false;
			}

			// Apply gravity
			newState.player.velocityY += GAME_CONSTANTS.GRAVITY;
			newState.player.y += newState.player.velocityY;

			// Check if player is over a pit
			let isOverPit = false;
			for (const pit of newState.pits) {
				if (
					newState.player.x + GAME_CONSTANTS.PLAYER_SIZE > pit.x &&
					newState.player.x < pit.x + pit.width
				) {
					isOverPit = true;
					break;
				}
			}

			// Ground collision logic
			if (newState.player.y >= GAME_CONSTANTS.GROUND_Y - GAME_CONSTANTS.PLAYER_SIZE) {
				if (!isOverPit) {
					// Normal ground landing
					newState.player.y = GAME_CONSTANTS.GROUND_Y - GAME_CONSTANTS.PLAYER_SIZE;
					newState.player.velocityY = 0;
					newState.player.isJumping = false;
					newState.player.isGrounded = true;
				} else {
					// Player is over pit, continue falling
					newState.player.isGrounded = false;
					if (newState.player.y > GAME_CONSTANTS.GROUND_Y + 50) {
						// Fell into pit
						newState.gameOver = true;
						newState.isPlaying = false;
					}
				}
			} else {
				// Player is in the air
				newState.player.isGrounded = false;
			}

			// 新しい難易度を計算
			const newDifficulty = stageGenerator.current.getDifficulty(
				newState.score,
			);
			if (newDifficulty !== newState.difficulty) {
				newState.difficulty = newDifficulty;
				// テーマの変更はチャンク生成時のみ行う
			}

			// 最後の要素の位置を確認して新しいチャンクを生成（安全な最大値計算）
			let lastElementX = 0;

			// 障害物の最後のX座標を取得
			if (newState.obstacles.length > 0) {
				for (const obstacle of newState.obstacles) {
					if (obstacle.x > lastElementX) lastElementX = obstacle.x;
				}
			}

			// 落とし穴の最後のX座標を確認
			if (newState.pits.length > 0) {
				for (const pit of newState.pits) {
					if (pit.x > lastElementX) lastElementX = pit.x;
				}
			}

			// 背景要素の最後のX座標を確認
			if (newState.backgroundElements.length > 0) {
				for (const element of newState.backgroundElements) {
					if (element.x > lastElementX) lastElementX = element.x;
				}
			}

			if (lastElementX < newState.camera.x + 1200) {
				const chunk = stageGenerator.current.generateChunk(
					lastElementX + 50,
					newState.difficulty,
				); // 隙間を狭く
				newState.obstacles.push(...chunk.obstacles);
				newState.pits.push(...chunk.pits);
				newState.backgroundElements.push(...chunk.backgroundElements);

				// テーマが変更された場合のみ更新
				if (chunk.themeChanged) {
					newState.currentTheme = chunk.theme;
					newState.groundColor = getGroundColor(chunk.theme);
				}
			}

			// 古い要素を削除
			const cleanupThreshold = newState.camera.x - 200;
			newState.obstacles = newState.obstacles.filter(
				(obstacle) => obstacle.x + obstacle.width > cleanupThreshold,
			);
			newState.pits = newState.pits.filter(
				(pit) => pit.x + pit.width > cleanupThreshold,
			);
			// 背景要素はより広い範囲で保持
			newState.backgroundElements = newState.backgroundElements.filter(
				(element) => element.x > newState.camera.x - 1000,
			);

			// Collision detection with obstacles
			for (const obstacle of newState.obstacles) {
				if (checkCollision(newState.player, obstacle)) {
					newState.gameOver = true;
					newState.isPlaying = false;
					break;
				}
			}

			// Check if player is crushed against left edge of screen
			if (newState.player.x < newState.camera.x) {
				newState.gameOver = true;
				newState.isPlaying = false;
			}

			// Update score based on distance traveled
			newState.score = Math.floor(newState.player.x / 10);

			return newState;
		});
	}, []);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Handle game start/restart with space key
			if (e.key === " ") {
				if (!gameState.isPlaying && !gameState.gameOver) {
					startGame();
					e.preventDefault();
					return;
				} else if (gameState.gameOver) {
					resetGame();
					e.preventDefault();
					return;
				}
			}

			// Don't convert arrow keys to lowercase
			const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
			keysRef.current.add(key);
			if (
				e.key === " " ||
				e.key === "ArrowUp" ||
				e.key === "ArrowLeft" ||
				e.key === "ArrowRight"
			) {
				e.preventDefault();
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			// Don't convert arrow keys to lowercase
			const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
			keysRef.current.delete(key);
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [gameState.isPlaying, gameState.gameOver, startGame, resetGame]);

	useEffect(() => {
		if (!gameState.isPlaying || gameState.gameOver) {
			if (gameLoopRef.current) {
				cancelAnimationFrame(gameLoopRef.current);
				gameLoopRef.current = 0;
			}
			return;
		}

		const runGameLoop = () => {
			gameLoop();
			gameLoopRef.current = requestAnimationFrame(runGameLoop);
		};

		gameLoopRef.current = requestAnimationFrame(runGameLoop);

		return () => {
			if (gameLoopRef.current) {
				cancelAnimationFrame(gameLoopRef.current);
				gameLoopRef.current = 0;
			}
		};
	}, [gameState.isPlaying, gameState.gameOver, gameLoop]);

	const jump = useCallback(() => {
		setGameState((prev) => {
			if (prev.player.isGrounded && prev.isPlaying && !prev.gameOver) {
				return {
					...prev,
					player: {
						...prev.player,
						velocityY: GAME_CONSTANTS.JUMP_FORCE,
						isJumping: true,
						isGrounded: false,
					},
				};
			}
			return prev;
		});
	}, []);

	const slowDown = useCallback(() => {
		setGameState((prev) => {
			if (prev.isPlaying && !prev.gameOver) {
				return {
					...prev,
					player: {
						...prev.player,
						velocityX: Math.max(
							GAME_CONSTANTS.MIN_SPEED,
							prev.player.velocityX - GAME_CONSTANTS.ACCELERATION,
						),
					},
				};
			}
			return prev;
		});
	}, []);

	const speedUp = useCallback(() => {
		setGameState((prev) => {
			if (prev.isPlaying && !prev.gameOver) {
				return {
					...prev,
					player: {
						...prev.player,
						velocityX: Math.min(
							GAME_CONSTANTS.MAX_SPEED,
							prev.player.velocityX + GAME_CONSTANTS.ACCELERATION,
						),
					},
				};
			}
			return prev;
		});
	}, []);

	return {
		gameState,
		startGame,
		resetGame,
		jump,
		slowDown,
		speedUp,
	};
};
