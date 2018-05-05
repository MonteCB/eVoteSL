import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollOperatorRegisterComponent } from './poll-operator-register.component';

describe('PollOperatorRegisterComponent', () => {
  let component: PollOperatorRegisterComponent;
  let fixture: ComponentFixture<PollOperatorRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollOperatorRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollOperatorRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
