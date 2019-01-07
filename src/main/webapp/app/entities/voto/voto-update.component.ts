import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVoto } from 'app/shared/model/voto.model';
import { VotoService } from './voto.service';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo';
import { ICandidato } from 'app/shared/model/candidato.model';
import { CandidatoService } from 'app/entities/candidato';
import { IEleicao } from 'app/shared/model/eleicao.model';
import { EleicaoService } from 'app/entities/eleicao';

@Component({
    selector: 'jhi-voto-update',
    templateUrl: './voto-update.component.html'
})
export class VotoUpdateComponent implements OnInit {
    voto: IVoto;
    isSaving: boolean;

    cargos: ICargo[];

    candidatoes: ICandidato[];

    eleicaos: IEleicao[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected votoService: VotoService,
        protected cargoService: CargoService,
        protected candidatoService: CandidatoService,
        protected eleicaoService: EleicaoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ voto }) => {
            this.voto = voto;
        });
        this.cargoService.query().subscribe(
            (res: HttpResponse<ICargo[]>) => {
                this.cargos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.candidatoService.query().subscribe(
            (res: HttpResponse<ICandidato[]>) => {
                this.candidatoes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.eleicaoService.query().subscribe(
            (res: HttpResponse<IEleicao[]>) => {
                this.eleicaos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.voto.id !== undefined) {
            this.subscribeToSaveResponse(this.votoService.update(this.voto));
        } else {
            this.subscribeToSaveResponse(this.votoService.create(this.voto));
        }
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

    trackCargoById(index: number, item: ICargo) {
        return item.id;
    }

    trackCandidatoById(index: number, item: ICandidato) {
        return item.id;
    }

    trackEleicaoById(index: number, item: IEleicao) {
        return item.id;
    }
}
