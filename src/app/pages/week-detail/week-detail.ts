import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  signal,
  ViewChild,
  ElementRef,
  effect,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MonacoEditorModule, NgxEditorModel } from 'ngx-monaco-editor-v2';
import { COURSE_WEEKS } from '../../core/course-data';
import { ProgressService } from '../../core/progress.service';
import { Toast } from '../../shared/toast';
import { LessonContent } from '../../shared/lesson-content';

type Tab = 'lesson' | 'challenge' | 'solution';

@Component({
  selector: 'app-week-detail',
  imports: [RouterLink, MonacoEditorModule, TranslocoPipe, Toast, LessonContent],
  templateUrl: './week-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly progress = inject(ProgressService);

  @ViewChild('dayHeading', { read: ElementRef }) dayHeading?: ElementRef<HTMLHeadingElement>;

  readonly weekId = toSignal(this.route.paramMap.pipe(map((p) => Number(p.get('id') ?? 1))), {
    initialValue: 1,
  });

  readonly week = computed(
    () => COURSE_WEEKS.find((w) => w.id === this.weekId()) ?? COURSE_WEEKS[0],
  );
  readonly activeDay = signal(1);
  readonly activeTab = signal<Tab>('lesson');
  readonly tabs: Tab[] = ['lesson', 'challenge', 'solution'];

  readonly toastMessage = signal('');
  readonly showToast = signal(false);

  constructor() {
    // Move focus to day heading when active day changes
    effect(() => {
      this.activeDay();
      // Reset difficulty selector when switching days
      this.activeDifficulty.set('medium');
      // Use microtask to ensure DOM has updated
      Promise.resolve().then(() => {
        this.dayHeading?.nativeElement.focus();
      });
    });
  }

  // Challenge / Monaco
  readonly activeDifficulty = signal<'easy' | 'medium' | 'hard'>('medium');

  readonly availableDifficulties = computed(() => {
    const day = this.week().days[this.activeDay() - 1];
    return day.challenges?.map((c) => c.difficulty!).filter(Boolean) ?? [];
  });

  readonly activeChallenge = computed(() => {
    const day = this.week().days[this.activeDay() - 1];
    if (day.challenges?.length) {
      return (
        day.challenges.find((c) => c.difficulty === this.activeDifficulty()) ?? day.challenges[0]
      );
    }
    return day.challenge ?? null;
  });

  readonly challengeModel = computed(
    (): NgxEditorModel => ({
      value: this.activeChallenge()?.starterCode ?? '',
      language: 'typescript',
    }),
  );

  readonly solutionModel = computed(
    (): NgxEditorModel => ({
      value: this.activeChallenge()?.solutionCode ?? '',
      language: 'typescript',
    }),
  );

  readonly challengeEditorOptions = {
    theme: 'vs-dark',
    fontSize: 14,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
  };

  readonly solutionEditorOptions = { ...this.challengeEditorOptions, readOnly: true };

  isDayComplete(dayNumber: number): boolean {
    return this.progress.isDayComplete(this.weekId(), dayNumber);
  }

  toggleDay(dayNumber: number): void {
    const wasComplete = this.progress.isDayComplete(this.weekId(), dayNumber);
    this.progress.toggleDay(this.weekId(), dayNumber);

    // Check if week is now complete after marking a day as complete
    if (!wasComplete && this.progress.completedCountForWeek(this.weekId()) === 5) {
      this.showCompletionToast();
    }
  }

  private showCompletionToast(): void {
    const weekNum = this.weekId();
    this.toastMessage.set(`Week ${weekNum} complete! 🎉`);
    this.showToast.set(true);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      this.showToast.set(false);
    }, 3000);
  }

  setTab(tab: Tab): void {
    this.activeTab.set(tab);
  }
}
