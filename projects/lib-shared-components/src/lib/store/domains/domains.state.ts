export interface Domain {
  id: number;
  code: string;
  domain: string;
  name: string;
  description: string;
  parentCode: string;
  parentDomain: string;
  active: boolean;
}

export interface DomainState {
  domains: Domain[];
}
