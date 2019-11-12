import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { Observable } from 'rxjs';
import { Hero } from './hero';
import { HeroService } from './hero.service';


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

  constructor(
    private router: Router,
    private heroService: HeroService,
  ) {
  }

  getHeroes(): void {
    this.heroService.getAll();
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
    this.heroService.delete(hero.id);
    this.heroService.errors$
      .pipe(
        ofEntityOp(EntityOp.SAVE_DELETE_ONE_ERROR)
      )
      .subscribe(error => {
        this.error = error;
      });
  }

  ngOnInit(): void {
    this.getHeroes();
    this.heroes = this.heroService.entities$;
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
}
