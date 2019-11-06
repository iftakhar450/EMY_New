import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateattendenceComponent } from './updateattendence.component';

describe('UpdateattendenceComponent', () => {
  let component: UpdateattendenceComponent;
  let fixture: ComponentFixture<UpdateattendenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateattendenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateattendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
