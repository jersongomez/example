import { Injectable } from "@angular/core";

@Injectable()
export class ObjectInitializer {

    getDataRequestHeaderGeneral() {
        return {
            codAliado: '001',
            usuarioAliado: 'General',
            sesionId: '',
            ipOrigen: '',
            numeroSolicitudCredito: '',
            tipoIdentificacion: '1',
            identificacion: ''
        }
    }

    getDataBodyLogWS() {
        return {
            methods: ['getValidate'],
            identification_number: '',
            startDate: '',
            endDate: ''
        }
    }
    getLogWS() {
        return {
            requestHeader: this.getDataRequestHeaderGeneral(),
            requestBody: this.getDataBodyLogWS()
        }
    }
    getAdapterDataLogWs() {
        return {
            identificationNumber: '',
            method: '',
            status: '',
            fecha:''
        }
    }

    

}