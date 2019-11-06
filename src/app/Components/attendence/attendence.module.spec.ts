import { AttendenceModule } from './attendence.module';

describe('AttendenceModule', () => {
  let attendenceModule: AttendenceModule;

  beforeEach(() => {
    attendenceModule = new AttendenceModule();
  });

  it('should create an instance', () => {
    expect(attendenceModule).toBeTruthy();
  });
});
