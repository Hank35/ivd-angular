
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
  character: Character[];
  subscription: Subscription;

  constructor(private characterService: CharacterService,
              private router: Router,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
      this.subscription = this.characterService.charactersChanged.subscribe(
          (character: Character[]) => {
              this.character = character;
          }
      );
    this.characterService.getCharacters()
      .then(characters => {
          this.character = characters;
    })
      .catch(error => console.log(error));
  }

  onNewCharacter() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
   }
 }
