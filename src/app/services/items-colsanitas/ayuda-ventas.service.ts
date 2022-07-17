import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AyudaVentasServiceColsanitas {
  itemsAyuda = [
    {
      id: 1,
      descripcion:
        'Pídele que firme el formulario con la autorización de consulta en centrales de riesgo, ya que necesitamos saber su comportamiento en el sistema financiero. El formulario es el siguiente:',
      imagen: 'ayudaUno.png',
    },
    {
      id: 2,
      descripcion: 'Llena la siguiente información :',
      imagen: 'ayudaDos.png',
    },
    {
      id: 3,
      descripcion: 'Selecciona una cuota y veras el detalle:',
      imagen: 'ayudaTres.png',
    },
    {
      id: 4,
      descripcion: 'Llena los datos para autenticar y click en el boton Siguiente:',
      imagen: 'validation-flow.PNG',
    },
    {
      id: 5,
      descripcion: 'Ingresa otp o responde las preguntas y click en el boton Siguiente:',
      imagen: 'validation-otp-flow.PNG',
    },
    {
      id: 6,
      descripcion: 'Llena los datos de viabilización y click en el boton Siguiente:',
      imagen: 'viability-flow.PNG',
    },
    {
      id: 7,
      descripcion: 'Saldra si el cliente es viable o no:',
      imagen: 'viability-success-flow.PNG',
    },
    {
      id: 8,
      descripcion: 'Llena los siguientes datos y click en el boton Siguiente:',
      imagen: 'sarlaft-flow.PNG',
    },
    {
      id: 9,
      descripcion: 'Finaliza realizando firma digital: ',
      imagen: 'sarlaft-success-flow.PNG',
    },
  ];
  tipsVentas = [
    {
      id: 1,
      titulo: 'Sencillo',
      descripcion: 'Aprobación inmediata. Obtén una decisión crediticia en instantes, sin papeleo.',
      imagen: 'tipUno.png',
    },
    {
      id: 2,
      titulo: 'Personal',
      descripcion: 'Plazos convenientes y amplia financiación de acuerdo a las necesidades de tu cliente.',
      imagen: 'tipDos.png',
    },
    {
      id: 3,
      titulo: 'Justo',
      descripcion: 'Baja tasa de interés a término fijo, contamos con una amplia red de puntos de pago.',
      imagen: 'tipTres.png',
    },
  ];

  constructor() {}
}
