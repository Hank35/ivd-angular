import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {

  constructor(CharacterService: CharacterService) { }

  ngOnInit() {
  }

}
