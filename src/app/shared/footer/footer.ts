import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslocoPipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly currentYear = new Date().getFullYear();

  readonly socialLinks = [
    { href: 'https://github.com/GadDev', label: 'GitHub', icon: '/social/github.svg' },
    {
      href: 'https://www.linkedin.com/in/alexandre-gadaix-a7792947/',
      label: 'LinkedIn',
      icon: '/social/linkedin.svg',
    },
  ];

  readonly resourceLinks = [
    { path: '/resources', key: 'footer.allMaterials' },
    { path: '/about', key: 'nav.about' },
    { path: '/guide', key: 'footer.userGuide' },
    { path: '/react-angular', key: 'footer.reactAngularSheet' },
    { path: '/interview', key: 'footer.interviewSheet' },
    { path: '/angular-cheatsheet', key: 'footer.angularSheet' },
    {
      path: '/coursera',
      key: 'footer.courseraTracker',
      highlightClass: 'text-amber-400/70 hover:text-amber-300',
    },
  ];

  readonly externalLinks = [
    { href: 'https://angular.dev', key: 'footer.angularDocs' },
    { href: 'https://angular.dev/tutorials', key: 'footer.angularTutorials' },
    { href: 'https://claude.ai', key: 'footer.claudeAI' },
    { href: 'https://certificates.dev/angular', key: 'footer.certificatesDev' },
    { href: 'https://www.coursera.org', key: 'footer.coursera' },
  ];
}
