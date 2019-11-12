import { Hero } from '../../hero';

export interface AppState {
  heroState: HeroState;
}

export interface HeroState {
  // GET
  heroes: Hero[];
  heroesError?: any;
  singleHeroError?: any;
  nameFilter?: string
  filteredHeroes?: Hero[];
  filterError?: any;
  // POST & PUT
  heroSavingError?: any;
  heroIsSaving?: boolean;
  // DELETE
  heroDeletingError?: any;
}
