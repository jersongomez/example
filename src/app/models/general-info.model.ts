export interface GeneralInfoStatus {
  title: string;
  value: string;
}

export interface GeneralInfoContent {
  title?: string;
  subtitle?: string;
  status?: GeneralInfoStatus[];
}

export interface GeneralInfo {
  titletext?: string;
  text?: string;
  title?: string;
  subtitle?: string;
  img?: string;
  content?: GeneralInfoContent;
}

export interface DocumentDownload {
  bytes: string;
  description: string;
  originalFname: string;
}
