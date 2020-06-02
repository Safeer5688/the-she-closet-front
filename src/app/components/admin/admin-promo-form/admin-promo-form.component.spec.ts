import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromoFormComponent } from './admin-promo-form.component';

describe('AdminPromoFormComponent', () => {
  let component: AdminPromoFormComponent;
  let fixture: ComponentFixture<AdminPromoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPromoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPromoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
