import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeQuestionComponent } from './challenge-question.component';

describe('ChallengeQuestionComponent', () => {
  let component: ChallengeQuestionComponent;
  let fixture: ComponentFixture<ChallengeQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChallengeQuestionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
