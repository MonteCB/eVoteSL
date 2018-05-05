import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegCandidateComponent } from './reg-candidate.component';

describe('RegCandidateComponent', () => {
  let component: RegCandidateComponent;
  let fixture: ComponentFixture<RegCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
