import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleAssignComponent } from './people-assign.component';

describe('PeopleAssignComponent', () => {
  let component: PeopleAssignComponent;
  let fixture: ComponentFixture<PeopleAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleAssignComponent]
    });
    fixture = TestBed.createComponent(PeopleAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
