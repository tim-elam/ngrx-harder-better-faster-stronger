import { createFeatureSelector } from '@ngrx/store';
import { AppState, heroSearchAdapter, HeroState } from '../state/state';

export const heroStateSelector = createFeatureSelector<AppState, HeroState>('heroState');


export const filteredHeroSelectors = heroSearchAdapter.getSelectors<AppState>(
  state => state.heroState.filteredHeroes,
);
