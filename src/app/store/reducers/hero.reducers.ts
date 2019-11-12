import { createReducer, on } from '@ngrx/store';
import { heroAdapter, heroSearchAdapter, HeroState } from '../state/state';

import {
  deleteHero,
  deleteHeroError,
  deleteHeroSuccess,
  filterHeroes,
  filterHeroesClear,
  filterHeroesError,
  filterHeroesSuccess,
  getHeroError,
  getHeroesError,
  getHeroesSuccess,
  getHeroSuccess,
  saveHeroError,
  saveHeroSuccess,
} from '../actions/hero.actions';

export const heroReducer = createReducer<HeroState>(
  {
    heroes: heroAdapter.getInitialState(),
    filteredHeroes: heroSearchAdapter.getInitialState(),
  },

  on(
    getHeroSuccess,
    (state, { hero }) => ({
      ...state,
      heroes: heroAdapter.updateOne({ id: hero.id, changes: hero }, state.heroes),
      singleHeroError: undefined,
    }),
  ),

  on(
    getHeroError,
    (state, { error }) => ({
      ...state,
      heroesError: error,
    }),
  ),

  on(
    getHeroesSuccess,
    (state, { heroes }) => ({
      ...state,
      heroes: heroAdapter.addAll(heroes, state.heroes),
      heroesError: undefined,
    }),
  ),

  on(
    getHeroesError,
    (state, { error }) => ({
      ...state,
      heroesError: error,
    }),
  ),

  on(
    filterHeroes,
    (state, { filter }) => ({
      ...state,
      nameFilter: filter,
      filterError: undefined,
    }),
  ),

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

  on(
    saveHeroSuccess,
    (state, { hero }) => ({
      ...state,
      heroes: heroAdapter.updateOne({ id: hero.id, changes: hero }, state.heroes),
      heroSavingError: undefined,
    }),
  ),

  on(
    saveHeroError,
    (state, { error }) => ({
      ...state,
      heroSavingError: error,
    }),
  ),

  on(
    deleteHero,
    (state) => ({
      ...state,
      heroSavingComplete: undefined,
    }),
  ),

  on(
    deleteHero,
    (state) => ({
      ...state,
      heroIsSaving: true,
    }),
  ),

  on(
    deleteHeroSuccess,
    (state, { hero }) => ({
      ...state,
      heroes: heroAdapter.removeOne(hero.id, state.heroes),
      heroIsSaving: false,
      heroDeletingError: undefined,
    }),
  ),

  on(
    deleteHeroError,
    (state, { error }) => ({
      ...state,
      heroIsSaving: false,
      heroDeletingError: error,
    }),
  ),
);
