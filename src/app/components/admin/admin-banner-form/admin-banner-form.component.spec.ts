import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBannerFormComponent } from './admin-banner-form.component';

describe('AdminBannerFormComponent', () => {
  let component: AdminBannerFormComponent;
  let fixture: ComponentFixture<AdminBannerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBannerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBannerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
