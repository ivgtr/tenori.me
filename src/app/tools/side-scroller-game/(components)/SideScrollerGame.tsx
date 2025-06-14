"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { GameCanvas } from "./GameCanvas";
import { GameControls } from "./GameControls";
import { TouchControls } from "./TouchControls";
import { useGameEngine } from "./useGameEngine";
import { GAME_CONSTANTS } from "./constants";

const getThemeDisplayName = (theme: string): string => {
  const themeNames = {
    forest: '森林',
    desert: '砂漠',
    city: '都市',
    mountain: '山岳',
    space: '宇宙'
  };
  return themeNames[theme as keyof typeof themeNames] || theme;
};

const getBaseSpeedForScore = (score: number): number => {
  const speedIncrease = Math.floor(score / GAME_CONSTANTS.SCORE_SPEED_INCREMENT) * GAME_CONSTANTS.SPEED_INCREMENT_VALUE;
  return Math.min(GAME_CONSTANTS.BASE_SCROLL_SPEED + speedIncrease, GAME_CONSTANTS.MAX_BASE_SPEED);
};

export const SideScrollerGame = () => {
  const { gameState, startGame, resetGame, jump, slowDown, speedUp } = useGameEngine();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">横スクロール2Dアクションゲーム</h3>
        <div className="flex gap-4 justify-center text-lg flex-wrap">
          <span>スコア: {gameState.score}</span>
          <span>テーマ: {getThemeDisplayName(gameState.currentTheme)}</span>
          <span>難易度: {gameState.difficulty}</span>
          <span>ベース速度: {getBaseSpeedForScore(gameState.score).toFixed(1)}</span>
          {gameState.gameOver && <span className="text-red-500 font-bold">ゲームオーバー</span>}
        </div>
      </div>

      <GameCanvas gameState={gameState} />

      {!gameState.isPlaying && !gameState.gameOver && (
        <div className="text-center">
          <Button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-bold min-w-[200px]"
          >
            ゲーム開始
          </Button>
          <p className="text-sm text-gray-600 mt-1">スペースキーでも開始できます</p>
        </div>
      )}

      {gameState.gameOver && (
        <div className="text-center">
          <p className="text-lg mb-2">最終スコア: {gameState.score}</p>
          <Button
            onClick={resetGame}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg font-bold min-w-[200px]"
          >
            もう一度プレイ
          </Button>
          <p className="text-sm text-gray-600 mt-1">スペースキーでもリプレイできます</p>
        </div>
      )}

      {isMobile ? (
        <TouchControls
          onJump={jump}
          onSlowDown={slowDown}
          onSpeedUp={speedUp}
          disabled={!gameState.isPlaying || gameState.gameOver}
          isVisible={gameState.isPlaying && !gameState.gameOver}
          currentSpeed={gameState.player.velocityX}
        />
      ) : (
        <GameControls
          onJump={jump}
          onSlowDown={slowDown}
          onSpeedUp={speedUp}
          disabled={!gameState.isPlaying || gameState.gameOver}
          currentSpeed={gameState.player.velocityX}
        />
      )}

      <div className="text-sm text-gray-600 text-center max-w-md">
        <h4 className="font-bold mb-1">遊び方:</h4>
        <ul className="text-left">
          <li>• 画面は自動でスクロールします（停止できません）</li>
          <li>• 左右キーで減速/加速できます</li>
          <li>• 障害物を避け、落とし穴をジャンプで飛び越えましょう</li>
          <li>• 障害物に当たるか、画面左端に挟まれるか、落とし穴に落ちるとゲームオーバー</li>
          <li>• スコアは進んだ距離で計算されます</li>
        </ul>
      </div>
    </div>
  );
};