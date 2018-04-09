import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellstockComponent } from './sellstock.component';

describe('SellstockComponent', () => {
  let component: SellstockComponent;
  let fixture: ComponentFixture<SellstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
