import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CharacterService } from '../../services/character.service';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [CharacterService]
})
export class CharactersComponent implements OnInit {

  constructor(private characterService: CharacterService) {
  }

  ngOnInit() {
  }

}
