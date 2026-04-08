import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MonacoEditorModule, NgxEditorModel } from 'ngx-monaco-editor-v2';
import { COURSE_WEEKS } from '../../data/course-data';
import { ProgressService } from '../../services/progress.service';

type Tab = 'lesson' | 'challenge' | 'solution';

@Component({
  selector: 'app-week-detail',
  imports: [RouterLink, MonacoEditorModule],
  templateUrl: './week-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly progress = inject(ProgressService);
  readonly weekId = toSignal(this.route.paramMap.pipe(map((p) => Number(p.get('id') ?? 1))), {
    initialValue: 1,
  });

  readonly week = computed(
    () => COURSE_WEEKS.find((w) => w.id === this.weekId()) ?? COURSE_WEEKS[0],
  );
  readonly activeDay = signal(1);
  readonly activeTab = signal<Tab>('lesson');
  readonly tabs: Tab[] = ['lesson', 'challenge', 'solution'];

  // Challenge / Monaco
  readonly activeChallenge = computed(() => {
    const day = this.week().days[this.activeDay() - 1];
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
    this.progress.toggleDay(this.weekId(), dayNumber);
  }

  setTab(tab: Tab): void {
    this.activeTab.set(tab);
  }
}
