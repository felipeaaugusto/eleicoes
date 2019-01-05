import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from './cargo.service';

@Component({
    selector: 'jhi-cargo-update',
    templateUrl: './cargo-update.component.html'
})
export class CargoUpdateComponent implements OnInit {
    cargo: ICargo;
    isSaving: boolean;

    constructor(protected cargoService: CargoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cargo }) => {
            this.cargo = cargo;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cargo.id !== undefined) {
            this.subscribeToSaveResponse(this.cargoService.update(this.cargo));
        } else {
            this.subscribeToSaveResponse(this.cargoService.create(this.cargo));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICargo>>) {
        result.subscribe((res: HttpResponse<ICargo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
