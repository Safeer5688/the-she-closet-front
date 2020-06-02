import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendVerificationLinkComponent } from './send-verification-link.component';

describe('SendVerificationLinkComponent', () => {
  let component: SendVerificationLinkComponent;
  let fixture: ComponentFixture<SendVerificationLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendVerificationLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendVerificationLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
