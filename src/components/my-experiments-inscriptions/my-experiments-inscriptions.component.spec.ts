import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyExperimentsInscriptionsComponent} from './my-experiments-inscriptions.component';

describe('MyExperimentsComponent', () => {
  let component: MyExperimentsInscriptionsComponent;
  let fixture: ComponentFixture<MyExperimentsInscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyExperimentsInscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyExperimentsInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
