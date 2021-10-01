import { TestBed } from '@angular/core/testing';

import { StudentQuestionService } from './student-question.service';

describe('StudentQuestionService', () => {
  let service: StudentQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
