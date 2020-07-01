import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero/hero';
// import { HEROES } from './hero/mock-heroes';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  public getHeroes(): Observable<Hero[]> {
    // this.messageService.add('HeroService: fetch heroes');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log(`fetched heroes`)),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  public getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id =${id}`))
    );
  }
  public getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id-${id}`;
    return this.http.get<Hero[]>(url).pipe(
      map((heroes) => heroes[0]),
      tap((h) => {
        const outcome = h ? `fetched` : `did not found`;
        this.log(`${outcome} hero id = ${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>(`searchHeroes`))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOPtions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>(`addHero`))
    );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.put(this.heroesUrl, hero, this.httpOPtions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private heroesUrl: string = 'api/heroes';
  public httpOPtions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
