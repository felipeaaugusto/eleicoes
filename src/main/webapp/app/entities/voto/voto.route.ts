import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Voto } from 'app/shared/model/voto.model';
import { VotoService } from './voto.service';
import { VotoComponent } from './voto.component';
import { VotoDetailComponent } from './voto-detail.component';
import { VotoUpdateComponent } from './voto-update.component';
import { VotoDeletePopupComponent } from './voto-delete-dialog.component';
import { IVoto } from 'app/shared/model/voto.model';

@Injectable({ providedIn: 'root' })
export class VotoResolve implements Resolve<IVoto> {
    constructor(private service: VotoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Voto> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Voto>) => response.ok),
                map((voto: HttpResponse<Voto>) => voto.body)
            );
        }
        return of(new Voto());
    }
}

export const votoRoute: Routes = [
    {
        path: 'voto',
        component: VotoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Votos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'voto/:id/view',
        component: VotoDetailComponent,
        resolve: {
            voto: VotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Votos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'voto/new',
        component: VotoUpdateComponent,
        resolve: {
            voto: VotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Votos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'voto/:id/edit',
        component: VotoUpdateComponent,
        resolve: {
            voto: VotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Votos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const votoPopupRoute: Routes = [
    {
        path: 'voto/:id/delete',
        component: VotoDeletePopupComponent,
        resolve: {
            voto: VotoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Votos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
