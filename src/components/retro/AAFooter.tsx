import { AACharacter } from "./AACharacter";

export const AAFooter = () => {
  return (
    <div className="bg-gray-800 text-green-400 p-3 border-2 border-gray-400 text-center">
      <div className="flex justify-center mb-2">
        <AACharacter character="morara" className="text-yellow-300" />
      </div>
      <div className="text-xs space-y-1 font-mono">
        <div>このサイトはフィクションです</div>
        <div>実在の人物・団体とは関係ありません</div>
        <div className="text-cyan-400 mt-2">
          Powered by モナー & やる夫
        </div>
      </div>
    </div>
  );
};