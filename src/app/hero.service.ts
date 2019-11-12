import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hero } from './hero';
import { ApiEntities } from './store/data/config';

@Injectable()
export class HeroService extends EntityCollectionServiceBase<Hero> {
  private heroesUrl = 'api/heroes'; // URL to web api

  constructor(private http: HttpClient, factory: EntityCollectionServiceElementsFactory) {
    super(ApiEntities.Hero, factory);
  }

  public search(term: string): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        catchError(this.handleError),
      );
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
