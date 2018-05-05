import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainElectionComponent } from './main-election.component';

describe('MainElectionComponent', () => {
  let component: MainElectionComponent;
  let fixture: ComponentFixture<MainElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainElectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
