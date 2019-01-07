import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IEleicao } from 'app/shared/model/eleicao.model';
import { ICandidato } from 'app/shared/model/candidato.model';
import { CandidatoService } from 'app/entities/candidato';
import { IVoto } from 'app/shared/model/voto.model';
import { VotoService } from 'app/entities/voto/voto.service';

@Component({
    selector: 'jhi-eleicao-register-vote',
    templateUrl: './eleicao-register-vote.component.html'
})
export class EleicaoRegisterVoteComponent implements OnInit {
    eleicao: IEleicao;
    voto: IVoto;
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

    getCandidatosByCargoId(id: number) {
        return this.candidatos.filter(candidato => candidato.cargo.id === id);
    }

    previousState() {
        window.history.back();
    }
}
