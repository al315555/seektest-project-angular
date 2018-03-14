import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSpinnerComponent } from './login-spinner.component';

describe('LoginSpinnerComponent', () => {
  let component: LoginSpinnerComponent;
  let fixture: ComponentFixture<LoginSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
