import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegVoterComponent } from './reg-voter.component';

describe('RegVoterComponent', () => {
  let component: RegVoterComponent;
  let fixture: ComponentFixture<RegVoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegVoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegVoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
