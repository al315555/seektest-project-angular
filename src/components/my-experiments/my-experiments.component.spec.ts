import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExperimentsComponent } from './my-experiments.component';

describe('MyExperimentsComponent', () => {
  let component: MyExperimentsComponent;
  let fixture: ComponentFixture<MyExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
