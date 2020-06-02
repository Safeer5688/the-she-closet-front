import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlagCheckerComponent } from './plag-checker.component';

describe('PlagCheckerComponent', () => {
  let component: PlagCheckerComponent;
  let fixture: ComponentFixture<PlagCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlagCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlagCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
