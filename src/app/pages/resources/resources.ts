import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DayPdf {
  day: number;
  title: string;
  url: string;
  type: 'lesson' | 'drill' | 'challenge';
}

interface WeekSection {
  id: number;
  title: string;
  theme: string;
  days: DayPdf[];
}

interface CheatSheet {
  title: string;
  url: string;
  description: string;
}

@Component({
  selector: 'app-resources',
  imports: [RouterLink],
  templateUrl: './resources.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resources {
  readonly cheatSheets: CheatSheet[] = [
    {
      title: 'Angular Signals Cheatsheet',
      url: '/pdfs/angular-signals-cheatsheet.pdf',
      description: 'Quick reference for signals, computed, and effects API.',
    },
    {
      title: 'Modern Template Syntax',
      url: '/pdfs/modern-template-syntax.pdf',
      description: 'Native control flow, deferrable views, and built-in pipes.',
    },
  ];

  readonly weeks: WeekSection[] = [
    {
      id: 1,
      title: 'Angular Core',
      theme: 'Components · DI · Signals · Change Detection',
      days: [
        {
          day: 1,
          title: 'Components & Template Syntax',
          url: '/pdfs/week1-day1-components-template-syntax.pdf',
          type: 'lesson',
        },
        {
          day: 2,
          title: 'Dependency Injection',
          url: '/pdfs/week1-day2-dependency-injection.pdf',
          type: 'lesson',
        },
        {
          day: 4,
          title: 'Change Detection & OnPush',
          url: '/pdfs/week1-day4-change-detection-onpush.pdf',
          type: 'lesson',
        },
        { day: 5, title: 'Coding Drill', url: '/pdfs/week1-day5-coding-drill.pdf', type: 'drill' },
      ],
    },
    {
      id: 2,
      title: 'Routing & Data',
      theme: 'Router · RxJS · HttpClient · Interceptors',
      days: [
        {
          day: 1,
          title: 'Router & Lazy Loading',
          url: '/pdfs/week2-day1-router-lazy-loading.pdf',
          type: 'lesson',
        },
        {
          day: 3,
          title: 'RxJS Operators',
          url: '/pdfs/week2-day3-rxjs-operators.pdf',
          type: 'lesson',
        },
        {
          day: 4,
          title: 'HttpClient & Interceptors',
          url: '/pdfs/week2-day4-httpclient-interceptors.pdf',
          type: 'lesson',
        },
        {
          day: 5,
          title: 'Timed Challenge',
          url: '/pdfs/week2-day5-timed-challenge.pdf',
          type: 'challenge',
        },
      ],
    },
    {
      id: 3,
      title: 'Forms & Templates',
      theme: 'Reactive Forms · Pipes · Custom Directives',
      days: [
        {
          day: 1,
          title: 'Reactive Forms',
          url: '/pdfs/week3-day1-reactive-forms.pdf',
          type: 'lesson',
        },
        { day: 3, title: 'Pipes', url: '/pdfs/week3-day3-pipes.pdf', type: 'lesson' },
        {
          day: 4,
          title: 'Custom Directives',
          url: '/pdfs/week3-day4-custom-directives.pdf',
          type: 'lesson',
        },
        {
          day: 5,
          title: 'Timed Challenge',
          url: '/pdfs/week3-day5-timed-challenge.pdf',
          type: 'challenge',
        },
      ],
    },
    {
      id: 4,
      title: 'Architecture & Performance',
      theme: 'Architecture · SSR/SSG · Performance',
      days: [
        {
          day: 1,
          title: 'Architecture Patterns',
          url: '/pdfs/week4-day1-architecture.pdf',
          type: 'lesson',
        },
        { day: 3, title: 'SSR & SSG', url: '/pdfs/week4-day3-ssr-ssg.pdf', type: 'lesson' },
        {
          day: 4,
          title: 'Performance Optimisation',
          url: '/pdfs/week4-day4-performance.pdf',
          type: 'lesson',
        },
        {
          day: 5,
          title: 'Architecture Challenge',
          url: '/pdfs/week4-day5-architecture-challenge.pdf',
          type: 'challenge',
        },
      ],
    },
    {
      id: 5,
      title: 'Testing & Exam Prep',
      theme: 'Testing · Weak-Spot Repair · Final Review',
      days: [
        { day: 1, title: 'Testing', url: '/pdfs/week5-day1-testing.pdf', type: 'lesson' },
        {
          day: 3,
          title: 'Weak-Spot Repair',
          url: '/pdfs/week5-day3-weak-spot-repair.pdf',
          type: 'lesson',
        },
        {
          day: 5,
          title: 'Final Review & Exam Day',
          url: '/pdfs/week5-day5-final-review-exam-day.pdf',
          type: 'challenge',
        },
      ],
    },
  ];
}
