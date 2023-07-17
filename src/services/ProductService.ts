import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, retry } from 'rxjs/operators';

export interface Item {
  id: number;
  name: string;
  price: number;
  active: boolean;
  expensive?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(public http: HttpClient) {}

  all() {
    return this.http.get<Item[]>(`/assets/products.json`).pipe(
      retry({ count: 2, delay: 4000 }),
      map((data) =>
        data.map((item) => ({ ...item, expensive: item.price > 600 }))
      )
    );
  }
}
