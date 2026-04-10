import type { CourseWeek } from '../types';
import { WEEK3_DAY1 } from './day1';
import { WEEK3_DAY2 } from './day2';
import { WEEK3_DAY3 } from './day3';
import { WEEK3_DAY4 } from './day4';
import { WEEK3_DAY5 } from './day5/index';

export const WEEK3: CourseWeek = {
  id: 3,
  title: 'Forms, Pipes & Directives',
  theme: 'Reactive forms, custom pipes & attribute directives',
  days: [WEEK3_DAY1, WEEK3_DAY2, WEEK3_DAY3, WEEK3_DAY4, WEEK3_DAY5],
};
