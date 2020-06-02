import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBannerEditComponent } from './admin-banner-edit.component';

describe('AdminBannerEditComponent', () => {
  let component: AdminBannerEditComponent;
  let fixture: ComponentFixture<AdminBannerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBannerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBannerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
