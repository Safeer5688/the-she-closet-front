import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignGeneratorComponent } from './design-generator.component';

describe('DesignGeneratorComponent', () => {
  let component: DesignGeneratorComponent;
  let fixture: ComponentFixture<DesignGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
