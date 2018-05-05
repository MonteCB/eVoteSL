import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothLoginComponent } from './booth-login.component';

describe('BoothLoginComponent', () => {
  let component: BoothLoginComponent;
  let fixture: ComponentFixture<BoothLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
