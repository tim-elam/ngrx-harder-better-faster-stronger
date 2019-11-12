import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Hero } from './hero';
import { getHeroes } from './store/actions/hero.actions';
import { heroesSelector } from './store/selectors/hero.selectors';
import { AppState } from './store/state/state';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private router: Router,
    private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(getHeroes());
    this.store.select(heroesSelector)
      .subscribe(heroes => {
        this.heroes = heroes.slice(1, 5);
      });
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
