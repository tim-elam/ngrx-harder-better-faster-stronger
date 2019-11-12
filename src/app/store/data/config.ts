import { EntityDataModuleConfig } from '@ngrx/data';
import { Hero } from '../../hero';

export const enum ApiEntities {
  Hero = 'Hero',
}

export const dataConfig: EntityDataModuleConfig = {
  entityMetadata: {
    Hero: {
      sortComparer: heroSort,
    },
  },
  pluralNames: {
    Hero: 'Heroes',
  },
};

function heroSort(a: Hero, b: Hero): number {
  return b.created_date.localeCompare(a.created_date);
}
