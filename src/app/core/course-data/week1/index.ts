import type { CourseWeek } from '../types';
import { WEEK1_DAY1 } from './day1/index';
import { WEEK1_DAY2 } from './day2';
import { WEEK1_DAY3 } from './day3';
import { WEEK1_DAY4 } from './day4';
import { WEEK1_DAY5 } from './day5/index';

export const WEEK1: CourseWeek = {
  id: 1,
  title: 'Angular Fundamentals',
  theme: 'Components, dependency injection & change detection',
  days: [WEEK1_DAY1, WEEK1_DAY2, WEEK1_DAY3, WEEK1_DAY4, WEEK1_DAY5],
};
