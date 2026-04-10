import type { CourseChallenge } from '../../types';

export const WEEK5_DAY5_CHALLENGE: CourseChallenge = {
  description:
    'Full synthesis: build a NotesService (signal-based, injectable) and a NoteListComponent that injects it. The component should allow adding and removing notes, tracked by id.',
  starterCode: `import { Component, ChangeDetectionStrategy, Injectable } from '@angular/core';

// 🎯 Final Synthesis Challenge
// Part 1 — NotesService
//   • notes: WritableSignal<Note[]>
//   • add(text: string): appends a new note with auto-incremented id
//   • remove(id: number): filters the note out
//
// Part 2 — NoteListComponent
//   • Injects NotesService
//   • Template: text input + "Add" button, list of notes with "×" remove buttons
//   • Uses @for with track by id
//   • OnPush

export interface Note {
  id: number;
  text: string;
}

// TODO: implement NotesService

// TODO: implement NoteListComponent`,
  solutionCode: `import { Component, ChangeDetectionStrategy, Injectable, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Note { id: number; text: string; }

@Injectable({ providedIn: 'root' })
class NotesService {
  readonly notes = signal<Note[]>([]);
  private nextId = 1;

  add(text: string): void {
    if (!text.trim()) return;
    this.notes.update(n => [...n, { id: this.nextId++, text: text.trim() }]);
  }

  remove(id: number): void {
    this.notes.update(n => n.filter(note => note.id !== id));
  }
}

@Component({
  selector: 'app-note-list',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <div style="max-width:28rem;padding:2rem">
      <div style="display:flex;gap:.5rem;margin-bottom:1rem">
        <input [(ngModel)]="newNote" placeholder="New note…"
               style="flex:1;padding:.5rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:.5rem;color:white" />
        <button (click)="addNote()"
                style="padding:.5rem 1rem;background:#6366f1;border-radius:.5rem;color:white;cursor:pointer">
          Add
        </button>
      </div>
      <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:.5rem">
        @for (note of svc.notes(); track note.id) {
          <li style="display:flex;justify-content:space-between;padding:.5rem .75rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:.5rem">
            {{ note.text }}
            <button (click)="svc.remove(note.id)" [attr.aria-label]="'Remove ' + note.text"
                    style="opacity:.5;cursor:pointer;background:none;border:none;color:white">×</button>
          </li>
        } @empty {
          <p style="opacity:.4;font-size:.875rem">No notes yet.</p>
        }
      </ul>
    </div>
  \`,
})
export class NoteListComponent {
  protected readonly svc = inject(NotesService);
  newNote = '';

  addNote() {
    this.svc.add(this.newNote);
    this.newNote = '';
  }
}`,
};
