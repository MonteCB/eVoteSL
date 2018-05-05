import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBoothComponent } from './create-booth.component';

describe('CreateBoothComponent', () => {
  let component: CreateBoothComponent;
  let fixture: ComponentFixture<CreateBoothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBoothComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBoothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
