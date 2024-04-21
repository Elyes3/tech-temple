import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalMenuItemComponent } from './personal-menu-item.component';

describe('PersonalMenuItemComponent', () => {
  let component: PersonalMenuItemComponent;
  let fixture: ComponentFixture<PersonalMenuItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalMenuItemComponent]
    });
    fixture = TestBed.createComponent(PersonalMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
