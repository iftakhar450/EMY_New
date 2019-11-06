import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalaryReportComponent } from './monthly-salary-report.component';

describe('MonthlySalaryReportComponent', () => {
  let component: MonthlySalaryReportComponent;
  let fixture: ComponentFixture<MonthlySalaryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlySalaryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySalaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
