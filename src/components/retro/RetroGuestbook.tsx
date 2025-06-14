"use client";

import { useState } from "react";
import { RetroButton } from "./RetroButton";
import { RetroBorder } from "./RetroBorder";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  date: string;
}

export const RetroGuestbook = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([
    {
      id: 1,
      name: "キリ番ゲッター",
      message: "1000番ゲット！！！記念カキコ(*^^*)ﾉ～♪",
      date: "2025/01/15"
    },
    {
      id: 2,
      name: "777",
      message: "777踏みました★ラッキーセブン(≧∇≦)ｷｬｰ♪",
      date: "2025/01/12"
    },
    {
      id: 3,
      name: "通りすがり",
      message: "500番踏み逃げ～(^o^)丿素敵なサイトですね！",
      date: "2025/01/08"
    },
    {
      id: 4,
      name: "常連さん",
      message: "いつも見てます♪次は2000番狙います(｀∀´)ゞ",
      date: "2025/01/05"
    }
  ]);

  const [newEntry, setNewEntry] = useState({ name: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.name.trim() || !newEntry.message.trim()) return;
    
    const now = new Date();
    const dateString = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}`;
    
    const newGuestbookEntry: GuestbookEntry = {
      id: entries.length + 1,
      name: newEntry.name.trim(),
      message: newEntry.message.trim(),
      date: dateString
    };
    
    setEntries([newGuestbookEntry, ...entries]);
    setNewEntry({ name: "", message: "" });
  };

  return (
    <RetroBorder variant="classic" className="max-w-md">
      <div className="bg-white">
        <h3 className="text-center font-bold mb-4 text-purple-800">📝 ゲストブック 📝</h3>
        
        <div className="mb-4 max-h-40 overflow-y-auto border-2 border-gray-400 p-2 bg-gray-50">
          {entries.map((entry) => (
            <div key={entry.id} className="mb-3 pb-2 border-b border-gray-300 last:border-b-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-blue-800">{entry.name}</span>
                <span className="text-xs text-gray-600">{entry.date}</span>
              </div>
              <p className="text-sm text-gray-800">{entry.message}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="お名前"
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
            className="w-full p-1 border-2 border-gray-400 text-sm"
            required
          />
          <textarea
            placeholder="メッセージ"
            value={newEntry.message}
            onChange={(e) => setNewEntry({ ...newEntry, message: e.target.value })}
            className="w-full p-1 border-2 border-gray-400 text-sm h-16 resize-none"
            required
          />
          <RetroButton type="submit" size="small" variant="neon" className="w-full">
            書き込む
          </RetroButton>
        </form>
      </div>
    </RetroBorder>
  );
};