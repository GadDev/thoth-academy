import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { COURSE_WEEKS, TOTAL_LESSONS } from '../../core/course-data';
import { ProgressService } from '../../core/progress.service';

const CIRCUMFERENCE = 2 * Math.PI * 20;

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly progress = inject(ProgressService);

  readonly totalLessons = TOTAL_LESSONS;
  readonly circumference = CIRCUMFERENCE;

  readonly completedLessons = computed(() => this.progress.totalCompleted());
  readonly overallProgress = computed(() =>
    Math.round((this.completedLessons() / this.totalLessons) * 100),
  );
  readonly overallStrokeDashoffset = computed(
    () => CIRCUMFERENCE * (1 - this.overallProgress() / 100),
  );
  readonly streak = computed(() => this.progress.streakDays());

  readonly nextLesson = computed(() => {
    for (const week of COURSE_WEEKS) {
      for (const day of week.days) {
        if (!this.progress.isDayComplete(week.id, day.number)) {
          return {
            weekId: week.id,
            dayNumber: day.number,
            dayTitle: day.title,
            weekTitle: week.title,
          };
        }
      }
    }
    return null;
  });

  readonly weekData = computed(() =>
    COURSE_WEEKS.map((week) => {
      const completed = this.progress.completedCountForWeek(week.id);
      const pct = Math.round((completed / 5) * 100);
      return {
        ...week,
        completedCount: completed,
        strokeDashoffset: CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE,
        dayCompletion: [1, 2, 3, 4, 5].map((n) => ({
          n,
          complete: this.progress.isDayComplete(week.id, n),
        })),
      };
    }),
  );
}
