import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from './hero';
import { deleteHero, getHeroes } from './store/actions/hero.actions';
import { heroSelectors, heroStateSelector } from './store/selectors/hero.selectors';
import { AppState } from './store/state/state';


@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Observable<Hero[]>;
  selectedHero: Hero;
  addingHero = false;
  error: any;
  showNgFor = false;

  constructor(private router: Router, private store: Store<AppState>) {
    this.heroes = this.store.select(heroSelectors.selectAll);
  }

  getHeroes(): void {
    this.store.dispatch(getHeroes());
  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) {
      this.getHeroes();
    }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.store.dispatch(deleteHero({ hero }));
    this.store.select(
      heroStateSelector,
    ).pipe(
      map(state => state.heroDeletingError),
    ).subscribe((error) => {
      this.error = error;
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
