export * from './types';
import { WEEK1 } from './week1/index';
import { WEEK2 } from './week2/index';
import { WEEK3 } from './week3/index';
import { WEEK4 } from './week4/index';
import { WEEK5 } from './week5/index';
import type { CourseWeek } from './types';

export const COURSE_WEEKS: CourseWeek[] = [WEEK1, WEEK2, WEEK3, WEEK4, WEEK5];

export const TOTAL_LESSONS = COURSE_WEEKS.reduce((sum, w) => sum + w.days.length, 0);
