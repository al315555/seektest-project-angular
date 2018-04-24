import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposInvestComponent } from './grupos-invest.component';

describe('GruposInvestComponent', () => {
  let component: GruposInvestComponent;
  let fixture: ComponentFixture<GruposInvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposInvestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
