import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

import { AccountService, LoginModalService, LoginService } from 'app/core';
import { IEleicao } from 'app/shared/model/eleicao.model';
import { IVoto } from 'app/shared/model/voto.model';
import { VotoService } from 'app/entities/voto/voto.service';

@Component({
    selector: 'jhi-eleicao-detail',
    templateUrl: './eleicao-detail.component.html'
})
export class EleicaoDetailComponent implements OnInit {
    eleicao: IEleicao;
    votos: IVoto[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected activatedRoute: ActivatedRoute,
        private accountService: AccountService,
        protected votoService: VotoService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ eleicao }) => {
            this.eleicao = eleicao;
        });
        this.votoService.query().subscribe(
            (res: HttpResponse<IVoto[]>) => {
                this.votos = res.body.filter(voto => voto.eleicao.id === this.eleicao.id);
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.getStatusEleicao();
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    getResult() {
        const totalVotes = [];
        if (this.votos) {
            this.votos.forEach((voto, index) => {
                if (totalVotes.indexOf(this.votos[index].cpf) === -1) {
                    totalVotes.push(this.votos[index].cpf);
                }
            });
        }
        return totalVotes.length;
    }

    getStatusEleicao() {
        if (this.eleicao) {
            debugger;
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    previousState() {
        window.history.back();
    }
}
