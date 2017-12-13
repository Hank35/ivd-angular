import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterStartComponent } from './character-start.component';

describe('CharacterStartComponent', () => {
  let component: CharacterStartComponent;
  let fixture: ComponentFixture<CharacterStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
