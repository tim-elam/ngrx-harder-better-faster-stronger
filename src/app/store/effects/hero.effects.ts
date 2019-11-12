import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, tap } from 'rxjs/operators';
import { HeroService } from '../../hero.service';
import { filterHeroes, filterHeroesError, filterHeroesSuccess } from '../actions/hero.actions';

@Injectable({
  providedIn: 'root',
})
export class HeroEffects {
  constructor(
    private heroService: HeroService,
    private actions: Actions,
  ) {
  }

  @Effect()
  public search = this.actions.pipe(
    ofType(filterHeroes),
    concatMap(action => this.heroService.search(action.filter)
      .pipe(
        map(filteredHeroes => filterHeroesSuccess({ filteredHeroes })),
        catchError((error) => of(filterHeroesError({ error }))),
      ),
    ),
  );

  @Effect()
  public heroErrors = this.heroService
    .errors$
    .pipe(
      tap(error => console.error(error)),
    );
}
