import { environment } from './environments/environment';

const getOrigin = (url: string) => {
  try {
    return new URL(url).origin;
  } catch (_) {
    return '';
  }
};

const createMetaTag = (apiServer: any, keycloakConfig: any) => {
  const metaContent = `
    default-src 'self' 'unsafe-eval';
    connect-src 'self' ${getOrigin(keycloakConfig.url)} 
      ${getOrigin(apiServer.backend)} 
      ${getOrigin(apiServer.viability)} 
      ${getOrigin(apiServer.middleware)}
      ${getOrigin(apiServer.getIp)}
      ${getOrigin(apiServer.getIpV2)};
    style-src 'self' 'unsafe-inline';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    frame-src 'self' ${getOrigin(keycloakConfig.url)};
    `;

  var meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = metaContent;
  document.getElementsByTagName('head')[0].appendChild(meta);
};

export const addTagCSP = () => {
  fetch(environment.kicker)
    .then((rs) => {
      if (!rs.ok) {
        throw new Error('HTTP error ' + rs.status);
      }
      return rs.json();
    })
    .then((config) => {
      const { apiServer, keycloakConfig } = config;
      createMetaTag(apiServer, keycloakConfig);
    })
    .catch((err) => {
      createMetaTag({ backend: '', viability: '', middleware: '' }, { url: '' });
      console.error(err);
    });
};
