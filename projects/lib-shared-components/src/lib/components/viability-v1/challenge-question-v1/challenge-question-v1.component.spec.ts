import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeQuestionV1Component } from './challenge-question-v1.component';

describe('ChallengeQuestionV1Component', () => {
  let component: ChallengeQuestionV1Component;
  let fixture: ComponentFixture<ChallengeQuestionV1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengeQuestionV1Component],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeQuestionV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
