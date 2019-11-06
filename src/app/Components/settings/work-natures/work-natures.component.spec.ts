import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkNaturesComponent } from './work-natures.component';

describe('WorkNaturesComponent', () => {
  let component: WorkNaturesComponent;
  let fixture: ComponentFixture<WorkNaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkNaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkNaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
