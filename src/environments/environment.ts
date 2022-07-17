import { version } from '../../package.json';

export const environment = {
  production: false,
  openshift: false,
  version: version,
  kicker: 'assets/config/config.dev.json',
};
