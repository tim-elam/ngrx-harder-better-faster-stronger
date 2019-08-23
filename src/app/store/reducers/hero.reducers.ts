import { Hero } from '../../hero';
import { HeroActions, HeroActionTypes } from '../actions/hero.actions';
import { HeroState } from '../state/state';

export function heroReducer(state: HeroState, action: HeroActions): HeroState {
  if (!state) {
    return {
      heroes: [],
    };
  }
  let nextState: HeroState = { ...state };
  switch (action.type) {
    case HeroActionTypes.GetHero:
      nextState.singleHeroId = action.id;
      delete nextState.heroesError;
      break;

    case HeroActionTypes.GetHeroSuccess:
      nextState.heroes = updateHeroes(nextState.heroes, action.hero);
      delete nextState.singleHeroId;
      delete nextState.singleHeroError;
      break;

    case HeroActionTypes.GetHeroError:
      delete nextState.singleHeroId;
      nextState.heroesError = action.error;
      break;

    case HeroActionTypes.GetHeroes:
      delete nextState.heroesError;
      break;

    case HeroActionTypes.GetHeroesSuccess:
      nextState.heroes = action.heroes;
      delete nextState.heroesError;
      break;

    case HeroActionTypes.GetHeroesError:
      nextState.heroesError = action.error;
      break;


    case HeroActionTypes.FilterHeroes:
      nextState.nameFilter = action.filter;
      delete nextState.filterError;
      break;

    case HeroActionTypes.FilterHeroesClear:
      delete nextState.nameFilter;
      delete nextState.filteredHeroes;
      delete nextState.filterError;
      break;

    case HeroActionTypes.FilterHeroesSuccess:
      nextState.filteredHeroes = action.filteredHeroes;
      delete nextState.filterError;
      break;

    case HeroActionTypes.FilterHeroesError:
      nextState.filterError = action.error;
      delete nextState.filteredHeroes;
      break;

    case HeroActionTypes.SaveHero:
      nextState.heroSavingComplete = false;
      break;

    case HeroActionTypes.SaveHeroSuccess:
      nextState.heroes = updateHeroes(nextState.heroes, action.hero);
      delete nextState.heroSavingError;
      nextState.heroSavingComplete = true;
      break;

    case HeroActionTypes.SaveHeroError:
      nextState.heroSavingError;
      nextState.heroSavingComplete = false;
      break;

    case HeroActionTypes.DeleteHero:
      nextState.heroDeletingComplete = false;
      break;

    case HeroActionTypes.DeleteHeroSuccess:
      nextState.heroes = nextState.heroes.filter(hero => hero.id !== action.hero.id);
      delete nextState.heroDeletingError;
      nextState.heroDeletingComplete = true;
      break;

    case HeroActionTypes.DeleteHeroError:
      nextState.heroDeletingError;
      nextState.heroDeletingComplete = false;
      break;
  }
  return nextState;
}

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
  })
}
