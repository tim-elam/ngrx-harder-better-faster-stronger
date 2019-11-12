import { Action, createAction, props } from '@ngrx/store';
import { Hero } from '../../hero';

export const getHero = createAction(
  '[Heroes] Get Single',
  props<{id: number}>(),
);

export const getHeroSuccess = createAction(
  '[Heroes] Get Single Success',
  props<{hero: Hero}>(),
);

export const getHeroError = createAction(
  '[Heroes] Get Single Error',
  props<{error: any; id: number}>(),
);

export const getHeroes = createAction(
  '[Heroes] Get Multiple',
);

export const getHeroesSuccess = createAction(
  '[Heroes] Get Multiple Success',
  props<{heroes: Hero[]}>(),
);

export const getHeroesError = createAction(
  '[Heroes] Get Multiple Error',
  props<{error: any}>(),
);

export const filterHeroes = createAction(
  '[Heroes] Filter',
  props<{filter: string}>(),
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

export const saveHero = createAction(
  '[Heroes] Save',
  props<{hero: Hero}>(),
);

export const saveHeroSuccess = createAction(
  '[Heroes] Save Success',
  props<{hero: Hero}>(),
);

export const saveHeroError = createAction(
  '[Heroes] Save Error',
  props<{error: any; hero: Hero}>(),
);

export const deleteHero = createAction(
  '[Heroes] Delete',
  props<{hero: Hero}>(),
);

export const deleteHeroSuccess = createAction(
  '[Heroes] Delete Success',
  props<{hero: Hero}>(),
);
export const deleteHeroError = createAction(
  '[Heroes] Delete Error',
  props<{error: any; hero: Hero}>(),
);
