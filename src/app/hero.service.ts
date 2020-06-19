import { Injectable } from '@angular/core';
import { Hero } from './hero/hero';
import { HEROES } from './hero/mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor() {}

  public getHeroes: () => Hero[] = () => {
    return HEROES;
  };
}
