import { ResponseLogWSServiceBody } from "./responseLogWSServiceBody";

export interface ResponseLogWSService {

    id: string,
    method: string,
    identificationNumber: string,
    request: string,
    response: ResponseLogWSServiceBody,
    error: string,
    dateRequest: string
}