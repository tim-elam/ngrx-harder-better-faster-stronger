import { createReducer, on } from '@ngrx/store';

import {
  filterHeroesClear,
  filterHeroesError,
  filterHeroesSuccess,
} from '../actions/hero.actions';
import { heroSearchAdapter, HeroState } from '../state/state';

export const heroReducer = createReducer<HeroState>(
  {
    filteredHeroes: heroSearchAdapter.getInitialState(),
  },
  on(
    filterHeroesClear,
    (state) => ({
      ...state,
      nameFilter: undefined,
      filteredHeroes: undefined,
      filterError: undefined,
    }),
  ),
  on(
    filterHeroesSuccess,
    (state, { filteredHeroes }) => ({
      ...state,
      filteredHeroes: heroSearchAdapter.addAll(filteredHeroes, state.filteredHeroes),
      filterError: undefined,
    }),
  ),

  on(
    filterHeroesError,
    (state, { error }) => ({
      ...state,
      filterError: error,
      filteredHeroes: undefined,
    }),
  ),
);
