import { Injectable } from '@angular/core';
import { Hero } from './hero/hero';
import { HEROES } from './hero/mock-heroes';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  public getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetch heroes');
    return of(HEROES);
  }
}
