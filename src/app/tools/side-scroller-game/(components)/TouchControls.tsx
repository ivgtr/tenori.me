"use client";

import { Button } from "@/components/Button";

interface TouchControlsProps {
  onJump: () => void;
  onSlowDown: () => void;
  onSpeedUp: () => void;
  disabled?: boolean;
  isVisible: boolean;
  currentSpeed?: number;
}

export const TouchControls = ({
  onJump,
  onSlowDown,
  onSpeedUp,
  disabled = false,
  isVisible,
  currentSpeed,
}: TouchControlsProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex flex-col gap-3 items-center mt-4">
      <Button
        onClick={onJump}
        disabled={disabled}
        className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg min-w-[120px]"
      >
        ジャンプ
      </Button>
      
      <div className="flex gap-4">
        <Button
          onClick={onSlowDown}
          disabled={disabled}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg font-bold rounded-lg shadow-lg min-w-[100px]"
        >
          ← 減速
        </Button>
        <Button
          onClick={onSpeedUp}
          disabled={disabled}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 text-lg font-bold rounded-lg shadow-lg min-w-[100px]"
        >
          加速 →
        </Button>
      </div>
      
      <div className="text-sm text-gray-600 text-center mt-2">
        <p>現在の速度: {currentSpeed?.toFixed(1) || '0.0'}</p>
      </div>
    </div>
  );
};