import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';

interface WorkingRule {
  icon: string;
  text: string;
}

interface SessionFormat {
  icon: string;
  title: string;
  trigger: string;
  steps: string[];
}

interface WeekDay {
  name: string;
  hard?: string;
  points: string[];
}

interface Week {
  number: number;
  title: string;
  theme: string;
  days: WeekDay[];
}

interface CourseWeekOverview {
  number: number;
  theme: string;
  laneMix: string;
  friday: string;
}

interface SetupStep {
  number: number;
  title: string;
  description: string;
}

interface RoutineBlock {
  time: string;
  title: string;
  icon: string;
  steps: string[];
}

interface PowerTip {
  icon: string;
  title: string;
  description: string;
}

interface PdfEntry {
  file: string;
  upload: boolean;
  note: string;
}

@Component({
  selector: 'app-guide',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './guide.html',
  styleUrl: './guide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Guide {
  readonly jumpLinks: { id: string; labelKey: string }[] = [
    { id: 'overview', labelKey: 'guide.jump.overview' },
    { id: 'profile', labelKey: 'guide.jump.profile' },
    { id: 'setup', labelKey: 'guide.jump.setup' },
    { id: 'working-rules', labelKey: 'guide.jump.workingRules' },
    { id: 'sessions', labelKey: 'guide.jump.sessions' },
    { id: 'routine', labelKey: 'guide.jump.routine' },
    { id: 'schedule', labelKey: 'guide.jump.schedule' },
    { id: 'tips', labelKey: 'guide.jump.tips' },
    { id: 'instructions', labelKey: 'guide.jump.instructions' },
    { id: 'pdfs', labelKey: 'guide.jump.pdfs' },
    { id: 'start', labelKey: 'guide.jump.start' },
    { id: 'progress', labelKey: 'guide.jump.progress' },
  ];

  readonly workingRules: WorkingRule[] = [
    { icon: '⚛️', text: 'guide.workingRules.rule1' },
    { icon: '🚩', text: 'guide.workingRules.rule2' },
    { icon: '🔍', text: 'guide.workingRules.rule3' },
    { icon: '⚠️', text: 'guide.workingRules.rule4' },
    { icon: '📄', text: 'guide.workingRules.rule5' },
  ];

  readonly sessionFormats: SessionFormat[] = [
    {
      icon: '📖',
      title: 'guide.sessions.teaching.title',
      trigger: 'guide.sessions.teaching.trigger',
      steps: [
        'guide.sessions.teaching.step1',
        'guide.sessions.teaching.step2',
        'guide.sessions.teaching.step3',
        'guide.sessions.teaching.step4',
      ],
    },
    {
      icon: '🧪',
      title: 'guide.sessions.quiz.title',
      trigger: 'guide.sessions.quiz.trigger',
      steps: ['guide.sessions.quiz.step1', 'guide.sessions.quiz.step2'],
    },
    {
      icon: '💻',
      title: 'guide.sessions.coding.title',
      trigger: 'guide.sessions.coding.trigger',
      steps: [
        'guide.sessions.coding.step1',
        'guide.sessions.coding.step2',
        'guide.sessions.coding.step3',
      ],
    },
    {
      icon: '🎯',
      title: 'guide.sessions.weakSpot.title',
      trigger: 'guide.sessions.weakSpot.trigger',
      steps: ['guide.sessions.weakSpot.step1', 'guide.sessions.weakSpot.step2'],
    },
    {
      icon: '📝',
      title: 'guide.sessions.mockExam.title',
      trigger: 'guide.sessions.mockExam.trigger',
      steps: [
        'guide.sessions.mockExam.step1',
        'guide.sessions.mockExam.step2',
        'guide.sessions.mockExam.step3',
      ],
    },
  ];

  readonly weeks: Week[] = [
    {
      number: 1,
      title: 'guide.weeks.w1.title',
      theme: 'guide.weeks.w1.theme',
      days: [
        {
          name: 'guide.weeks.w1.d1.name',
          hard: 'guide.weeks.w1.d1.hard',
          points: [
            'guide.weeks.w1.d1.p1',
            'guide.weeks.w1.d1.p2',
            'guide.weeks.w1.d1.p3',
            'guide.weeks.w1.d1.p4',
            'guide.weeks.w1.d1.p5',
          ],
        },
        {
          name: 'guide.weeks.w1.d2.name',
          hard: 'guide.weeks.w1.d2.hard',
          points: [
            'guide.weeks.w1.d2.p1',
            'guide.weeks.w1.d2.p2',
            'guide.weeks.w1.d2.p3',
            'guide.weeks.w1.d2.p4',
            'guide.weeks.w1.d2.p5',
          ],
        },
        {
          name: 'guide.weeks.w1.d3.name',
          hard: 'guide.weeks.w1.d3.hard',
          points: [
            'guide.weeks.w1.d3.p1',
            'guide.weeks.w1.d3.p2',
            'guide.weeks.w1.d3.p3',
            'guide.weeks.w1.d3.p4',
            'guide.weeks.w1.d3.p5',
          ],
        },
        {
          name: 'guide.weeks.w1.d4.name',
          hard: 'guide.weeks.w1.d4.hard',
          points: [
            'guide.weeks.w1.d4.p1',
            'guide.weeks.w1.d4.p2',
            'guide.weeks.w1.d4.p3',
            'guide.weeks.w1.d4.p4',
            'guide.weeks.w1.d4.p5',
          ],
        },
        {
          name: 'guide.weeks.w1.d5.name',
          hard: 'guide.weeks.w1.d5.hard',
          points: [
            'guide.weeks.w1.d5.p1',
            'guide.weeks.w1.d5.p2',
            'guide.weeks.w1.d5.p3',
            'guide.weeks.w1.d5.p4',
          ],
        },
      ],
    },
    {
      number: 2,
      title: 'guide.weeks.w2.title',
      theme: 'guide.weeks.w2.theme',
      days: [
        {
          name: 'guide.weeks.w2.d1.name',
          hard: 'guide.weeks.w2.d1.hard',
          points: [
            'guide.weeks.w2.d1.p1',
            'guide.weeks.w2.d1.p2',
            'guide.weeks.w2.d1.p3',
            'guide.weeks.w2.d1.p4',
            'guide.weeks.w2.d1.p5',
          ],
        },
        {
          name: 'guide.weeks.w2.d2.name',
          hard: 'guide.weeks.w2.d2.hard',
          points: [
            'guide.weeks.w2.d2.p1',
            'guide.weeks.w2.d2.p2',
            'guide.weeks.w2.d2.p3',
            'guide.weeks.w2.d2.p4',
            'guide.weeks.w2.d2.p5',
          ],
        },
        {
          name: 'guide.weeks.w2.d3.name',
          hard: 'guide.weeks.w2.d3.hard',
          points: [
            'guide.weeks.w2.d3.p1',
            'guide.weeks.w2.d3.p2',
            'guide.weeks.w2.d3.p3',
            'guide.weeks.w2.d3.p4',
            'guide.weeks.w2.d3.p5',
          ],
        },
        {
          name: 'guide.weeks.w2.d4.name',
          hard: 'guide.weeks.w2.d4.hard',
          points: [
            'guide.weeks.w2.d4.p1',
            'guide.weeks.w2.d4.p2',
            'guide.weeks.w2.d4.p3',
            'guide.weeks.w2.d4.p4',
            'guide.weeks.w2.d4.p5',
          ],
        },
        {
          name: 'guide.weeks.w2.d5.name',
          hard: 'guide.weeks.w2.d5.hard',
          points: ['guide.weeks.w2.d5.p1', 'guide.weeks.w2.d5.p2', 'guide.weeks.w2.d5.p3'],
        },
      ],
    },
    {
      number: 3,
      title: 'guide.weeks.w3.title',
      theme: 'guide.weeks.w3.theme',
      days: [
        {
          name: 'guide.weeks.w3.d1.name',
          hard: 'guide.weeks.w3.d1.hard',
          points: [
            'guide.weeks.w3.d1.p1',
            'guide.weeks.w3.d1.p2',
            'guide.weeks.w3.d1.p3',
            'guide.weeks.w3.d1.p4',
            'guide.weeks.w3.d1.p5',
            'guide.weeks.w3.d1.p6',
          ],
        },
        {
          name: 'guide.weeks.w3.d2.name',
          hard: 'guide.weeks.w3.d2.hard',
          points: [
            'guide.weeks.w3.d2.p1',
            'guide.weeks.w3.d2.p2',
            'guide.weeks.w3.d2.p3',
            'guide.weeks.w3.d2.p4',
            'guide.weeks.w3.d2.p5',
          ],
        },
        {
          name: 'guide.weeks.w3.d3.name',
          hard: 'guide.weeks.w3.d3.hard',
          points: [
            'guide.weeks.w3.d3.p1',
            'guide.weeks.w3.d3.p2',
            'guide.weeks.w3.d3.p3',
            'guide.weeks.w3.d3.p4',
            'guide.weeks.w3.d3.p5',
          ],
        },
        {
          name: 'guide.weeks.w3.d4.name',
          hard: 'guide.weeks.w3.d4.hard',
          points: [
            'guide.weeks.w3.d4.p1',
            'guide.weeks.w3.d4.p2',
            'guide.weeks.w3.d4.p3',
            'guide.weeks.w3.d4.p4',
            'guide.weeks.w3.d4.p5',
            'guide.weeks.w3.d4.p6',
          ],
        },
        {
          name: 'guide.weeks.w3.d5.name',
          hard: 'guide.weeks.w3.d5.hard',
          points: [
            'guide.weeks.w3.d5.p1',
            'guide.weeks.w3.d5.p2',
            'guide.weeks.w3.d5.p3',
            'guide.weeks.w3.d5.p4',
          ],
        },
      ],
    },
    {
      number: 4,
      title: 'guide.weeks.w4.title',
      theme: 'guide.weeks.w4.theme',
      days: [
        {
          name: 'guide.weeks.w4.d1.name',
          hard: 'guide.weeks.w4.d1.hard',
          points: [
            'guide.weeks.w4.d1.p1',
            'guide.weeks.w4.d1.p2',
            'guide.weeks.w4.d1.p3',
            'guide.weeks.w4.d1.p4',
            'guide.weeks.w4.d1.p5',
          ],
        },
        {
          name: 'guide.weeks.w4.d2.name',
          hard: 'guide.weeks.w4.d2.hard',
          points: [
            'guide.weeks.w4.d2.p1',
            'guide.weeks.w4.d2.p2',
            'guide.weeks.w4.d2.p3',
            'guide.weeks.w4.d2.p4',
          ],
        },
        {
          name: 'guide.weeks.w4.d3.name',
          hard: 'guide.weeks.w4.d3.hard',
          points: [
            'guide.weeks.w4.d3.p1',
            'guide.weeks.w4.d3.p2',
            'guide.weeks.w4.d3.p3',
            'guide.weeks.w4.d3.p4',
            'guide.weeks.w4.d3.p5',
          ],
        },
        {
          name: 'guide.weeks.w4.d4.name',
          hard: 'guide.weeks.w4.d4.hard',
          points: [
            'guide.weeks.w4.d4.p1',
            'guide.weeks.w4.d4.p2',
            'guide.weeks.w4.d4.p3',
            'guide.weeks.w4.d4.p4',
            'guide.weeks.w4.d4.p5',
          ],
        },
        {
          name: 'guide.weeks.w4.d5.name',
          hard: 'guide.weeks.w4.d5.hard',
          points: ['guide.weeks.w4.d5.p1', 'guide.weeks.w4.d5.p2', 'guide.weeks.w4.d5.p3'],
        },
      ],
    },
    {
      number: 5,
      title: 'guide.weeks.w5.title',
      theme: 'guide.weeks.w5.theme',
      days: [
        {
          name: 'guide.weeks.w5.d1.name',
          hard: 'guide.weeks.w5.d1.hard',
          points: [
            'guide.weeks.w5.d1.p1',
            'guide.weeks.w5.d1.p2',
            'guide.weeks.w5.d1.p3',
            'guide.weeks.w5.d1.p4',
            'guide.weeks.w5.d1.p5',
          ],
        },
        {
          name: 'guide.weeks.w5.d2.name',
          hard: 'guide.weeks.w5.d2.hard',
          points: ['guide.weeks.w5.d2.p1', 'guide.weeks.w5.d2.p2', 'guide.weeks.w5.d2.p3'],
        },
        {
          name: 'guide.weeks.w5.d3.name',
          hard: 'guide.weeks.w5.d3.hard',
          points: ['guide.weeks.w5.d3.p1', 'guide.weeks.w5.d3.p2'],
        },
        {
          name: 'guide.weeks.w5.d4.name',
          hard: 'guide.weeks.w5.d4.hard',
          points: ['guide.weeks.w5.d4.p1', 'guide.weeks.w5.d4.p2'],
        },
        {
          name: 'guide.weeks.w5.d5.name',
          hard: 'guide.weeks.w5.d5.hard',
          points: ['guide.weeks.w5.d5.p1', 'guide.weeks.w5.d5.p2'],
        },
      ],
    },
  ];

  readonly focusTopics: string[] = [
    'guide.focusTopics.t1',
    'guide.focusTopics.t2',
    'guide.focusTopics.t3',
    'guide.focusTopics.t4',
    'guide.focusTopics.t5',
    'guide.focusTopics.t6',
    'guide.focusTopics.t7',
  ];

  readonly progress: { labelKey: string; valueKey: string; highlight?: boolean }[] = [
    {
      labelKey: 'guide.progress.currentWeekLabel',
      valueKey: 'guide.progress.currentWeekValue',
      highlight: true,
    },
    {
      labelKey: 'guide.progress.currentDayLabel',
      valueKey: 'guide.progress.currentDayValue',
      highlight: true,
    },
    { labelKey: 'guide.progress.mockExamLabel', valueKey: 'guide.progress.mockExamValue' },
    { labelKey: 'guide.progress.examDateLabel', valueKey: 'guide.progress.examDateValue' },
  ];

  readonly courseOverview: CourseWeekOverview[] = [
    {
      number: 1,
      theme: 'guide.overview.w1.theme',
      laneMix: 'guide.overview.w1.laneMix',
      friday: 'guide.overview.w1.friday',
    },
    {
      number: 2,
      theme: 'guide.overview.w2.theme',
      laneMix: 'guide.overview.w2.laneMix',
      friday: 'guide.overview.w2.friday',
    },
    {
      number: 3,
      theme: 'guide.overview.w3.theme',
      laneMix: 'guide.overview.w3.laneMix',
      friday: 'guide.overview.w3.friday',
    },
    {
      number: 4,
      theme: 'guide.overview.w4.theme',
      laneMix: 'guide.overview.w4.laneMix',
      friday: 'guide.overview.w4.friday',
    },
    {
      number: 5,
      theme: 'guide.overview.w5.theme',
      laneMix: 'guide.overview.w5.laneMix',
      friday: 'guide.overview.w5.friday',
    },
  ];

  readonly setupSteps: SetupStep[] = [
    {
      number: 1,
      title: 'guide.setup.step1.title',
      description: 'guide.setup.step1.description',
    },
    {
      number: 2,
      title: 'guide.setup.step2.title',
      description: 'guide.setup.step2.description',
    },
    {
      number: 3,
      title: 'guide.setup.step3.title',
      description: 'guide.setup.step3.description',
    },
    {
      number: 4,
      title: 'guide.setup.step4.title',
      description: 'guide.setup.step4.description',
    },
  ];

  readonly dailyRoutine: RoutineBlock[] = [
    {
      time: 'guide.routine.block1.time',
      title: 'guide.routine.block1.title',
      icon: '🚀',
      steps: ['guide.routine.block1.step1', 'guide.routine.block1.step2'],
    },
    {
      time: 'guide.routine.block2.time',
      title: 'guide.routine.block2.title',
      icon: '📖',
      steps: [
        'guide.routine.block2.step1',
        'guide.routine.block2.step2',
        'guide.routine.block2.step3',
      ],
    },
    {
      time: 'guide.routine.block3.time',
      title: 'guide.routine.block3.title',
      icon: '🧪',
      steps: ['guide.routine.block3.step1', 'guide.routine.block3.step2'],
    },
    {
      time: 'guide.routine.block4.time',
      title: 'guide.routine.block4.title',
      icon: '📝',
      steps: ['guide.routine.block4.step1', 'guide.routine.block4.step2'],
    },
  ];

  readonly powerTips: PowerTip[] = [
    {
      icon: '📎',
      title: 'guide.tips.tip1.title',
      description: 'guide.tips.tip1.description',
    },
    {
      icon: '🗣️',
      title: 'guide.tips.tip2.title',
      description: 'guide.tips.tip2.description',
    },
    {
      icon: '📋',
      title: 'guide.tips.tip3.title',
      description: 'guide.tips.tip3.description',
    },
    {
      icon: '🔄',
      title: 'guide.tips.tip4.title',
      description: 'guide.tips.tip4.description',
    },
    {
      icon: '📝',
      title: 'guide.tips.tip5.title',
      description: 'guide.tips.tip5.description',
    },
    {
      icon: '🎯',
      title: 'guide.tips.tip6.title',
      description: 'guide.tips.tip6.description',
    },
    {
      icon: '🏆',
      title: 'guide.tips.tip7.title',
      description: 'guide.tips.tip7.description',
    },
  ];

  readonly pdfLibrary: PdfEntry[] = [
    {
      file: 'angular-cert-project-instructions.md',
      upload: false,
      note: 'guide.pdfs.entry1.note',
    },
    {
      file: 'course-guide.pdf',
      upload: true,
      note: 'guide.pdfs.entry2.note',
    },
    {
      file: 'week1-day1-components-template-syntax.pdf',
      upload: true,
      note: 'guide.pdfs.entry3.note',
    },
    {
      file: 'week1-day2-dependency-injection.pdf',
      upload: true,
      note: 'guide.pdfs.entry4.note',
    },
    {
      file: 'week1-day3-signals-reactivity.pdf',
      upload: true,
      note: 'guide.pdfs.entry5.note',
    },
    {
      file: 'week1-day4-change-detection-onpush.pdf',
      upload: true,
      note: 'guide.pdfs.entry6.note',
    },
    {
      file: 'week1-day5-coding-drill.pdf',
      upload: true,
      note: 'guide.pdfs.entry7.note',
    },
    {
      file: 'week2-day1 through week2-day5',
      upload: true,
      note: 'guide.pdfs.entry8.note',
    },
    {
      file: 'week3-day1 through week3-day5',
      upload: true,
      note: 'guide.pdfs.entry9.note',
    },
  ];

  readonly instructionsSample = `## Current Progress  ← update this section weekly
- Current week: Week 2
- Current day: Wednesday
- Mock exam score: Not taken yet
- Exam date: Not booked yet

## Topics needing extra time  ← check off as you master them
- [x] Dependency Injection  ← mastered Week 1
- [ ] RxJS operators — switchMap vs exhaustMap still shaky
- [ ] Change detection — OnPush mutation bug unclear
- [ ] Structural directives
- [ ] Template-driven forms`;
}
