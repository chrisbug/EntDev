import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuystockComponent } from './buystock.component';

describe('BuystockComponent', () => {
  let component: BuystockComponent;
  let fixture: ComponentFixture<BuystockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuystockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuystockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
