interface AACharacterProps {
  character?: "mona" | "yaruo" | "shii" | "giko" | "morara";
  className?: string;
}

export const AACharacter = ({ character = "mona", className = "" }: AACharacterProps) => {
  const characters = {
    mona: [
      "     ∧_∧",
      "   （ ´∀｀）",
      "   （　　　）",
      "    ｜ ｜ |",
      "   （＿_)＿）"
    ],

    yaruo: [
      "    ＿＿＿_",
      "   ／　　　 ＼",
      "  ／ ─　　─ ＼",
      " ／　 （●） （●） ＼",
      " |　　　（__人__）　 |",
      " ＼　　 ｀ ⌒´　　／",
      "　／l　　　　　　　 ヽ"
    ],

    shii: [
      "   ∧ ∧",
      "  （*ﾟーﾟ)",
      " ～(　_uuノ"
    ],

    giko: [
      "   ∧∧",
      "  （,,ﾟДﾟ）",
      "  ⊂　　⊃",
      " ～|　　|",
      "   しＪ"
    ],

    morara: [
      "   ／⌒ヽ",
      "  （ ＾ω＾）",
      "  o_,__,o",
      "   /　 /~",
      "  と__)_)"
    ]
  };

  return (
    <div className={`aa-text ${className}`}>
      {characters[character].map((line, index) => (
        <pre key={index} className="aa-line m-0">
          {line}
        </pre>
      ))}
    </div>
  );
};