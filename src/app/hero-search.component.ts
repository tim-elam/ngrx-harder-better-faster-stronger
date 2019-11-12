import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Hero } from './hero';
import { heroStateSelector } from './store/selectors/hero.selectors';
import { AppState } from './store/state/state';
import { filterHeroes } from './store/actions/hero.actions';

@Component({
  selector: 'my-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
  }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
    )
      .subscribe(filter => this.store.dispatch(filterHeroes({ filter })));
    this.heroes = this.store.select(
      heroStateSelector,
    ).pipe(
      map(state => state.filteredHeroes),
    );

    this.store.select(
      heroStateSelector,
    ).pipe(
      map(state => state.filterError),
      filter(Boolean),
    ).subscribe(error => {
      // TODO: real heroesError handling
      console.log(`Error in component ... ${error}`);

    });
  }

  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
