import { AACharacter } from "./AACharacter";
import { BlinkingText } from "./BlinkingText";

export const AAWelcome = () => {
  return (
    <div className="bg-black text-green-400 p-4 border-2 border-green-400">
      <div className="text-center mb-3">
        <BlinkingText className="text-yellow-300 font-bold">
          ★☆★ ようこそ個人サイトへ ★☆★
        </BlinkingText>
      </div>
      
      <div className="flex justify-center mb-3">
        <AACharacter character="mona" className="text-green-400" />
      </div>
      
      <div className="aa-text text-center text-green-400 mt-2">
        <pre className="aa-line m-0">        ／￣￣￣￣￣￣￣￣￣</pre>
        <pre className="aa-line m-0">       ＜ みんなでマターリしようね</pre>
        <pre className="aa-line m-0">        ＼＿＿＿＿＿＿＿＿＿</pre>
      </div>
      
      <div className="text-center mt-3 text-xs font-mono">
        <BlinkingText className="text-cyan-400">
          リンクフリー・相互リンク大歓迎！
        </BlinkingText>
      </div>
    </div>
  );
};