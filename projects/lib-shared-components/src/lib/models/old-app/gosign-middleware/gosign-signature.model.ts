import { ClientSarlaft, OriginSarlaft } from '../request-sarlaft.model';
import { DocumentPdf } from './documents-rs.model';

export interface GosignSignatureRq {
  origin: OriginSarlaft;
  client: ClientSarlaft;
  documents: DocumentPdf[];
}

export interface GosignSignatureRs {
  url: string;
  externalId: string;
}
