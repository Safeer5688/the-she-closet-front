import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendForgetPasswordLinkComponent } from './send-forget-password-link.component';

describe('SendForgetPasswordLinkComponent', () => {
  let component: SendForgetPasswordLinkComponent;
  let fixture: ComponentFixture<SendForgetPasswordLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendForgetPasswordLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendForgetPasswordLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
