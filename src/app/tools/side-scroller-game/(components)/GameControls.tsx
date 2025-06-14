"use client";

import { Button } from "@/components/Button";

interface GameControlsProps {
  onJump: () => void;
  onSlowDown: () => void;
  onSpeedUp: () => void;
  disabled?: boolean;
  currentSpeed: number;
}

export const GameControls = ({
  onJump,
  onSlowDown,
  onSpeedUp,
  disabled = false,
  currentSpeed,
}: GameControlsProps) => {
  return (
    <div className="flex flex-col gap-4 items-center mt-4">
      <div className="text-sm text-gray-600 text-center">
        <p>PC: ←→キーまたはA/Dキーで減速/加速、↑キーまたはW/スペースキーでジャンプ</p>
        <p>スマホ: 下のボタンで操作</p>
        <p className="mt-2">現在の速度: {currentSpeed.toFixed(1)}</p>
      </div>
      
      <div className="flex flex-col gap-2">
        <Button
          onClick={onJump}
          disabled={disabled}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-bold"
        >
          ジャンプ
        </Button>
        
        <div className="flex gap-2">
          <Button
            onClick={onSlowDown}
            disabled={disabled}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
          >
            ← 減速
          </Button>
          <Button
            onClick={onSpeedUp}
            disabled={disabled}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
          >
            加速 →
          </Button>
        </div>
      </div>
    </div>
  );
};