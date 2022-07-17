import { DocumentPdf } from './documents-rs.model';

export interface GosignMiddlewareFlow {
  case: string;
  error?: string;
  description?: string;
  documents?: DocumentPdf[];
  urlSignature?: string;
  envelopSignature?: string;
  bizagiCase?: string;
}
