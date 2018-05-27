import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SAdminDetailsComponent } from './s-admin-details.component';

describe('SAdminDetailsComponent', () => {
  let component: SAdminDetailsComponent;
  let fixture: ComponentFixture<SAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
