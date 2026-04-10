export interface CourseChallenge {
  difficulty?: 'easy' | 'medium' | 'hard';
  description: string;
  starterCode: string;
  solutionCode: string;
}

// ─── Lesson content blocks ──────────────────────────────────────────────────

export interface LessonHeadingBlock {
  type: 'heading';
  key: string;
}

export interface LessonParagraphBlock {
  type: 'paragraph';
  key: string;
}

export interface LessonCodeBlock {
  type: 'code';
  code: string;
  language?: string;
  captionKey?: string;
}

export interface LessonTableBlock {
  type: 'table';
  captionKey?: string;
  headers: string[];
  rows: string[][];
}

export interface LessonListBlock {
  type: 'list';
  itemKeys: string[];
}

export interface LessonQABlock {
  type: 'qa';
  items: { questionKey: string; answerKey: string }[];
}

export type LessonBlock =
  | LessonHeadingBlock
  | LessonParagraphBlock
  | LessonCodeBlock
  | LessonTableBlock
  | LessonListBlock
  | LessonQABlock;

// ────────────────────────────────────────────────────────────────────────────

export interface CourseDay {
  number: number;
  title: string;
  summary: string;
  pdfUrl?: string;
  challenge?: CourseChallenge;
  challenges?: CourseChallenge[];
  blocks?: LessonBlock[];
}

export interface CourseWeek {
  id: number;
  title: string;
  theme: string;
  days: CourseDay[];
}
