import { Action, createAction, props } from '@ngrx/store';
import { Hero } from '../../hero';

export const filterHeroes = createAction(
  '[Heroes] Filter',
  props<{ filter: string }>(),
);

export const filterHeroesClear = createAction(
  '[Heroes] Filter Clear',
);

export const filterHeroesSuccess = createAction(
  '[Heroes] Filter Success',
  props<{filteredHeroes: Hero[]}>()
);

export const filterHeroesError = createAction(
  '[Heroes] Filter Error',
  props<{error: any}>()
);
