import { RequestBodyLogWS } from "./requestBodyLogWS";
import { RequestHeaderGeneral } from "./requestHeaderGeneral";

export interface RequestLogWS {
    requestHeader : RequestHeaderGeneral;
    requestBody : RequestBodyLogWS;
}
