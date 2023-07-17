import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <button [disabled]="value < 1" (click)="decrement()">-</button>
    <span [ngStyle]="{ backgroundColor: color }">{{ value }}</span>
    <button (click)="increment()">+</button>
  `,
  styles: [
    `
      span {
        font-family: monospace;
        font-size: 20px;
        padding: 0 10px;
      }
    `,
  ],
})
export class CounterComponent {
  @Input()
  value = 0;

  @Input() color = 'white';

  @Output()
  valueChange = new EventEmitter<number>();

  @Output()
  incrementChange = new EventEmitter<number>();

  increment() {
    this.value = this.value + 1;

    this.valueChange.emit(this.value);

    this.incrementChange.emit(this.value);
  }

  decrement() {
    this.value = Math.max(0, this.value - 1);

    this.valueChange.emit(this.value);
  }
}
