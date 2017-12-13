import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Character } from '../models/character.model';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class CharacterService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/character'; // URL to web api
  private characters: Character[] = [];

  charactersChanged = new Subject<Character[]>();

  //
  //
  //
  constructor(private http: Http) {
    // this.readFilms();
   }

  //
  //
  //
  public getCharacters(): Promise<Character[]> {
    console.log('characters ophalen van server');
    return this.http.get(this.serverUrl, { headers: this.headers })
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.characters = response.json() as Character[];
        return this.characters;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  // private readFilms() {

  //   console.log('readFilms');

  //   this.http.get(this.serverUrl)
  //       .map((response: Response) => {
  //       console.log('map');
  //       const films: Film[] = response.json();
  //       return films;
  //       })
  //       .subscribe((films: Film[]) => {
  //       console.log('subscribe');
  //       this.films = films;
  //       console.dir(this.films);
  //       this.filmsChanged.next(this.films.slice());
  //       });
  //     }

  public getCharacter(index: number): Promise<Character> {
    console.log('character ophalen met id');
    return this.http.get(this.serverUrl + '/' + this.characters[index]._id, { headers: this.headers })
      .toPromise()
      .then(response => {
          console.dir(response.json());
          return response.json() as Character;
      })
      .catch( error => {
          return this.handleError(error);
      });
}

// tslint:disable-next-line:one-line
public updateCharacter(index: number, newCharacter: Character){
    console.log('character updaten');
    this.http.put(this.serverUrl + '/' + this.characters[index]._id, { name: newCharacter.name, description: newCharacter.description, imagePath: newCharacter.imagePath })
      .toPromise()
      .then( () => {
        console.log('character veranderd');
        this.getCharacters()
        .then(
          character => {
            this.characters = character;
            this.charactersChanged.next(this.characters.slice());
          }
        )
        .catch(error => console.log(error));
      })
      .catch( error => { return this.handleError(error) } );
  }

  public deleteCharacter(index: number) {
    console.log('Character verwijderen');
    this.http.delete(this.serverUrl + '' + this.characters[index]._id)
      .toPromise()
      .then( () => {
        console.log('Character verwijderd');
        this.getCharacters()
        .then(
          characters => {
            this.characters = characters;
            this.charactersChanged.next(this.characters.slice());
          }
        )
        .catch(error => console.log(error));
      })
      .catch( error => { return this.handleError(error) } );
  }

  public addCharacter(character: Character) {
    console.log('Character opslaan');
    this.http.post(this.serverUrl, { name: character.name, description: character.description, imagePath: character.imagePath })
      .toPromise()
      .then( () => {
        console.log('Character toegevoegd');
        this.getCharacters()
        .then(
            characters => {
                this.characters = characters;
                this.charactersChanged.next(this.characters.slice());
              }
        )
        .catch(error => console.log(error));
      }
      )
      .catch( error => { return this.handleError(error) } );
}

  //
  //
  //
  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }

}