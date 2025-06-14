import { GAME_CONSTANTS, THEMES, type Theme } from "./constants";

export interface StageChunk {
  obstacles: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    type: 'normal' | 'tall' | 'wide' | 'spike';
  }>;
  pits: Array<{
    x: number;
    width: number;
    type: 'normal' | 'wide' | 'warning';
  }>;
  backgroundElements: Array<{
    x: number;
    y: number;
    type: 'tree' | 'rock' | 'bush' | 'mountain' | 'building' | 'cloud' | 'flower' | 'cactus' | 'crystal' | 'antenna' | 'pole' | 'sign';
    scale: number;
    color?: string;
  }>;
  theme: Theme;
}

export interface StagePattern {
  name: string;
  difficulty: number;
  generator: (startX: number, theme: Theme) => StageChunk;
}

// ランダム生成用のユーティリティ関数
const random = (min: number, max: number) => Math.random() * (max - min) + min;
const randomInt = (min: number, max: number) => Math.floor(random(min, max + 1));
const randomChoice = <T>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

// 障害物タイプの定義（最大高さを定義）
const obstacleTypes = {
  normal: { width: 30, minHeight: 40, maxHeight: 80 },
  tall: { width: 25, minHeight: 60, maxHeight: 120 },
  wide: { width: 50, minHeight: 30, maxHeight: 60 },
  spike: { width: 20, minHeight: 50, maxHeight: 100 }
};

// 障害物の高さをランダムに生成
const getRandomHeight = (type: keyof typeof obstacleTypes): number => {
  const config = obstacleTypes[type];
  return randomInt(config.minHeight, config.maxHeight);
};

// 背景要素の生成
const generateBackgroundElements = (startX: number, theme: StageChunk['theme']): StageChunk['backgroundElements'] => {
  const elements: StageChunk['backgroundElements'] = [];
  
  // テーマ別の背景要素（大幅に追加）
  const themeElements = {
    forest: ['tree', 'bush', 'rock', 'flower', 'tree', 'bush'], // 重複で出現頻度調整
    desert: ['rock', 'mountain', 'cactus', 'rock', 'cactus'],
    city: ['building', 'cloud', 'antenna', 'pole', 'sign', 'building'],
    mountain: ['tree', 'rock', 'mountain', 'tree', 'rock'],
    space: ['cloud', 'crystal', 'rock', 'crystal']
  } as const;
  
  const availableTypes = themeElements[theme];
  
  // 背景要素をランダムに配置（より多く、より広い範囲で）
  for (let i = 0; i < randomInt(8, 15); i++) {
    const x = startX + random(-GAME_CONSTANTS.CHUNK_WIDTH * 0.5, GAME_CONSTANTS.CHUNK_WIDTH * 1.5);
    const type = randomChoice(availableTypes);
    let y: number;
    let scale: number;
    
    switch (type) {
      case 'tree':
        y = GAME_CONSTANTS.GROUND_Y - random(80, 150);
        scale = random(0.8, 1.5);
        break;
      case 'bush':
        y = GAME_CONSTANTS.GROUND_Y - random(20, 40);
        scale = random(0.6, 1.2);
        break;
      case 'rock':
        y = GAME_CONSTANTS.GROUND_Y - random(30, 60);
        scale = random(0.7, 1.3);
        break;
      case 'mountain':
        y = GAME_CONSTANTS.GROUND_Y - random(200, 300);
        scale = random(1.5, 2.5);
        break;
      case 'building':
        y = GAME_CONSTANTS.GROUND_Y - random(150, 250);
        scale = random(1.0, 2.0);
        break;
      case 'cloud':
        y = random(50, 200);
        scale = random(0.8, 1.8);
        break;
      case 'flower':
        y = GAME_CONSTANTS.GROUND_Y - random(10, 25);
        scale = random(0.4, 0.8);
        break;
      case 'cactus':
        y = GAME_CONSTANTS.GROUND_Y - random(40, 80);
        scale = random(0.6, 1.2);
        break;
      case 'crystal':
        y = GAME_CONSTANTS.GROUND_Y - random(20, 50);
        scale = random(0.5, 1.0);
        break;
      case 'antenna':
        y = GAME_CONSTANTS.GROUND_Y - random(100, 200);
        scale = random(0.8, 1.5);
        break;
      case 'pole':
        y = GAME_CONSTANTS.GROUND_Y - random(60, 120);
        scale = random(0.7, 1.3);
        break;
      case 'sign':
        y = GAME_CONSTANTS.GROUND_Y - random(50, 100);
        scale = random(0.6, 1.1);
        break;
      default:
        y = GAME_CONSTANTS.GROUND_Y;
        scale = 1;
    }
    
    elements.push({
      x,
      y,
      type: type as StageChunk['backgroundElements'][0]['type'],
      scale,
      color: theme === 'desert' ? '#D2B48C' : theme === 'space' ? '#4B0082' : undefined
    });
  }
  
  // 追加で空中要素を生成
  for (let i = 0; i < randomInt(4, 8); i++) {
    const skyElements = theme === 'space' ? ['cloud', 'crystal'] : ['cloud'];
    const skyType = randomChoice(skyElements);
    elements.push({
      x: startX + random(-GAME_CONSTANTS.CHUNK_WIDTH, GAME_CONSTANTS.CHUNK_WIDTH * 2),
      y: random(50, 250),
      type: skyType as 'cloud' | 'crystal',
      scale: random(0.8, 1.8),
      color: theme === 'space' ? '#9370DB' : skyType === 'crystal' ? '#00CED1' : '#FFFFFF'
    });
  }
  
  // テーマ特有の装飾要素
  const decorativeCount = randomInt(3, 8);
  for (let j = 0; j < decorativeCount; j++) {
    let decorType: string;
    let decorColor: string | undefined;
    
    switch (theme) {
      case 'forest':
        decorType = randomChoice(['flower', 'bush', 'tree']);
        decorColor = decorType === 'flower' ? randomChoice(['#FF69B4', '#FFD700', '#FF6347']) : undefined;
        break;
      case 'desert':
        decorType = randomChoice(['cactus', 'rock']);
        decorColor = '#8FBC8F';
        break;
      case 'city':
        decorType = randomChoice(['antenna', 'pole', 'sign']);
        decorColor = '#C0C0C0';
        break;
      case 'mountain':
        decorType = randomChoice(['rock', 'tree']);
        break;
      case 'space':
        decorType = randomChoice(['crystal', 'rock']);
        decorColor = decorType === 'crystal' ? '#00CED1' : '#483D8B';
        break;
      default:
        decorType = 'rock';
    }
    
    elements.push({
      x: startX + random(0, GAME_CONSTANTS.CHUNK_WIDTH),
      y: GAME_CONSTANTS.GROUND_Y - random(20, 60),
      type: decorType as StageChunk['backgroundElements'][0]['type'],
      scale: random(0.5, 1.2),
      color: decorColor
    });
  }
  
  return elements;
};

// ステージパターンの定義
export const stagePatterns: StagePattern[] = [
  // 基本パターン（コンパクト版）
  {
    name: 'basic',
    difficulty: 1,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // 1-2個の障害物を密に配置
      const numObstacles = randomInt(1, 2);
      for (let i = 0; i < numObstacles; i++) {
        const height = getRandomHeight('normal');
        obstacles.push({
          x: startX + 50 + i * 140,
          y: GAME_CONSTANTS.GROUND_Y - height,
          width: obstacleTypes.normal.width,
          height: height,
          type: 'normal' as const
        });
      }
      
      // 50%の確率で小さな落とし穴
      if (Math.random() < 0.5) {
        pits.push({
          x: startX + 250,
          width: random(30, 50),
          type: 'normal' as const
        });
      }
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  },
  
  // ジャンプチャレンジ（コンパクト版）
  {
    name: 'jump_challenge',
    difficulty: 2,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // 1-2個の落とし穴
      const numPits = randomInt(1, 2);
      for (let i = 0; i < numPits; i++) {
        pits.push({
          x: startX + 80 + i * 150,
          width: random(50, 70),
          type: 'normal' as const
        });
      }
      
      // 落とし穴の後に障害物
      if (Math.random() < 0.6) {
        const height = getRandomHeight('normal');
        obstacles.push({
          x: startX + 300,
          y: GAME_CONSTANTS.GROUND_Y - height,
          width: obstacleTypes.normal.width,
          height: height,
          type: 'normal' as const
        });
      }
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  },
  
  // 密集障害物（コンパクト版）
  {
    name: 'dense_obstacles',
    difficulty: 3,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // 2-3個の障害物を密に配置
      const numObstacles = randomInt(2, 3);
      for (let i = 0; i < numObstacles; i++) {
        const obstacleType = randomChoice(['normal', 'tall', 'wide', 'spike'] as const);
        const config = obstacleTypes[obstacleType];
        const height = getRandomHeight(obstacleType);
        
        obstacles.push({
          x: startX + 50 + i * 100,
          y: GAME_CONSTANTS.GROUND_Y - height,
          width: config.width,
          height: height,
          type: obstacleType
        });
      }
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  },
  
  // ミックスパターン（コンパクト版）
  {
    name: 'mix_pattern',
    difficulty: 4,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // 障害物と落とし穴の組み合わせ
      if (Math.random() < 0.5) {
        // 落とし穴→障害物
        pits.push({
          x: startX + 50,
          width: random(40, 60),
          type: 'normal' as const
        });
        
        const obstacleType = randomChoice(['tall', 'spike'] as const);
        const config = obstacleTypes[obstacleType];
        const height = getRandomHeight(obstacleType);
        obstacles.push({
          x: startX + 180,
          y: GAME_CONSTANTS.GROUND_Y - height,
          width: config.width,
          height: height,
          type: obstacleType
        });
      } else {
        // 障害物→落とし穴
        const obstacleType = randomChoice(['normal', 'wide'] as const);
        const config = obstacleTypes[obstacleType];
        const height = getRandomHeight(obstacleType);
        obstacles.push({
          x: startX + 50,
          y: GAME_CONSTANTS.GROUND_Y - height,
          width: config.width,
          height: height,
          type: obstacleType
        });
        
        pits.push({
          x: startX + 200,
          width: random(50, 70),
          type: 'normal' as const
        });
      }
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  },
  
  // スパイクパターン（コンパクト版）
  {
    name: 'spike_pattern',
    difficulty: 5,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // 2-3個のスパイク
      const numSpikes = randomInt(2, 3);
      for (let i = 0; i < numSpikes; i++) {
        const height = getRandomHeight('spike');
        obstacles.push({
          x: startX + 50 + i * 140,
          y: GAME_CONSTANTS.GROUND_Y - height,
          width: obstacleTypes.spike.width,
          height: height,
          type: 'spike' as const
        });
      }
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  },
  
  // 大ジャンプ（コンパクト版）
  {
    name: 'big_jump',
    difficulty: 6,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // 大きな落とし穴
      pits.push({
        x: startX + 100,
        width: random(80, 110),
        type: 'wide' as const
      });
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  },
  
  // ランダムカオス
  {
    name: 'random_chaos',
    difficulty: 7,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // 3-4個の要素をランダムに配置
      const numElements = randomInt(3, 4);
      const positions = Array.from({ length: numElements }, (_, i) => 
        startX + 50 + i * 100 + random(-20, 20)
      ).sort((a, b) => a - b);
      
      positions.forEach((x) => {
        if (Math.random() < 0.6) {
          // 障害物
          const obstacleType = randomChoice(['normal', 'tall', 'wide', 'spike'] as const);
          const config = obstacleTypes[obstacleType];
          const height = getRandomHeight(obstacleType);
          
          obstacles.push({
            x,
            y: GAME_CONSTANTS.GROUND_Y - height,
            width: config.width,
            height: height,
            type: obstacleType
          });
        } else {
          // 落とし穴
          pits.push({
            x,
            width: random(40, 65),
            type: 'normal' as const
          });
        }
      });
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  },
  
  // 階段パターン
  {
    name: 'staircase',
    difficulty: 4,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // 階段状の障害物配置（コンパクト）
      const steps = randomInt(2, 3);
      const stepWidth = 80;
      
      for (let i = 0; i < steps; i++) {
        const baseHeight = getRandomHeight('normal');
        const height = baseHeight + i * 15; // 階段状に増加
        obstacles.push({
          x: startX + 50 + i * stepWidth,
          y: GAME_CONSTANTS.GROUND_Y - height,
          width: 30,
          height: height,
          type: 'normal' as const
        });
      }
      
      // 落とし穴を追加
      if (Math.random() < 0.5) {
        pits.push({
          x: startX + 50 + steps * stepWidth,
          width: random(50, 70),
          type: 'normal' as const
        });
      }
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  },
  
  // ジグザグパターン
  {
    name: 'zigzag',
    difficulty: 5,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // ジグザグに配置（コンパクト）
      for (let i = 0; i < 3; i++) {
        if (i % 2 === 0) {
          // 偶数: 障害物
          const types = ['normal', 'tall', 'spike'] as const;
          const type = randomChoice(types);
          const config = obstacleTypes[type];
          const height = getRandomHeight(type);
          
          obstacles.push({
            x: startX + 50 + i * 120,
            y: GAME_CONSTANTS.GROUND_Y - height,
            width: config.width,
            height: height,
            type
          });
        } else {
          // 奇数: 落とし穴
          pits.push({
            x: startX + 50 + i * 120,
            width: random(50, 70),
            type: 'normal' as const
          });
        }
      }
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  },
  
  // トンネルパターン
  {
    name: 'tunnel',
    difficulty: 6,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // トンネル風配置（コンパクト）
      const tunnelLength = 2;
      
      for (let i = 0; i < tunnelLength; i++) {
        // 下の障害物
        const height = getRandomHeight('wide');
        obstacles.push({
          x: startX + 50 + i * 150,
          y: GAME_CONSTANTS.GROUND_Y - height,
          width: 40,
          height: height,
          type: 'wide' as const
        });
      }
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  },
  
  // リズムパターン
  {
    name: 'rhythm',
    difficulty: 5,
    generator: (startX, theme) => {
      const obstacles: StageChunk['obstacles'] = [];
      const pits: StageChunk['pits'] = [];
      
      // リズミカルな配置（コンパクト）
      const pattern = [60, 100, 60];
      let currentX = startX + 50;
      
      pattern.forEach((spacing, i) => {
        if (Math.random() < 0.7) {
          const types = i % 2 === 0 ? ['spike', 'tall'] : ['normal', 'wide'];
          const type = randomChoice(types as ('normal' | 'tall' | 'wide' | 'spike')[]);
          const config = obstacleTypes[type];
          const height = getRandomHeight(type);
          
          obstacles.push({
            x: currentX,
            y: GAME_CONSTANTS.GROUND_Y - height,
            width: config.width,
            height: height,
            type
          });
        } else {
          pits.push({
            x: currentX,
            width: random(40, 60),
            type: 'normal' as const
          });
        }
        
        currentX += spacing;
      });
      
      return {
        obstacles,
        pits,
        backgroundElements: generateBackgroundElements(startX, theme),
        theme
      };
    }
  }
];

// ステージ生成器クラス
export class StageGenerator {
  private currentThemeIndex = 0;
  private chunksInCurrentTheme = 0;
  private readonly chunksPerTheme = GAME_CONSTANTS.CHUNKS_PER_THEME;
  private lastThemeChangeChunk = -1;
  
  generateChunk(startX: number, difficulty: number): StageChunk & { themeChanged: boolean } {
    // 難易度に基づいてパターンを選択
    const availablePatterns = stagePatterns.filter(p => p.difficulty <= difficulty);
    const pattern = randomChoice(availablePatterns);
    
    let themeChanged = false;
    
    // テーマの管理
    if (this.chunksInCurrentTheme >= this.chunksPerTheme) {
      this.currentThemeIndex = (this.currentThemeIndex + 1) % THEMES.length;
      this.chunksInCurrentTheme = 0;
      themeChanged = true;
    }
    
    const currentTheme = THEMES[this.currentThemeIndex];
    this.chunksInCurrentTheme++;
    
    const chunk = pattern.generator(startX, currentTheme);
    return { ...chunk, themeChanged };
  }
  
  getCurrentTheme(): StageChunk['theme'] {
    return THEMES[this.currentThemeIndex];
  }
  
  getDifficulty(score: number): number {
    // スコアに基づいて難易度を計算（1-7の範囲）
    return Math.min(7, Math.floor(score / GAME_CONSTANTS.SCORE_SPEED_INCREMENT) + 1);
  }
}