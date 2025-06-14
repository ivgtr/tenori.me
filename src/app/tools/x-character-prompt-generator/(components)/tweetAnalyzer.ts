export interface TweetData {
  tweet: string;
  username?: string;
  reply_to?: string[];
  retweet?: boolean;
  hashtags?: string[];
  time?: string;
  likes_count?: number;
  retweets_count?: number;
  urls?: string[];
  photos?: string[];
}

export interface AnalysisResult {
  tweetCount: number;
  topWords: string[];
  topEmojis: string[];
  topMentions: string[];
  topExpressions: string[];
  topEndings: string[];
  avgTweetLength: number;
  questionRate: number;
  exclamationRate: number;
  linkRate: number;
  photoRate?: number;
  avgLikes?: number;
  avgRetweets?: number;
  mostActiveHours?: number[];
  sampleTweets: string[];
  hashtags?: string[];
  emotionalTone: {
    positive: number;
    negative: number;
  };
  topics: {
    daily: number;
    work: number;
    gratitude: number;
    apology: number;
  };
}

// 日本語の助詞や接続詞などを除外するリスト
const JAPANESE_STOPWORDS = [
  'から', 'まで', 'より', 'ので', 'けど', 'でも', 'しか', 'だけ', 'など', 'とか',
  'って', 'という', 'といった', 'において', 'について', 'に対して', 'として',
  'によって', 'のため', 'のような', 'こと', 'もの', 'とき', 'ところ', 'ため',
  'わけ', 'はず', 'つもり', 'ほう', 'かた', 'さん', 'くん', 'ちゃん', 'です',
  'ます', 'でした', 'ました', 'である', 'だった', 'している', 'されて', 'になる', 'となる'
];

// 英語の一般的すぎる単語を除外するリスト
const ENGLISH_STOPWORDS = [
  'this', 'that', 'with', 'from', 'have', 'been', 'will', 'your', 'they',
  'what', 'when', 'where', 'which', 'their', 'there', 'these', 'those',
  'then', 'than', 'them', 'very', 'much', 'some', 'only', 'just', 'like',
  'about', 'after', 'before', 'between'
];

export function analyzeTweetsFromJSON(tweetsArray: TweetData[]): AnalysisResult {
  // リプライとリツイートを除外
  const originalTweets = tweetsArray.filter(t => 
    (!t.reply_to || t.reply_to.length === 0) && !t.retweet
  );
  
  const allTweets = originalTweets.map(t => t.tweet);
  
  // 分析用の変数
  const wordFreq: Record<string, number> = {};
  const nounFreq: Record<string, number> = {};
  const verbFreq: Record<string, number> = {};
  const adjectiveFreq: Record<string, number> = {};
  const emojis: string[] = [];
  const hashtags: string[] = [];
  const mentionFreq: Record<string, number> = {};
  const tweetTimes: number[] = [];
  const allEndings: string[] = [];
  const expressions: string[] = [];
  
  originalTweets.forEach(tweetObj => {
    const tweet = tweetObj.tweet;
    
    // URLとメンションを除去してから単語分析
    const tweetCleaned = tweet
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/@\w+/g, '');
    
    // 日本語の意味のある単語を抽出（名詞、動詞、形容詞）
    // 名詞パターン（2-8文字の漢字・ひらがな・カタカナの組み合わせ）
    const nounMatches = tweetCleaned.match(/[\u4E00-\u9FAF\u3040-\u309F\u30A0-\u30FF]{2,8}/g) || [];
    nounMatches.forEach(word => {
      if (!JAPANESE_STOPWORDS.includes(word)) {
        nounFreq[word] = (nounFreq[word] || 0) + 1;
      }
    });
    
    // 動詞パターン（〜する、〜った、〜ます等）
    const verbMatches = tweetCleaned.match(/[\u4E00-\u9FAF\u3040-\u309F\u30A0-\u30FF]+(する|した|して|され|った|っている|ます|ました|ません|ない|たい|れる|られる)/g) || [];
    verbMatches.forEach(word => {
      verbFreq[word] = (verbFreq[word] || 0) + 1;
    });
    
    // 形容詞パターン（〜い、〜しい等）
    const adjMatches = tweetCleaned.match(/[\u4E00-\u9FAF\u3040-\u309F\u30A0-\u30FF]+(しい|ない|たい|よい|すごい|やばい)/g) || [];
    adjMatches.forEach(word => {
      adjectiveFreq[word] = (adjectiveFreq[word] || 0) + 1;
    });
    
    // 英単語（意味のあるものだけ）
    const words = tweetCleaned.toLowerCase().match(/\b[a-zA-Z]{4,}\b/g) || [];
    words.forEach(word => {
      if (!ENGLISH_STOPWORDS.includes(word)) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });
    
    // 絵文字抽出
    const emojiMatches = tweet.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu) || [];
    emojis.push(...emojiMatches);
    
    // ハッシュタグ
    hashtags.push(...(tweetObj.hashtags || []));
    
    // メンション分析
    const mentionMatches = tweet.match(/@\w+/g) || [];
    mentionMatches.forEach(mention => {
      mentionFreq[mention] = (mentionFreq[mention] || 0) + 1;
    });
    
    // 投稿時間
    if (tweetObj.time) {
      const hour = parseInt(tweetObj.time.split(':')[0]);
      tweetTimes.push(hour);
    }
    
    // 文末表現の抽出（句読点を含む最後の5-15文字）
    const endingMatch = tweet.match(/[。！？!?、,].{0,10}$/);
    if (endingMatch) {
      allEndings.push(endingMatch[0]);
    } else {
      const ending = tweet.slice(-10).trim();
      if (ending) allEndings.push(ending);
    }
    
    // 特徴的な表現の抽出（2-6文字の繰り返し使用される表現）
    const jpMatches = tweetCleaned.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]{2,6}/g) || [];
    expressions.push(...jpMatches);
  });
  
  // 意味のある単語を組み合わせてトップ25を選出
  const allMeaningfulWords = [
    ...Object.entries(nounFreq).filter(([word, count]) => count > 1 && word.length > 1),
    ...Object.entries(verbFreq).filter(([word, count]) => count > 1),
    ...Object.entries(adjectiveFreq).filter(([word, count]) => count > 1),
    ...Object.entries(wordFreq).filter(([word, count]) => count > 1)
  ];
  
  const topWords = allMeaningfulWords
    .sort(([, a], [, b]) => b - a)
    .slice(0, 25)
    .map(([word]) => word);
  
  // よく使う絵文字トップ10
  const emojiFreq: Record<string, number> = {};
  emojis.forEach(emoji => {
    emojiFreq[emoji] = (emojiFreq[emoji] || 0) + 1;
  });
  const topEmojis = Object.entries(emojiFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([emoji]) => emoji);
  
  // よくメンションするユーザートップ5
  const topMentions = Object.entries(mentionFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([mention]) => mention);
  
  // 特徴的な表現トップ15（バランスよく）
  const expressionFreq: Record<string, number> = {};
  expressions.forEach(exp => {
    expressionFreq[exp] = (expressionFreq[exp] || 0) + 1;
  });
  const topExpressions = Object.entries(expressionFreq)
    .filter(([exp, count]) => count > 2 && exp.length > 2) // 3回以上使われた3文字以上の表現
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .map(([exp]) => exp);
  
  // 文末表現パターン（ランダムに10個選択）
  const uniqueEndings = [...new Set(allEndings)];
  const randomEndings: string[] = [];
  const endingsCopy = [...uniqueEndings];
  for (let i = 0; i < Math.min(10, endingsCopy.length); i++) {
    const randomIndex = Math.floor(Math.random() * endingsCopy.length);
    randomEndings.push(endingsCopy[randomIndex]);
    endingsCopy.splice(randomIndex, 1);
  }
  
  // サンプルツイートをバランスよく選択（時期を分散）
  const sampleTweets: string[] = [];
  const tweetCount = allTweets.length;
  const sampleCount = Math.min(25, tweetCount); // 最大25個
  
  if (tweetCount <= sampleCount) {
    sampleTweets.push(...allTweets);
  } else {
    // 全体を均等に分割してサンプリング
    const interval = Math.floor(tweetCount / sampleCount);
    for (let i = 0; i < sampleCount; i++) {
      const index = i * interval + Math.floor(Math.random() * interval);
      if (index < tweetCount) {
        sampleTweets.push(allTweets[index]);
      }
    }
  }
  
  // エンゲージメント分析
  const totalLikes = originalTweets.reduce((sum, t) => sum + (t.likes_count || 0), 0);
  const totalRetweets = originalTweets.reduce((sum, t) => sum + (t.retweets_count || 0), 0);
  const avgLikes = Math.round(totalLikes / originalTweets.length);
  const avgRetweets = Math.round(totalRetweets / originalTweets.length);
  
  // 投稿時間帯分析
  const timeFreq: Record<number, number> = {};
  tweetTimes.forEach(hour => {
    timeFreq[hour] = (timeFreq[hour] || 0) + 1;
  });
  const mostActiveHours = Object.entries(timeFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([hour]) => parseInt(hour));
  
  // 文体の特徴を分析
  const avgTweetLength = allTweets.reduce((sum, tweet) => sum + tweet.length, 0) / allTweets.length;
  const hasQuestions = allTweets.filter(tweet => tweet.includes('?') || tweet.includes('？')).length;
  const hasExclamations = allTweets.filter(tweet => tweet.includes('!') || tweet.includes('！')).length;
  const hasLinks = originalTweets.filter(t => t.urls && t.urls.length > 0).length;
  const hasPhotos = originalTweets.filter(t => t.photos && t.photos.length > 0).length;
  
  // 感情分析（拡張版）
  const positiveWords = allTweets.filter(tweet => 
    tweet.includes('嬉しい') || tweet.includes('楽しい') || tweet.includes('ありがとう') || 
    tweet.includes('好き') || tweet.includes('素敵') || tweet.includes('幸せ') ||
    tweet.includes('最高') || tweet.includes('良い') || tweet.includes('いい') ||
    tweet.includes('大好き') || tweet.includes('素晴らしい')
  ).length;
  const negativeWords = allTweets.filter(tweet => 
    tweet.includes('悲しい') || tweet.includes('辛い') || tweet.includes('ごめん') || 
    tweet.includes('申し訳') || tweet.includes('心配') || tweet.includes('不安') ||
    tweet.includes('疲れ') || tweet.includes('大変') || tweet.includes('困っ')
  ).length;
  
  // トピック分析
  const topics = {
    daily: allTweets.filter(t => t.includes('今日') || t.includes('明日') || t.includes('昨日') || t.includes('朝') || t.includes('夜')).length,
    work: allTweets.filter(t => t.includes('仕事') || t.includes('配信') || t.includes('作業') || t.includes('会議') || t.includes('打ち合わせ')).length,
    gratitude: allTweets.filter(t => t.includes('ありがとう') || t.includes('感謝') || t.includes('ありがと')).length,
    apology: allTweets.filter(t => t.includes('ごめん') || t.includes('すみません') || t.includes('申し訳') || t.includes('すまん')).length
  };
  
  return {
    tweetCount: originalTweets.length,
    topWords,
    topEmojis,
    topMentions,
    topExpressions,
    topEndings: randomEndings,
    avgTweetLength: Math.round(avgTweetLength),
    questionRate: Math.round((hasQuestions / allTweets.length) * 100),
    exclamationRate: Math.round((hasExclamations / allTweets.length) * 100),
    linkRate: Math.round((hasLinks / originalTweets.length) * 100),
    photoRate: Math.round((hasPhotos / originalTweets.length) * 100),
    avgLikes,
    avgRetweets,
    mostActiveHours: mostActiveHours.length > 0 ? mostActiveHours : undefined,
    sampleTweets,
    hashtags: [...new Set(hashtags)].slice(0, 5),
    emotionalTone: {
      positive: Math.round((positiveWords / allTweets.length) * 100),
      negative: Math.round((negativeWords / allTweets.length) * 100)
    },
    topics
  };
}

export function analyzeTweetsFromText(tweetsText: string): AnalysisResult {
  const lines = tweetsText.split('\n').filter(line => line.trim());
  
  // 分析用の変数
  const wordFreq: Record<string, number> = {};
  const nounFreq: Record<string, number> = {};
  const verbFreq: Record<string, number> = {};
  const adjectiveFreq: Record<string, number> = {};
  const emojis: string[] = [];
  const hashtags: string[] = [];
  const mentionFreq: Record<string, number> = {};
  const allEndings: string[] = [];
  const expressions: string[] = [];
  
  lines.forEach(tweet => {
    // URLとメンションを除去してから単語分析
    const tweetCleaned = tweet
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/@\w+/g, '');
    
    // 日本語の意味のある単語を抽出
    // 名詞パターン
    const nounMatches = tweetCleaned.match(/[\u4E00-\u9FAF\u3040-\u309F\u30A0-\u30FF]{2,8}/g) || [];
    nounMatches.forEach(word => {
      if (!JAPANESE_STOPWORDS.includes(word)) {
        nounFreq[word] = (nounFreq[word] || 0) + 1;
      }
    });
    
    // 動詞パターン
    const verbMatches = tweetCleaned.match(/[\u4E00-\u9FAF\u3040-\u309F\u30A0-\u30FF]+(する|した|して|され|った|っている|ます|ました|ません|ない|たい|れる|られる)/g) || [];
    verbMatches.forEach(word => {
      verbFreq[word] = (verbFreq[word] || 0) + 1;
    });
    
    // 形容詞パターン
    const adjMatches = tweetCleaned.match(/[\u4E00-\u9FAF\u3040-\u309F\u30A0-\u30FF]+(しい|ない|たい|よい|すごい|やばい)/g) || [];
    adjMatches.forEach(word => {
      adjectiveFreq[word] = (adjectiveFreq[word] || 0) + 1;
    });
    
    // 英単語
    const words = tweetCleaned.toLowerCase().match(/\b[a-zA-Z]{4,}\b/g) || [];
    words.forEach(word => {
      if (!ENGLISH_STOPWORDS.includes(word)) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });
    
    // 絵文字抽出
    const emojiMatches = tweet.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu) || [];
    emojis.push(...emojiMatches);
    
    // ハッシュタグ抽出
    const hashtagMatches = tweet.match(/#\w+/g) || [];
    hashtags.push(...hashtagMatches);
    
    // メンション抽出
    const mentionMatches = tweet.match(/@\w+/g) || [];
    mentionMatches.forEach(mention => {
      mentionFreq[mention] = (mentionFreq[mention] || 0) + 1;
    });
    
    // 文末表現の抽出
    const endingMatch = tweet.match(/[。！？!?、,].{0,10}$/);
    if (endingMatch) {
      allEndings.push(endingMatch[0]);
    } else {
      const ending = tweet.slice(-10).trim();
      if (ending) allEndings.push(ending);
    }
    
    // 特徴的な表現の抽出（2-6文字の繰り返し使用される表現）
    const jpMatches = tweetCleaned.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]{2,6}/g) || [];
    expressions.push(...jpMatches);
  });
  
  // 意味のある単語を組み合わせてトップ25を選出
  const allMeaningfulWords = [
    ...Object.entries(nounFreq).filter(([word, count]) => count > 1 && word.length > 1),
    ...Object.entries(verbFreq).filter(([word, count]) => count > 1),
    ...Object.entries(adjectiveFreq).filter(([word, count]) => count > 1),
    ...Object.entries(wordFreq).filter(([word, count]) => count > 1)
  ];
  
  const topWords = allMeaningfulWords
    .sort(([, a], [, b]) => b - a)
    .slice(0, 25)
    .map(([word]) => word);
  
  // よく使う絵文字トップ10
  const emojiFreq: Record<string, number> = {};
  emojis.forEach(emoji => {
    emojiFreq[emoji] = (emojiFreq[emoji] || 0) + 1;
  });
  const topEmojis = Object.entries(emojiFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([emoji]) => emoji);
  
  // よくメンションするユーザートップ5
  const topMentions = Object.entries(mentionFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([mention]) => mention);
  
  // 特徴的な表現トップ15
  const expressionFreq: Record<string, number> = {};
  expressions.forEach(exp => {
    expressionFreq[exp] = (expressionFreq[exp] || 0) + 1;
  });
  const topExpressions = Object.entries(expressionFreq)
    .filter(([exp, count]) => count > 2 && exp.length > 2)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 15)
    .map(([exp]) => exp);
  
  // 文末表現パターン（ランダムに10個選択）
  const uniqueEndings = [...new Set(allEndings)];
  const randomEndings: string[] = [];
  const endingsCopy = [...uniqueEndings];
  for (let i = 0; i < Math.min(10, endingsCopy.length); i++) {
    const randomIndex = Math.floor(Math.random() * endingsCopy.length);
    randomEndings.push(endingsCopy[randomIndex]);
    endingsCopy.splice(randomIndex, 1);
  }
  
  // サンプルツイートをバランスよく選択
  const sampleTweets: string[] = [];
  const tweetCount = lines.length;
  const sampleCount = Math.min(25, tweetCount);
  
  if (tweetCount <= sampleCount) {
    sampleTweets.push(...lines);
  } else {
    const interval = Math.floor(tweetCount / sampleCount);
    for (let i = 0; i < sampleCount; i++) {
      const index = i * interval + Math.floor(Math.random() * interval);
      if (index < tweetCount) {
        sampleTweets.push(lines[index]);
      }
    }
  }
  
  // 文体の特徴を分析
  const avgTweetLength = lines.reduce((sum, tweet) => sum + tweet.length, 0) / lines.length;
  const hasQuestions = lines.filter(tweet => tweet.includes('?') || tweet.includes('？')).length;
  const hasExclamations = lines.filter(tweet => tweet.includes('!') || tweet.includes('！')).length;
  const hasLinks = lines.filter(tweet => tweet.includes('http')).length;
  
  // 感情分析（拡張版）
  const positiveWords = lines.filter(tweet => 
    tweet.includes('嬉しい') || tweet.includes('楽しい') || tweet.includes('ありがとう') || 
    tweet.includes('好き') || tweet.includes('素敵') || tweet.includes('幸せ') ||
    tweet.includes('最高') || tweet.includes('良い') || tweet.includes('いい') ||
    tweet.includes('大好き') || tweet.includes('素晴らしい')
  ).length;
  const negativeWords = lines.filter(tweet => 
    tweet.includes('悲しい') || tweet.includes('辛い') || tweet.includes('ごめん') || 
    tweet.includes('申し訳') || tweet.includes('心配') || tweet.includes('不安') ||
    tweet.includes('疲れ') || tweet.includes('大変') || tweet.includes('困っ')
  ).length;
  
  // トピック分析
  const topics = {
    daily: lines.filter(t => t.includes('今日') || t.includes('明日') || t.includes('昨日') || t.includes('朝') || t.includes('夜')).length,
    work: lines.filter(t => t.includes('仕事') || t.includes('配信') || t.includes('作業') || t.includes('会議') || t.includes('打ち合わせ')).length,
    gratitude: lines.filter(t => t.includes('ありがとう') || t.includes('感謝') || t.includes('ありがと')).length,
    apology: lines.filter(t => t.includes('ごめん') || t.includes('すみません') || t.includes('申し訳') || t.includes('すまん')).length
  };
  
  return {
    tweetCount: lines.length,
    topWords,
    topEmojis,
    topMentions,
    topExpressions,
    topEndings: randomEndings,
    avgTweetLength: Math.round(avgTweetLength),
    questionRate: Math.round((hasQuestions / lines.length) * 100),
    exclamationRate: Math.round((hasExclamations / lines.length) * 100),
    linkRate: Math.round((hasLinks / lines.length) * 100),
    sampleTweets,
    emotionalTone: {
      positive: Math.round((positiveWords / lines.length) * 100),
      negative: Math.round((negativeWords / lines.length) * 100)
    },
    topics
  };
}