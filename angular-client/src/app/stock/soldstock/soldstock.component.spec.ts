import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldstockComponent } from './soldstock.component';

describe('SoldstockComponent', () => {
  let component: SoldstockComponent;
  let fixture: ComponentFixture<SoldstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
