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
import { ICargo } from 'app/shared/model/cargo.model';

@Component({
    selector: 'jhi-eleicao-register-vote',
    templateUrl: './eleicao-register-vote.component.html'
})
export class EleicaoRegisterVoteComponent implements OnInit {
    eleicao: IEleicao;
    isSaving: boolean;
    voto: IVoto;
    candidatos: ICandidato[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected activatedRoute: ActivatedRoute,
        protected votoService: VotoService,
        protected candidatoService: CandidatoService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ eleicao }) => {
            this.eleicao = eleicao;
        });
        this.activatedRoute.data.subscribe(({ voto }) => {
            this.voto = voto;
        });
        this.candidatoService.query().subscribe(
            (res: HttpResponse<ICandidato[]>) => {
                this.candidatos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    save(cargo) {
        this.isSaving = true;
        if (this.voto.id !== undefined) {
            delete this.voto.id;
        }
        this.voto.eleicao = this.eleicao;
        this.voto.cargo = cargo;
        this.voto.candidato = cargo.candidato;
        this.subscribeToSaveResponse(this.votoService.create(this.voto));
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVoto>>) {
        result.subscribe((res: HttpResponse<IVoto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCandidatoById(index: number, item: ICandidato) {
        return item.id;
    }

    getCandidatosByCargoId(id: number) {
        let candidatos = [];
        if (this.candidatos !== undefined) {
            candidatos = this.candidatos.filter(candidato => candidato.cargo.id === id);
        }
        return candidatos;
    }

    previousState() {
        window.history.back();
    }
}
