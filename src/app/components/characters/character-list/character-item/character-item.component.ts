import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../../../models/character.model';
import { CharacterService } from '../../../../services/character.service';
@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CharacterItemComponent implements OnInit {
  @Input() character: Character;
  @Input() index: number;


  constructor(private characterService: CharacterService) { }

  ngOnInit() {
  }
}
