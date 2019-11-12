import { createReducer, on } from '@ngrx/store';
import { Hero } from '../../hero';
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

export const heroReducer = createReducer(
  { heroes: [] },

  on(
    getHeroSuccess,
    (state, { hero }) => ({
      ...state,
      singleHeroId: hero.id,
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
      heroes: heroes.sort(heroSort),
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
      filteredHeroes: filteredHeroes.sort(heroSearchSort),
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
      heroes: updateHeroes(state.heroes, hero),
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
    })
  ),

  on(
    deleteHeroSuccess,
    (state, { hero }) => ({
      ...state,
      heroes: updateHeroes(state.heroes, hero),
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

function updateHeroes(heroes: Hero[], hero): Hero[] {
  const updateIndex = heroes.findIndex(hero => hero.id === hero.id);
  if (updateIndex === -1) {
    return [...heroes, hero];
  }
  return heroes.map(hero => {
    if (hero.id === hero.id) {
      return hero;
    }
    return hero;
  });
}

function heroSort(a: Hero, b: Hero): number {
  return b.created_date.localeCompare(a.created_date);
}

function heroSearchSort(a: Hero, b: Hero): number {
  return a.name.localeCompare(b.name);
}
