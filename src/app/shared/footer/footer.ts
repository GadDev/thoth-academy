import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
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
    { path: '/resources', label: 'All Materials' },
    { path: '/about', label: 'About' },
    { path: '/guide', label: 'User Guide' },
    { path: '/react-angular', label: 'React to Angular Cheat Sheet' },
    { path: '/interview', label: 'Interview Cheat Sheet' },
    { path: '/angular-cheatsheet', label: 'Angular Beginner Cheat Sheet' },
    {
      path: '/coursera',
      label: 'Coursera Tracker',
      highlightClass: 'text-amber-400/70 hover:text-amber-300',
    },
  ];

  readonly externalLinks = [
    { href: 'https://angular.dev', label: 'Angular Docs' },
    { href: 'https://angular.dev/tutorials', label: 'Angular Tutorials' },
    { href: 'https://claude.ai', label: 'Claude AI' },
    { href: 'https://certificates.dev/angular', label: 'Certificates.dev' },
    { href: 'https://www.coursera.org', label: 'Coursera' },
  ];
}
