import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FilmsComponent } from './components/films/films.component';
import { FilmDetailComponent } from './components/films/film-detail/film-detail.component';
import { FilmStartComponent } from './components/films/film-start/film-start.component';
import { FilmEditComponent } from './components/films/film-edit/film-edit.component';
import { HallsComponent } from './components/halls/hall.component';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterDetailComponent } from './components/characters/character-detail/character-detail.component';
import { CharacterStartComponent } from './components/characters/character-start/character-start.component';
import { CharacterEditComponent } from './components/characters/character-edit/character-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full'},
  { path: 'films', component: FilmsComponent, children: [
    { path: '', component: FilmStartComponent },
    { path: 'new', component: FilmEditComponent },
    { path: ':id', component: FilmDetailComponent },
    { path: ':id/edit' , component: FilmEditComponent }
  ] },
  { path: 'characters', component: CharactersComponent, children: [
    { path: '', component: CharacterStartComponent },
    { path: 'new', component: CharactersComponent },
    { path: ':id', component: CharacterDetailComponent },
    { path: ':id/edit' , component: CharacterEditComponent }
  ] },
  { path: 'halls', component: HallsComponent},
  { path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
