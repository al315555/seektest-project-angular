import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcioExperimentComponent } from './inscripcio-experiment.component';

describe('InscripcioExperimentComponent', () => {
  let component: InscripcioExperimentComponent;
  let fixture: ComponentFixture<InscripcioExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcioExperimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcioExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
