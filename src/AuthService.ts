import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private keycloakService: KeycloakService) { }

  getLoggedUser() {
    try {
      let userDetails =
        this.keycloakService.getKeycloakInstance().idTokenParsed;
      return userDetails;
    } catch (e) {
      return undefined;
    }
  }

  logout() {
    this.keycloakService.logout();
  }

  redirectToProfile() {
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }
}
