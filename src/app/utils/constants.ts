export class Constants {
  // login with keycload
  public static readonly REALM = 'realm';
  public static readonly LOGIN_REQUIRED = 'login-required';
  public static readonly ASSETS = '/assets';
  public static readonly CLIENTS_PUBLIC = '/public';
  public static readonly STORAGE_NOT_AVAILABLE = 'Storage no disponible';
  public static readonly ERROR_SESSION = 'Fallo inicio de session';
  // aliados
  public static readonly NOMBRE_ALIADO = 'nombreAliado';
  public static readonly ALIADO_O3 = 'o3mobility';
  public static readonly ALIADO_SPECIALIZED = 'specialized';
  public static readonly ALIADO_COLSANITAS = 'colsanitas';
  public static readonly ALIADO_AUTOMUNDIAL = 'automundial';
  public static readonly PUBLIC = 'public';
  public static readonly ALIADO_PARAISO = 'paraiso';
  public static readonly ALIADO_GAES = 'gaes';
  public static readonly ALIADO_CEMEX = 'cemex';
  public static readonly ALIADO_PLATZI = 'platzi';
  public static readonly ALIADO_MUEBLES_Y_ACCESORIOS = 'mueblesyaccesorios';

  // backoffice
  public static readonly BACK_OFFICE = 'backoffice';

  // variable de session
  public static readonly ALIADO_SESSION = 'aliadosession';
  public static readonly PARAMETROS_SESSION = 'parametrosAliado';

  // domains
  public static readonly DOMAIN = 'domain';
  public static readonly DOMAIN_IDENTIFICACION = 'IDENTIFICACION';
  public static readonly DOMAIN_CIVIL_STATUS = 'ESTADO_CIVIL';
  public static readonly DOMAIN_ACTIVIDAD_ECONOMICA = 'ACTIVIDAD_ECONOMICA';
  public static readonly TYPE_CONTRACT = 'TIPOCONTRATO';
  public static readonly DEPARMENTS_CITIES = 'DEPARMENTS_CITIES';

  // Validaciones y formulario
  public static readonly PATTER_NUMBER = '/[^0-9]*/g';
  public static readonly REG_PATTER_NUMBER = new RegExp(Constants.PATTER_NUMBER);
  public static readonly PATTER_LETTER = '/[^a-zA-Zs]*/g';
  public static readonly REG_PATTER_LETTER = new RegExp(Constants.PATTER_LETTER);
  public static readonly ALIADO = 'aliado';
  public static readonly PATTER_EMAIL = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$');

  public static readonly MAS = 'MAS';
  public static readonly MENOS = 'MENOS';

  public static readonly STATUS_VALID = 'VALID';
  public static readonly STATUS_INVALID = 'INVALID';

  // titulos
  public static readonly O3TITLE = 'O3 Smart Cities';
  public static readonly PARAISOTITLE = 'Colchones Paraiso';
  public static readonly PLATZITITLE = 'Platzi';
  public static readonly SPECIALIZEDTITLE = 'Specialized';
  public static readonly COLSANITASTITLE = 'Colsanitas';

  // parametros
  public static readonly MONTO = 'monto';
  public static readonly PORCENTAJE = 'porcentaje';
  public static readonly MIN = 'min';
  public static readonly MAX = 'max';
  public static readonly MINBQUILLA = 'minBquilla';
  public static readonly TASA = 'tasa';
  public static readonly BIZAGI = 'bizagi';
  public static readonly DEALER_ACCOUNT = 'aliadodesembolso';
  public static readonly DEALER_AGREEMENT = 'convenioconsumo';

  // process
  public static readonly DICTUM = 'dictum';

  // flujo de viabilizacion
  public static readonly VALIDATE_IDENTITY = 'validateIdentity';
  public static readonly VALIDATE_OTP_IDENTITY = 'validateotpidentity';
  public static readonly CHALLENGE_QUESTION = 'challengequestion';
  public static readonly VIABILITY = 'viability';
  public static readonly RESULT_FEASIBILITY = 'resultfeasibility';
  public static readonly SARLAFT_QUESTIONS = 'sarlaftquestions';
  public static readonly SIGN_INFORMATION = 'signinformation';
  public static readonly APPLICATION_APROVED = 'applicationapproved';
  public static readonly PROCESS_ERROR = 'processerror';
  public static readonly UNIDENTIFIED = 'unidentified';
  public static readonly PROGRESS = 'progress';
  public static readonly SIGN_PROCESS_ENDED = 'SIGN_PROCESS_ENDED';

  //Images
  public static readonly PATH_BAD_BUSINESSMAN = 'assets/bussinesManBad.jpeg';
  public static readonly PATH_GOOD_BUSINESSMAN = 'assets/viability/success-viability.png';

  //GosignMiddleware
  public static readonly GOSIGN_MIDDLEWARE_SERVICE_ERROR = 'GOSIGN_MIDDLEWARE_SERVICE_ERROR';
  public static readonly GOSIGN_MIDDLEWARE_MANUAL_SIGNATURE = 'GOSIGN_MIDDLEWARE_MANUAL_SIGNATURE';
  public static readonly GOSIGN_MIDDLEWARE_DOWNLOAD_DOCUMENTS = 'GOSIGN_MIDDLEWARE_DOWNLOAD_DOCUMENTS';
  public static readonly GOSIGN_MIDDLEWARE_URL_ENVELOP = 'GOSIGN_MIDDLEWARE_URL_ENVELOP';
  public static readonly GOSIGN_MIDDLEWARE_ENVELOP = 'GOSIGN_MIDDLEWARE_ENVELOP';
}
