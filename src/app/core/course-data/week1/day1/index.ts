import type { CourseDay } from '../../types';
import { WEEK1_DAY1_BLOCKS } from './blocks';
import { WEEK1_DAY1_CHALLENGE_EASY } from './challenge-easy';
import { WEEK1_DAY1_CHALLENGE_MEDIUM } from './challenge-medium';
import { WEEK1_DAY1_CHALLENGE_HARD } from './challenge-hard';

export const WEEK1_DAY1: CourseDay = {
  number: 1,
  title: 'Components & Template Syntax',
  summary: 'Standalone components, templates, built-in control flow',
  pdfUrl: 'pdfs/week1-day1-components-template-syntax.pdf',
  blocks: WEEK1_DAY1_BLOCKS,
  challenges: [WEEK1_DAY1_CHALLENGE_EASY, WEEK1_DAY1_CHALLENGE_MEDIUM, WEEK1_DAY1_CHALLENGE_HARD],
};
