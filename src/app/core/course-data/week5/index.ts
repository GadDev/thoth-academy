import type { CourseWeek } from '../types';
import { WEEK5_DAY1 } from './day1';
import { WEEK5_DAY2 } from './day2';
import { WEEK5_DAY3 } from './day3';
import { WEEK5_DAY4 } from './day4';
import { WEEK5_DAY5 } from './day5/index';

export const WEEK5: CourseWeek = {
  id: 5,
  title: 'Exam Prep',
  theme: 'Testing, weak spot repair & certification.dev',
  days: [WEEK5_DAY1, WEEK5_DAY2, WEEK5_DAY3, WEEK5_DAY4, WEEK5_DAY5],
};
