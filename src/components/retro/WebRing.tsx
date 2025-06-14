interface WebRingProps {
  className?: string;
}

export const WebRing = ({ className = "" }: WebRingProps) => {
  return (
    <div className={`bg-gray-800 border-2 border-gray-400 p-3 text-center ${className}`}>
      <div className="text-cyan-400 font-bold mb-2">🔗 Web Ring 🔗</div>
      <div className="flex justify-center items-center gap-2 text-sm">
        <a href="https://www.google.com" className="text-yellow-300 hover:text-yellow-100" target="_blank" rel="noopener noreferrer">← 前</a>
        <span className="text-white">|</span>
        <a href="https://www.google.com" className="text-yellow-300 hover:text-yellow-100" target="_blank" rel="noopener noreferrer">次 →</a>
        <span className="text-white">|</span>
        <a href="https://www.google.com" className="text-yellow-300 hover:text-yellow-100" target="_blank" rel="noopener noreferrer">ランダム</a>
      </div>
      <div className="text-xs text-gray-300 mt-1">個人サイト同盟</div>
    </div>
  );
};