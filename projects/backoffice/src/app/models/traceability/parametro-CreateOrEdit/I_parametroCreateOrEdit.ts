import { requestBody } from './I_requestBody'
import { requestHeader } from './I_requestHeader';

export interface I_ParametrosCreateOrEdit{
  requestHeader: requestHeader,
  requestBody:  requestBody;
}

