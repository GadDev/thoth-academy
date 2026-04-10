import type { CourseWeek } from '../types';
import { WEEK4_DAY1 } from './day1';
import { WEEK4_DAY2 } from './day2';
import { WEEK4_DAY3 } from './day3';
import { WEEK4_DAY4 } from './day4';
import { WEEK4_DAY5 } from './day5/index';

export const WEEK4: CourseWeek = {
  id: 4,
  title: 'Architecture & Advanced Angular',
  theme: 'App design, SSR, SSG & performance',
  days: [WEEK4_DAY1, WEEK4_DAY2, WEEK4_DAY3, WEEK4_DAY4, WEEK4_DAY5],
};
