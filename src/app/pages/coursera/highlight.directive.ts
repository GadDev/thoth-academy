import { Directive, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class Highlight {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  private highlight(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
    this.renderer.setStyle(this.el.nativeElement, 'color', color ? 'black' : 'inherit');
  }
  onMouseEnter() {
    this.highlight('yellow');
  }

  onMouseLeave() {
    this.highlight(null);
  }
}
