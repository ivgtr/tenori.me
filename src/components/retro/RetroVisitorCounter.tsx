"use client";

import useSWR from "swr/immutable";
import { BlinkingText } from "./BlinkingText";

type Counter = {
  count: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const RetroVisitorCounter = () => {
  const { data, error } = useSWR<Counter>("/api/counter", fetcher);

  const formatCount = (count: number) => {
    return count.toString().padStart(6, "0");
  };

  return (
    <div className="bg-black border-2 border-green-400 p-3 font-mono text-center">
      <div className="text-green-400 text-sm mb-1">💻 VISITOR COUNTER 💻</div>
      <div className="bg-gray-900 border border-green-400 p-2 mb-2">
        {error ? (
          <BlinkingText className="text-red-400">ERROR</BlinkingText>
        ) : !data ? (
          <span className="text-green-400">------</span>
        ) : (
          <span className="text-green-400 text-lg font-bold">
            {formatCount(data.count)}
          </span>
        )}
      </div>
      <div className="text-green-400 text-xs">
        {error ? (
          "接続エラー"
        ) : !data ? (
          "読み込み中..."
        ) : (
          `あなたは${data.count}人目の訪問者です`
        )}
      </div>
    </div>
  );
};