interface AACharacterProps {
  character?: "mona" | "yaruo" | "shii" | "giko" | "morara";
  className?: string;
}

export const AACharacter = ({ character = "mona", className = "" }: AACharacterProps) => {
  const characters = {
    mona: [
      "  ∧_∧",
      " ( ´∀`)",
      " (   )",
      " | | |",
      "(__)_)"
    ],

    yaruo: [
      "   ____",
      "  /   \\",
      " / ─  ─ \\",
      "/  (●) (●) \\",
      "|  (__人__) |",
      "\\  ` ⌒´ /",
      " ノ     \\"
    ],

    shii: [
      "  ∧ ∧   /￣￣￣￣",
      " ( ﾟдﾟ)  < しぃ",
      "_| ⊃/(_ \\____",
      "/ └-(__/",
      "<_/<_/"
    ],

    giko: [
      "  ∧∧",
      " (,,ﾟДﾟ) /￣￣￣￣￣",
      " ⊂  ⊃ < ぎこちゃん", 
      "~|  |  \\____",
      " しＪ"
    ],

    morara: [
      "  /⌒ヽ",
      " ( ^ω^) おっ",
      " o_,__,o",
      "  /  /~",
      " と__)_)"
    ]
  };

  return (
    <div className={`aa-text ${className}`}>
      {characters[character].map((line, index) => (
        <div key={index} className="aa-line">
          {line}
        </div>
      ))}
    </div>
  );
};