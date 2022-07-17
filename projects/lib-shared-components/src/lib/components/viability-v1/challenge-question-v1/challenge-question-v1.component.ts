import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/shared/utils.service';

import * as models from '../../../models/old-app';
import { ValidationV1Service } from '../../../services/viability-v1/validation-v1.service';
import { ViabilityV1Service } from '../../../services/viability-v1/viability-v1.service';

@Component({
  selector: 'lib-challenge-question-v1',
  templateUrl: './challenge-question-v1.component.html',
  styleUrls: ['./challenge-question-v1.component.scss'],
})
export class ChallengeQuestionV1Component implements OnInit, OnDestroy {
  public form: FormGroup;
  public touched$: Subscription;
  public preguntas: models.Pregunta[] = [];
  public currenQuestion: models.Pregunta = new models.Pregunta();
  public responseQuestion: models.RespuestaQuestion[] = [];
  public i: number;
  constructor(
    public utils: UtilsService,
    public viabilityService: ViabilityV1Service,
    public validationService: ValidationV1Service
  ) {}

  ngOnInit() {
    this.initializerForm();
    this.fillQuestions();
    this.process();
  }

  ngOnDestroy(): void {
    this.touched$.unsubscribe();
  }

  private initializerForm() {
    this.form = new FormGroup({
      answers: new FormControl('', Validators.required),
    });
  }

  public fillQuestions() {
    this.validationService.Request.requestBody.idCuestionario = this.validationService.cuestionario.id;
    this.validationService.Request.requestBody.regCuestionario = this.validationService.cuestionario.registro;
    this.preguntas = this.validationService.cuestionario.pregunta;
    this.i = 0;
    this.currenQuestion = this.preguntas[this.i];
  }

  public process() {
    this.touched$ = this.viabilityService.touched$.subscribe((touched) => {
      if (touched) {
        if (this.form.valid) {
          let response: models.RespuestaQuestion = new models.RespuestaQuestion();
          response.idPregunta = this.currenQuestion.orden.toString();
          response.idRespuesta = this.form.value.answers;
          this.initializerForm();
          this.validationService.Request.requestBody.respuestas.push(response);
          this.i++;
          if (this.i < this.preguntas.length) {
            this.currenQuestion = this.preguntas[this.i];
          } else {
            this.validateQuestions();
          }
        } else this.utils.markFormGroupTouched(this.form);
      }
    });
  }

  public validateQuestions() {
    this.viabilityService.progress = true;
    this.validationService.validateQuestions().subscribe(
      (response) => {
        this.viabilityService.process$.emit(response);
      },
      (error) => {
        this.viabilityService.process$.error(error);
      }
    );
  }
}
