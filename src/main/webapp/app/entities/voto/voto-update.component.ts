import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVoto } from 'app/shared/model/voto.model';
import { VotoService } from './voto.service';

@Component({
    selector: 'jhi-voto-update',
    templateUrl: './voto-update.component.html'
})
export class VotoUpdateComponent implements OnInit {
    voto: IVoto;
    isSaving: boolean;

    constructor(protected votoService: VotoService, protected activatedRoute: ActivatedRoute, public activeModal: NgbActiveModal) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ voto }) => {
            this.voto = voto;
        });
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
}
