build a production-ready Angular InterviewService with:

✅ Local JSON dataset (easy / medium / hard)
✅ Session management
✅ Smart question selection
✅ Scoring engine
✅ Clean architecture (extensible later for AI)
🧱 1. Folder Structure
src/app/
core/
services/
interview.service.ts
question.service.ts
scoring.service.ts
models/
interview.model.ts

src/assets/data/
easy-questions.json
medium-questions.json
hard-questions.json
🧠 2. Models (Strong typing)
📄 interview.model.ts
export type QuestionType = 'theory' | 'coding' | 'behavioral';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface BaseQuestion {
id: string;
type: QuestionType;
title: string;
prompt: string;
topics: string[];
difficulty: Difficulty;
estimatedTimeSec: number;

expectedKeywords?: string[];
modelAnswer?: string;

starterCode?: string;
solutionCode?: string;

expectedStructure?: string;
evaluationCriteria?: string[];
}

export interface UserAnswer {
questionId: string;
answerText?: string;
code?: string;
timeSpentSec: number;
}

export interface InterviewSession {
id: string;
questions: BaseQuestion[];
answers: UserAnswer[];
currentIndex: number;
startedAt: Date;
completedAt?: Date;
score?: number;
}
📦 3. Question Service (load JSON)
📄 question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseQuestion, Difficulty } from '../models/interview.model';
import { forkJoin, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionService {
constructor(private http: HttpClient) {}

loadAll() {
return forkJoin({
easy: this.http.get<any>('assets/data/easy-questions.json'),
medium: this.http.get<any>('assets/data/medium-questions.json'),
hard: this.http.get<any>('assets/data/hard-questions.json'),
}).pipe(
map((res) => ({
easy: res.easy.questions,
medium: res.medium.questions,
hard: res.hard.questions,
}))
);
}
}
🧠 4. Scoring Service
📄 scoring.service.ts
import { Injectable } from '@angular/core';
import { BaseQuestion, UserAnswer } from '../models/interview.model';

@Injectable({ providedIn: 'root' })
export class ScoringService {

scoreQuestion(question: BaseQuestion, answer: UserAnswer): number {
if (question.type === 'theory') {
return this.scoreTheory(question, answer);
}

    if (question.type === 'coding') {
      return answer.code ? 70 : 0; // MVP
    }

    if (question.type === 'behavioral') {
      return answer.answerText ? 80 : 0;
    }

    return 0;

}

private scoreTheory(q: BaseQuestion, a: UserAnswer): number {
if (!a.answerText || !q.expectedKeywords) return 0;

    const text = a.answerText.toLowerCase();

    const matches = q.expectedKeywords.filter(k =>
      text.includes(k.toLowerCase())
    );

    return Math.round((matches.length / q.expectedKeywords.length) * 100);

}

computeFinalScore(scores: number[]): number {
const sum = scores.reduce((a, b) => a + b, 0);
return Math.round(sum / scores.length);
}
}
⚙️ 5. Interview Service (Core Engine)
📄 interview.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
BaseQuestion,
InterviewSession,
UserAnswer,
Difficulty,
} from '../models/interview.model';
import { QuestionService } from './question.service';
import { ScoringService } from './scoring.service';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class InterviewService {
private session$ = new BehaviorSubject<InterviewSession | null>(null);

constructor(
private questionService: QuestionService,
private scoringService: ScoringService
) {}

get session() {
return this.session$.asObservable();
}

async startInterview() {
const dataset = await this.questionService.loadAll().toPromise();

    const questions = this.selectQuestions(dataset);

    const session: InterviewSession = {
      id: uuid(),
      questions,
      answers: [],
      currentIndex: 0,
      startedAt: new Date(),
    };

    this.session$.next(session);

}

submitAnswer(answer: UserAnswer) {
const session = this.session$.value;
if (!session) return;

    session.answers.push(answer);
    session.currentIndex++;

    if (session.currentIndex >= session.questions.length) {
      this.completeInterview(session);
    }

    this.session$.next({ ...session });

}

private completeInterview(session: InterviewSession) {
const scores = session.questions.map((q, i) =>
this.scoringService.scoreQuestion(q, session.answers[i])
);

    session.score = this.scoringService.computeFinalScore(scores);
    session.completedAt = new Date();

}

getCurrentQuestion(): BaseQuestion | null {
const session = this.session$.value;
if (!session) return null;
return session.questions[session.currentIndex];
}

// 🔥 Question Selection Logic
private selectQuestions(dataset: any): BaseQuestion[] {
const pick = (arr: BaseQuestion[]) =>
arr[Math.floor(Math.random() * arr.length)];

    return [
      pick(dataset.easy),
      pick(dataset.easy),
      pick(dataset.medium),
      pick(dataset.medium),
      pick(dataset.hard),
    ];

}
}
🔥 6. Example Usage (Component)
ngOnInit() {
this.interviewService.startInterview();
}

next(answer: string) {
this.interviewService.submitAnswer({
questionId: this.currentQuestion.id,
answerText: answer,
timeSpentSec: 120
});
}
🧠 What makes this “senior-level”
Clean separation:
data loading
scoring
session logic
Reactive state (BehaviorSubject)
Extensible:
AI scoring later
backend later
Real interview simulation flow
🚀 Next (VERY impactful)

Now you can build:

👉 Interview UI (step-by-step flow)

timer
progress bar
transitions

👉 OR upgrade engine:

adaptive difficulty
topic balancing
persistent sessions
