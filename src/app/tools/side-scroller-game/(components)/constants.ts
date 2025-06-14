// ゲーム全体で使用する定数
export const GAME_CONSTANTS = {
  // 物理系
  GRAVITY: 0.5,
  JUMP_FORCE: -14,
  
  // 速度系
  BASE_SCROLL_SPEED: 2,
  ACCELERATION: 0.2,
  MAX_SPEED: 6,
  MIN_SPEED: 0.5,
  
  // サイズ・位置系
  GROUND_Y: 400,
  PLAYER_SIZE: 30,
  CHUNK_WIDTH: 400,
  PIT_DEPTH: 20,
  
  // Canvas
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 500,
  
  // ゲームバランス
  CHUNKS_PER_THEME: 15,
  SCORE_SPEED_INCREMENT: 500,
  SPEED_INCREMENT_VALUE: 0.3,
  MAX_BASE_SPEED: 4.5,
} as const;

// テーマ関連の定数
export const THEME_COLORS = {
  backgrounds: {
    forest: "#87CEEB",
    desert: "#FFE4B5", 
    city: "#B0C4DE",
    mountain: "#E0E6FF",
    space: "#191970"
  },
  grounds: {
    forest: "#228B22",
    desert: "#F4A460",
    city: "#696969", 
    mountain: "#8FBC8F",
    space: "#2F4F4F"
  },
  elements: {
    forest: { tree: "#228B22", bush: "#32CD32", rock: "#696969", mountain: "#8FBC8F", flower: "#FF69B4" },
    desert: { tree: "#DAA520", bush: "#F4A460", rock: "#D2B48C", mountain: "#DEB887", cactus: "#228B22" },
    city: { building: "#708090", rock: "#2F4F4F", antenna: "#C0C0C0", pole: "#8B4513", sign: "#FFD700" },
    mountain: { tree: "#006400", bush: "#228B22", rock: "#556B2F", mountain: "#8B7D6B" },
    space: { rock: "#483D8B", mountain: "#4B0082", crystal: "#00CED1" }
  }
} as const;

export const THEMES = ['forest', 'desert', 'city', 'mountain', 'space'] as const;

export type Theme = typeof THEMES[number];