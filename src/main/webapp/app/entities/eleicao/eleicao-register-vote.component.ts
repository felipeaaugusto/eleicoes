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
    isSaving: boolean;
    voto: IVoto;
    candidatos: ICandidato[];
    candidatosVotos: ICandidato[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected activatedRoute: ActivatedRoute,
        protected votoService: VotoService,
        protected candidatoService: CandidatoService
    ) {}

    ngOnInit() {
        this.candidatosVotos = [];
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ eleicao }) => {
            this.eleicao = eleicao;
        });

        this.activatedRoute.data.subscribe(({ voto }) => {
            this.voto = voto;
        });
        this.voto.protocolo = this.hashGenerator();
        this.candidatoService.query().subscribe(
            (res: HttpResponse<ICandidato[]>) => {
                this.candidatos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    hashGenerator() {
        let text = '';
        let charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 16; i++) {
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return this.putDashEveryFourCharacters(text);
    }

    putDashEveryFourCharacters(input) {
        let output = '';
        let idx = 0;
        let format = [4, 4, 4];
        for (let i = 0; i < format.length && idx < input.length; i++) {
            output += input.substr(idx, format[i]);
            if (idx + format[i] < input.length) output += '-';
            idx += format[i];
        }
        output += input.substr(idx);
        return output;
    }

    setCandidatoList(candidato: ICandidato, cargoId) {
        let duplicados = [];
        if (candidato != null) {
            duplicados = this.candidatosVotos.filter(candidatoVoto => candidatoVoto.cargo.id === cargoId);
            if (duplicados.length > 0) {
                duplicados[0] = candidato;
            } else {
                this.candidatosVotos.push(candidato);
            }
        } else {
            if (this.candidatosVotos.length > 0) {
                this.candidatosVotos.forEach((candidatoVoto, index) => {
                    if (candidatoVoto.cargo.id == cargoId) {
                        this.candidatosVotos.splice(index, 1);
                    }
                });
            }
        }
    }

    save() {
        this.candidatosVotos.forEach(candidatoVoto => {
            this.isSaving = true;
            if (this.voto.id !== undefined) {
                delete this.voto.id;
            }
            this.voto.eleicao = this.eleicao;
            this.voto.cargo = candidatoVoto.cargo;
            this.voto.candidato = candidatoVoto;
            this.subscribeToSaveResponse(this.votoService.create(this.voto));
        });
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVoto>>) {
        result.subscribe((res: HttpResponse<IVoto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
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
