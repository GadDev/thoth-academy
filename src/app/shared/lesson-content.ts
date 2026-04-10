import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import type { LessonBlock } from '../core/course-data';

@Component({
  selector: 'app-lesson-content',
  imports: [TranslocoPipe],
  templateUrl: './lesson-content.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonContent {
  readonly blocks = input<LessonBlock[]>([]);
}
