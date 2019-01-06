import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVoto } from 'app/shared/model/voto.model';
import { AccountService } from 'app/core';
import { VotoService } from './voto.service';

@Component({
    selector: 'jhi-voto',
    templateUrl: './voto.component.html'
})
export class VotoComponent implements OnInit, OnDestroy {
    votos: IVoto[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected votoService: VotoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.votoService.query().subscribe(
            (res: HttpResponse<IVoto[]>) => {
                this.votos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVotos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVoto) {
        return item.id;
    }

    registerChangeInVotos() {
        this.eventSubscriber = this.eventManager.subscribe('votoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
