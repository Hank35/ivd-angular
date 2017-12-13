import { Component, OnInit} from '@angular/core';

import { Character } from '../../../models/character.model';
import { CharacterService } from '../../../services/character.service';
import { ActivatedRoute,Router, Params } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html'
})
export class CharacterDetailComponent implements OnInit {
  character: Character;
  id: number;

  constructor(private characterService: CharacterService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    console.log('constructor');
   }

  ngOnInit() {
    console.log('init');
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.characterService.getCharacter(this.id)
            .then(character => this.character = character)
            .catch(error => console.log(error));
        }
      );
  }


  onEditCharacter() {
    this.router.navigate(['edit'], {relativeTo: this.route} )
  }

  onDeleteCharacter() {
    this.characterService.deleteCharacter(this.id);
    this.router.navigate(['/character']);
  }
}
