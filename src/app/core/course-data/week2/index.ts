import type { CourseWeek } from '../types';
import { WEEK2_DAY1 } from './day1';
import { WEEK2_DAY2 } from './day2';
import { WEEK2_DAY3 } from './day3';
import { WEEK2_DAY4 } from './day4';
import { WEEK2_DAY5 } from './day5/index';

export const WEEK2: CourseWeek = {
  id: 2,
  title: 'Routing, RxJS & HTTP',
  theme: 'Router, lazy loading, observables & HttpClient',
  days: [WEEK2_DAY1, WEEK2_DAY2, WEEK2_DAY3, WEEK2_DAY4, WEEK2_DAY5],
};
