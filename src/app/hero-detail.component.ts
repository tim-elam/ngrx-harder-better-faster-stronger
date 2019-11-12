import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { Hero } from './hero';
import { heroStateSelector, heroesSelector } from './store/selectors/hero.selectors';
import { AppState } from './store/state/state';
import { saveHero, getHero } from './store/actions/hero.actions';

@Component({
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.store.dispatch(getHero({ id }));
        this.store.select(heroesSelector)
          .subscribe(
            heroes => {
              this.hero = heroes.find(hero => hero.id === id);
            });
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }
    });
  }

  save(): void {
    this.store.dispatch(saveHero({hero: { ...this.hero }}));
    const heroSaving = this.store.select(
      heroStateSelector,
    ).pipe(
      first(state => !state.heroIsSaving),
    ).subscribe(heroState => {
      if (heroState.heroSavingError) {
        this.error = heroState.heroSavingError;
      } else {
        this.goBack(this.hero);
      }
    });
  }

  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);
    if (this.navigated) {
      window.history.back();
    }
  }
}
