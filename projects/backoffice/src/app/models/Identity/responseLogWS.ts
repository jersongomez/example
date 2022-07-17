import { ResponseLogWSService } from "./responseLogWSService";

export interface ResponseLogWS {

    codRespuesta: number,
    respuestaServicio : ResponseLogWSService[],
    mensajeError: string
}
