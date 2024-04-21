import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTemplateComponent } from './tech-template.component';

describe('TechTemplateComponent', () => {
  let component: TechTemplateComponent;
  let fixture: ComponentFixture<TechTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechTemplateComponent]
    });
    fixture = TestBed.createComponent(TechTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
