import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { HeroService } from '../../hero.service';
import {
  deleteHero,
  deleteHeroError,
  deleteHeroSuccess,
  filterHeroes,
  filterHeroesError,
  filterHeroesSuccess,
  getHero,
  getHeroError,
  getHeroes,
  getHeroesError,
  getHeroesSuccess,
  getHeroSuccess,
  saveHero,
  saveHeroError,
  saveHeroSuccess,
} from '../actions/hero.actions';

@Injectable({
  providedIn: 'root',
})
export class HeroEffects {
  constructor(private heroService: HeroService, private actions: Actions) {
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
  public getHeroes = this.actions.pipe(
    ofType(getHeroes),
    concatMap(() => this.heroService.getHeroes()
      .pipe(
        map(heroes => getHeroesSuccess({ heroes })),
        catchError(error => of(getHeroesError({ error }))),
      ),
    ),
  );

  @Effect()
  public getHero = this.actions.pipe(
    ofType(getHero),
    concatMap(action =>
      this.heroService.getHero(action.id)
        .pipe(
          map(hero => getHeroSuccess({ hero })),
          catchError(error => of(getHeroError({ error, id: action.id })),
          ),
        ),
    ),
  );

  @Effect()
  public deleteHero = this.actions.pipe(
    ofType(deleteHero),
    concatMap(action =>
      this.heroService.delete(action.hero)
        .pipe(
          map(hero => deleteHeroSuccess({ hero: action.hero })),
          catchError(error => of(deleteHeroError({ error, hero: action.hero })),
          ),
        ),
    ),
  );

  @Effect()
  public saveHero = this.actions.pipe(
    ofType(saveHero),
    concatMap((action) => {
        let res: Observable<void>;
        if (action.hero.id) {
          res = this.heroService.put(action.hero);
        } else {
          res = this.heroService.post(action.hero);
        }
        return res.pipe(
          map(hero => saveHeroSuccess({ hero: action.hero })),
          catchError(error => of(saveHeroError({ error, hero: action.hero }))),
        );
      },
    ),
  );
}
