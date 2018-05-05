import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollWorkerLoginComponent } from './poll-worker-login.component';

describe('PollWorkerLoginComponent', () => {
  let component: PollWorkerLoginComponent;
  let fixture: ComponentFixture<PollWorkerLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollWorkerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollWorkerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
