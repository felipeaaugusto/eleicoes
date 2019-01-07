import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Eleicao } from 'app/shared/model/eleicao.model';
import { EleicaoService } from './eleicao.service';
import { EleicaoComponent } from './eleicao.component';
import { EleicaoDetailComponent } from './eleicao-detail.component';
import { EleicaoUpdateComponent } from './eleicao-update.component';
import { EleicaoDeletePopupComponent } from './eleicao-delete-dialog.component';
import { EleicaoRegisterVoteComponent } from './eleicao-register-vote.component';
import { IEleicao } from 'app/shared/model/eleicao.model';
import { Voto } from 'app/shared/model/voto.model';
import { VotoService } from 'app/entities/voto/voto.service';
import { IVoto } from 'app/shared/model/voto.model';

@Injectable({ providedIn: 'root' })
export class EleicaoResolve implements Resolve<IEleicao> {
    constructor(private service: EleicaoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Eleicao> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Eleicao>) => response.ok),
                map((eleicao: HttpResponse<Eleicao>) => eleicao.body)
            );
        }
        return of(new Eleicao());
    }
}

@Injectable({ providedIn: 'root' })
export class VotoResolve implements Resolve<IVoto> {
    constructor(private service: VotoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Voto> {
        return of(new Voto());
    }
}

export const eleicaoRoute: Routes = [
    {
        path: 'eleicao',
        component: EleicaoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eleições'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'eleicao/:id/view',
        component: EleicaoDetailComponent,
        resolve: {
            eleicao: EleicaoResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Eleições'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'eleicao/new',
        component: EleicaoUpdateComponent,
        resolve: {
            eleicao: EleicaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eleições'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'eleicao/:id/edit',
        component: EleicaoUpdateComponent,
        resolve: {
            eleicao: EleicaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eleições'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'eleicao/:id/vote',
        component: EleicaoRegisterVoteComponent,
        resolve: {
            eleicao: EleicaoResolve,
            voto: VotoResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Eleições'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const eleicaoPopupRoute: Routes = [
    {
        path: 'eleicao/:id/delete',
        component: EleicaoDeletePopupComponent,
        resolve: {
            eleicao: EleicaoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eleições'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
