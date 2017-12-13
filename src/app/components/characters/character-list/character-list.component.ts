import { Component, OnInit, OnDestroy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../services/character.service';
import { Character } from '../../../models/character.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters: Character[];
  subscription: Subscription;

  constructor(private characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.subscription = this.characterService.charactersChanged.subscribe(
          (characters: Character[]) => {
              this.characters = characters;
          }
      );
    this.characterService.getCharacters()
      .then(characters => {
          this.characters = characters;
    })
      .catch(error => console.log(error));
  }

  // tslint:disable-next-line:one-line
  onNewCharacter(){
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }
}
