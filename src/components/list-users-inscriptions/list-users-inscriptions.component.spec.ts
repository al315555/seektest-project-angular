import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersInscriptionsComponent } from './list-users-inscriptions.component';

describe('ListUsersInscriptionsComponent', () => {
  let component: ListUsersInscriptionsComponent;
  let fixture: ComponentFixture<ListUsersInscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUsersInscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUsersInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
