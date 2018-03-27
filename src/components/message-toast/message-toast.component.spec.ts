import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageToastComponent } from './message-toast.component';

describe('MessageToastComponent', () => {
  let component: MessageToastComponent;
  let fixture: ComponentFixture<MessageToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
