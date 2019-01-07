import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

import { IEleicao } from 'app/shared/model/eleicao.model';
import { ICandidato } from 'app/shared/model/candidato.model';
import { CandidatoService } from 'app/entities/candidato';

@Component({
    selector: 'jhi-eleicao-register-vote',
    templateUrl: './eleicao-register-vote.component.html'
})
export class EleicaoRegisterVoteComponent implements OnInit {
    eleicao: IEleicao;
    candidatos: ICandidato[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected activatedRoute: ActivatedRoute,
        protected candidatoService: CandidatoService
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ eleicao }) => {
            this.eleicao = eleicao;
        });
        this.candidatoService.query().subscribe(
            (res: HttpResponse<ICandidato[]>) => {
                this.candidatos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCandidatoById(index: number, item: ICandidato) {
        return item.id;
    }

    previousState() {
        window.history.back();
    }
}
