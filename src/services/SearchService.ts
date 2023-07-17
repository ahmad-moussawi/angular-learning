import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(public http: HttpClient) {}

  search(q: string) {
    q = q.toLocaleLowerCase();
    return this.http
      .get<string[]>('/assets/names.json?q=' + q)
      .pipe(
        map((names) => names.filter((name) => name.toLowerCase().includes(q)))
      );
  }
}
