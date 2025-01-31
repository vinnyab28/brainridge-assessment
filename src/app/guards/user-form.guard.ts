import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  deactive: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const userFormGuard: CanDeactivateFn<CanComponentDeactivate> = (component: CanComponentDeactivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) => {
  return component.deactive() || confirm("Are you sure you wanna go?");
};
