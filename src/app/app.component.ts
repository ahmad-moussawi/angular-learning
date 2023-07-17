import { Component, ViewChild } from '@angular/core';
import { CounterComponent } from './counter.component';
import { Router } from '@angular/router';

let i = 0;

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a
        routerLink="/"
        routerLinkActive="active"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        Home
      </a>
      <a routerLink="/about" routerLinkActive="active">About</a>
      <a routerLink="/contact" routerLinkActive="active">Contact</a>
      <button (click)="goToAbout()">Go to about</button>
    </nav>

    <hr />

    <div class="main">
      <router-outlet />
      <!-- real content -->
    </div>

    <counter
      #counterA
      [value]="checkoutTotal"
      (valueChange)="onChange($event)"
      (incrementChange)="onIncrement($event)"
    />
    <!-- <br />

    <counter color="green" [(value)]="checkoutTotal" /> <br />

    <counter color="red" [(value)]="checkoutTotal" /> <br />

    <counter #counterC [value]="5" />

    <hr /> -->

    <button (click)="incrementAll()">Increment all</button>
  `,
  styles: [
    `
      nav {
        display: flex;
        gap: 10px;
      }

      nav a.active {
        color: red;
      }

      h1 {
        color: red;
      }

      .main {
        outline: 1px solid red;
        padding: 3rem;
      }
    `,
  ],
})
export class AppComponent {
  @ViewChild('counterA') counterA!: CounterComponent;
  @ViewChild('counterC') counterC!: CounterComponent;

  checkoutTotal = 10;

  constructor(public router: Router) {}

  onChange(value: number) {
    this.checkoutTotal = value;
  }

  onIncrement(value: number) {
    console.log('incrementing: ', value);
  }

  incrementAll() {
    // this.counterA.increment();
    this.counterC.increment();
    this.counterC.color = ['red', 'green', 'yellow'][i++ % 3];
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
}
