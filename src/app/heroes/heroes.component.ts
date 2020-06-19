import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero/hero';
import { HeroService } from '../hero.service';
// import { HEROES } from '../hero/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  public hero: Hero = {
    id: 857,
    name: 'Picasso',
  };
  public name = 'windstorm';
  public heroes: Hero[];
  public selectedHero: Hero;

  public onSelect: (hero: Hero) => void = (props) => {
    this.selectedHero = props;
  };
  constructor(private heroService: HeroService) {}

  public getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
