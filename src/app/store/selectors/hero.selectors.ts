import { createFeatureSelector } from '@ngrx/store';
import { AppState, heroAdapter, HeroState } from '../state/state';

export const heroSelectors = heroAdapter.getSelectors<AppState>(
  state => state.heroState.heroes,
);

export const filteredHeroSelectors = heroAdapter.getSelectors<AppState>(
  state => state.heroState.filteredHeroes,
);

export const heroStateSelector = createFeatureSelector<AppState, HeroState>('heroState');
