import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingBoothComponent } from './polling-booth.component';

describe('PollingBoothComponent', () => {
  let component: PollingBoothComponent;
  let fixture: ComponentFixture<PollingBoothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollingBoothComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
