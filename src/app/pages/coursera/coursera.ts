import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Home } from './components/home/home';
import { CurrencyPipe } from '@angular/common';
import { CustompipePipe } from './custom.pipe';
import { ReversePipe } from './reverse.pipe';
import { TranslocoPipe } from '@jsverse/transloco';

const COURSES = [
  {
    id: 1,
    title: 'Getting Started with Angular',
    platform: 'Coursera',
    instructor: 'Edureka',
    totalWeeks: 4,
    level: 'Beginner',
    totalHours: 12,
    percentageCompleted: 57,
    url: 'https://www.coursera.org/learn/getting-started-with-angular/home',
    notes:
      'Getting Started with Angular is a beginner-friendly course that introduces you to the fundamentals of Angular, the powerful open-source framework used to build scalable, modern web applications.',
  },
];

@Component({
  selector: 'app-coursera',
  imports: [Home, CurrencyPipe, CustompipePipe, ReversePipe, TranslocoPipe],
  templateUrl: './coursera.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Coursera {
  title = 'Coursera';
  price = 10;
  readonly courses = signal(COURSES);

  progress(course: (typeof COURSES)[number]) {
    return course.percentageCompleted;
  }
}
