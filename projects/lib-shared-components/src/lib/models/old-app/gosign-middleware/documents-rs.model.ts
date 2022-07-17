export interface DocumentTagAppearance {
  tagCornerType: string;
  startTagPattern: string;
  tagXOffset: number;
  tagYOffset: number;
}

export interface DocumentPosition {
  tagAppearance: DocumentTagAppearance;
}

export interface DocumentPdf {
  bytes: string;
  description: string;
  mimeType: string;
  originalFname: string;
  position: DocumentPosition;
}

export interface DocumentsPdfRs {
  documents: DocumentPdf[];
}
