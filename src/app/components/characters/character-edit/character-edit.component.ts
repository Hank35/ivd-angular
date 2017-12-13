import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { CharacterService } from '../../../services/character.service';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html'
})
export class CharacterEditComponent implements OnInit {
  id: number;
  editMode = false;
  characterForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private characterService: CharacterService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.characterService.updateCharacter(this.id, this.characterForm.value);
    } else {
      this.characterService.addCharacter(this.characterForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let characterName = '';
    let characterImagePath = '';
    let characterDescription = '';
    let currentcharacter;

    if (this.editMode) {
      this.characterService.getCharacter(this.id)
      .then(
        film => {
        currentcharacter = film;
        characterName = currentcharacter.name;
        characterImagePath = currentcharacter.imagePath;
        characterDescription = currentcharacter.description;
        //  if (currentfilm['ingredients']) {
        //    for (let ingredient of currentfilm.ingredients) {
        //      recipeIngredients.push(
        //        new FormGroup({
        //          'name': new FormControl(ingredient.name, Validators.required),
        //          'amount': new FormControl(ingredient.amount, [
        //            Validators.required,
        //            Validators.pattern(/^[1-9]+[0-9]*$/)
        //          ])
        //        })
        //      );
        //    }
        //  }
        }
      )
      .catch(error => console.log(error));

    }

    this.characterForm = new FormGroup({
      'name': new FormControl(characterName, Validators.required),
      'imagePath': new FormControl(characterImagePath, Validators.required),
      'description': new FormControl(characterDescription, Validators.required),
    });
  }

}
