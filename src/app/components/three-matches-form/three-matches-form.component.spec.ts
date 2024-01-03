import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeMatchesFormComponent } from './three-matches-form.component';

describe('ThreeMatchesFormComponent', () => {
  let component: ThreeMatchesFormComponent;
  let fixture: ComponentFixture<ThreeMatchesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeMatchesFormComponent]
    });
    fixture = TestBed.createComponent(ThreeMatchesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
