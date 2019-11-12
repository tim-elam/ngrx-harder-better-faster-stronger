import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, HeroState } from '../state/state';

export const heroStateSelector = createFeatureSelector<AppState, HeroState>('heroState');

export const heroesSelector = createSelector(
  heroStateSelector,
  ({ heroes }) => heroes,
);
