import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard  {

  constructor(protected router: Router, protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }
  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return new Promise(async (resolve, reject) =>{
      if(!this.authenticated){
        this.keycloakAngular.login();
        return;
      }

      const requiredRoles = route.data.roles;
      let granted: boolean = false;
      
      if(!requiredRoles || requiredRoles.length === 0){
        granted =  true;
      } else {
        for(const requiredRole of requiredRoles){
          granted = true;
          break;
        }
      }
      if(!granted){
        resolve(granted);
      }
      resolve(granted);
      return this.authenticated;

    })
  }
}
