import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningTableComponent } from './running-table.component';

describe('RunningTableComponent', () => {
  let component: RunningTableComponent;
  let fixture: ComponentFixture<RunningTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RunningTableComponent]
    });
    fixture = TestBed.createComponent(RunningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
