import { Component } from '@angular/core';
import { Subject, catchError, debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { Item, ProductService } from 'src/services/ProductService';
import { SearchService } from 'src/services/SearchService';

@Component({
  template: `
    <h1>Home component</h1>

    <ng-template #inactiveTemplate>
      <p>Item is active</p>
    </ng-template>

    <input
      type="text"
      name="search"
      (keyup)="search$.next($any($event.target).value)"
    />

    <ul>
      <li *ngFor="let row of result">{{ row }}</li>
    </ul>

    <p class="error" *ngIf="error">{{ error }}</p>
    <p class="loader" *ngIf="loading">Loading ...</p>

    <div
      class="item"
      [class.last]="l"
      [class.first]="f"
      [class.inactive]="!item.active"
      [class.expensive]="item.expensive"
      *ngFor="
        let item of items;
        trackBy: idTracker;
        let i = index;
        let f = first;
        let l = last;
        let e = even
      "
    >
      <h3>{{ i + 1 }}. {{ item.name }}</h3>
      <p>{{ item.price }}</p>
      <button (click)="item.active = !item.active">
        {{ item.active ? 'Deactivate' : 'Activate' }}
      </button>

      <p *ngIf="!item.active; else inactiveTemplate">
        Item is not available right now
      </p>
    </div>
  `,

  styles: [
    `
      .item {
        border: 1px solid gray;
        padding: 0.4rem;
        margin: 0.5rem;
      }

      .inactive {
        background: #eee;
      }

      .expensive {
        border: 1px solid red;
      }

      .error {
        color: red;
      }
    `,
  ],
})
export class HomeComponent {
  error = '';
  loading = true;

  items: Item[] = [];

  search$ = new Subject<string>();

  result: string[] = [];

  constructor(
    public productService: ProductService,
    public searchService: SearchService
  ) {
    this.search$
      .pipe(
        filter(q => q.length > 0),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((q) => this.searchService.search(q))
      )
      .subscribe((data) => {
        this.result = data.slice(0, 10);
      });

    productService
      .all()
      .pipe(
        catchError((err) => {
          if (err) {
            this.error = 'Failed to load data';
          }
          return of([]);
        })
      )
      .subscribe((data) => {
        this.items = data;

        this.loading = false;

        console.log(data);
      });
  }

  idTracker(index: number, item: Item) {
    return item.id;
  }
}
