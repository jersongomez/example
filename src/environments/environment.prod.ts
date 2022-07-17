import { version } from '../../package.json';

export const environment = {
  production: true,
  openshift: true,
  version: version,
  kicker: 'assets/config/config.prod.json',
};
