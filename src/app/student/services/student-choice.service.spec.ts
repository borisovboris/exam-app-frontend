import { TestBed } from '@angular/core/testing';

import { StudentChoiceService } from './student-choice.service';

describe('StudentChoiceService', () => {
  let service: StudentChoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentChoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
