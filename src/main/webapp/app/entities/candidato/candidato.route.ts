import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Candidato } from 'app/shared/model/candidato.model';
import { CandidatoService } from './candidato.service';
import { CandidatoComponent } from './candidato.component';
import { CandidatoDetailComponent } from './candidato-detail.component';
import { CandidatoUpdateComponent } from './candidato-update.component';
import { CandidatoDeletePopupComponent } from './candidato-delete-dialog.component';
import { ICandidato } from 'app/shared/model/candidato.model';

@Injectable({ providedIn: 'root' })
export class CandidatoResolve implements Resolve<ICandidato> {
    constructor(private service: CandidatoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Candidato> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Candidato>) => response.ok),
                map((candidato: HttpResponse<Candidato>) => candidato.body)
            );
        }
        return of(new Candidato());
    }
}

export const candidatoRoute: Routes = [
    {
        path: 'candidato',
        component: CandidatoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Candidatoes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'candidato/:id/view',
        component: CandidatoDetailComponent,
        resolve: {
            candidato: CandidatoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Candidatoes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'candidato/new',
        component: CandidatoUpdateComponent,
        resolve: {
            candidato: CandidatoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Candidatoes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'candidato/:id/edit',
        component: CandidatoUpdateComponent,
        resolve: {
            candidato: CandidatoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Candidatoes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const candidatoPopupRoute: Routes = [
    {
        path: 'candidato/:id/delete',
        component: CandidatoDeletePopupComponent,
        resolve: {
            candidato: CandidatoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Candidatoes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
