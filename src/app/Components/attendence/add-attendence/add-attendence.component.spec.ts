import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendenceComponent } from './add-attendence.component';

describe('AddAttendenceComponent', () => {
  let component: AddAttendenceComponent;
  let fixture: ComponentFixture<AddAttendenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAttendenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
