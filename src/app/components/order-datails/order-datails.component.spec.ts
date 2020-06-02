import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDatailsComponent } from './order-datails.component';

describe('OrderDatailsComponent', () => {
  let component: OrderDatailsComponent;
  let fixture: ComponentFixture<OrderDatailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDatailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
