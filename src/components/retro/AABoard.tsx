"use client";

import { useState, useEffect } from "react";
import { AACharacter } from "./AACharacter";
import { RetroBorder } from "./RetroBorder";
import { RetroButton } from "./RetroButton";

interface AAPost {
  id: number;
  name: string;
  message: string;
  character: "mona" | "yaruo" | "shii" | "giko" | "morara";
  timestamp: string;
}

export const AABoard = () => {
  const [posts, setPosts] = useState<AAPost[]>([
    {
      id: 1,
      name: "名無しさん",
      message: "ようこそモナー板へ！",
      character: "mona",
      timestamp: "2025/01/15 12:34:56"
    },
    {
      id: 2,
      name: "1",
      message: "やる夫だお〜",
      character: "yaruo", 
      timestamp: "2025/01/15 12:35:12"
    },
    {
      id: 3,
      name: "ぎこ",
      message: "フサフサだゴルァ！！",
      character: "giko",
      timestamp: "2025/01/15 12:35:45"
    }
  ]);

  const [currentPost, setCurrentPost] = useState({
    name: "",
    message: "",
    character: "mona" as const
  });

  const characters = [
    { key: "mona" as const, name: "モナー" },
    { key: "yaruo" as const, name: "やる夫" },
    { key: "shii" as const, name: "しぃ" },
    { key: "giko" as const, name: "ぎこ" },
    { key: "morara" as const, name: "モララー" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPost.message.trim()) return;

    const now = new Date();
    const timestamp = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const newPost: AAPost = {
      id: posts.length + 1,
      name: currentPost.name.trim() || "名無しさん",
      message: currentPost.message.trim(),
      character: currentPost.character,
      timestamp
    };

    setPosts([...posts, newPost]);
    setCurrentPost({ name: "", message: "", character: "mona" });
  };

  return (
    <RetroBorder variant="classic" className="max-w-2xl">
      <div className="bg-white text-black">
        <h3 className="text-center font-bold mb-4 text-purple-800 border-b-2 border-purple-800 pb-2">
          📋 AA掲示板 📋
        </h3>
        
        <div className="mb-4 max-h-80 overflow-y-auto border-2 border-gray-400 p-3 bg-gray-50">
          {posts.map((post) => (
            <div key={post.id} className="mb-4 pb-3 border-b border-gray-300 last:border-b-0">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-blue-800">
                  {post.id}: {post.name}
                </span>
                <span className="text-xs text-gray-600">{post.timestamp}</span>
              </div>
              <div className="mb-2">
                <AACharacter character={post.character} className="text-green-800" />
              </div>
              <p className="text-sm text-gray-800 ml-4">{post.message}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="名前（省略可）"
              value={currentPost.name}
              onChange={(e) => setCurrentPost({ ...currentPost, name: e.target.value })}
              className="p-1 border-2 border-gray-400 text-sm"
            />
            <select
              value={currentPost.character}
              onChange={(e) => setCurrentPost({ ...currentPost, character: e.target.value as any })}
              className="p-1 border-2 border-gray-400 text-sm"
            >
              {characters.map((char) => (
                <option key={char.key} value={char.key}>
                  {char.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="メッセージを入力..."
            value={currentPost.message}
            onChange={(e) => setCurrentPost({ ...currentPost, message: e.target.value })}
            className="w-full p-2 border-2 border-gray-400 text-sm h-20 resize-none"
            required
          />
          <RetroButton type="submit" variant="primary" className="w-full">
            書き込む
          </RetroButton>
        </form>
      </div>
    </RetroBorder>
  );
};