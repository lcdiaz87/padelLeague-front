import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTableComponent } from './match-table.component';

describe('MatchTableComponent', () => {
  let component: MatchTableComponent;
  let fixture: ComponentFixture<MatchTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatchTableComponent]
    });
    fixture = TestBed.createComponent(MatchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
