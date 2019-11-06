import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAndProfessionComponent } from './department-and-profession.component';

describe('DepartmentAndProfessionComponent', () => {
  let component: DepartmentAndProfessionComponent;
  let fixture: ComponentFixture<DepartmentAndProfessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentAndProfessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAndProfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
