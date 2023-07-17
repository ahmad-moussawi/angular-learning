import { Component, Input } from '@angular/core';

@Component({
  template: `About component`,
})
export class AboutComponent {
  @Input() title = '';
}
