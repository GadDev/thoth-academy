import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
import { BackToTop } from './shared/back-to-top/back-to-top';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
