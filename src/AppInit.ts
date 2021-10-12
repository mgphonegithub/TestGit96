import { KeycloakService, KeycloakOptions } from 'keycloak-angular';
import { environment } from './environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  const options: KeycloakOptions = {
    config: environment.keycloakConfig,
    initOptions: {
      checkLoginIframe: false,
      checkLoginIframeInterval: 30,
      onLoad: 'login-required',
    },
  };
  return (): Promise<boolean> => keycloak.init(options);
}
