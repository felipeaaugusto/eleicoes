import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ICandidato } from 'app/shared/model/candidato.model';
import { CandidatoService } from './candidato.service';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo';

@Component({
    selector: 'jhi-candidato-update',
    templateUrl: './candidato-update.component.html'
})
export class CandidatoUpdateComponent implements OnInit {
    candidato: ICandidato;
    isSaving: boolean;

    cargos: ICargo[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected candidatoService: CandidatoService,
        protected cargoService: CargoService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ candidato }) => {
            this.candidato = candidato;
        });
        this.cargoService.query().subscribe(
            (res: HttpResponse<ICargo[]>) => {
                this.cargos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.candidato, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.candidato.id !== undefined) {
            this.subscribeToSaveResponse(this.candidatoService.update(this.candidato));
        } else {
            this.subscribeToSaveResponse(this.candidatoService.create(this.candidato));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICandidato>>) {
        result.subscribe((res: HttpResponse<ICandidato>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
