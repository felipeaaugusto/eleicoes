import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IEleicao } from 'app/shared/model/eleicao.model';
import { EleicaoService } from './eleicao.service';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo';

@Component({
    selector: 'jhi-eleicao-update',
    templateUrl: './eleicao-update.component.html'
})
export class EleicaoUpdateComponent implements OnInit {
    eleicao: IEleicao;
    isSaving: boolean;

    cargos: ICargo[];
    dataInicioDp: any;
    dataFimDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected eleicaoService: EleicaoService,
        protected cargoService: CargoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ eleicao }) => {
            this.eleicao = eleicao;
        });
        this.cargoService.query().subscribe(
            (res: HttpResponse<ICargo[]>) => {
                this.cargos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.eleicao.id !== undefined) {
            this.subscribeToSaveResponse(this.eleicaoService.update(this.eleicao));
        } else {
            this.subscribeToSaveResponse(this.eleicaoService.create(this.eleicao));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEleicao>>) {
        result.subscribe((res: HttpResponse<IEleicao>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
