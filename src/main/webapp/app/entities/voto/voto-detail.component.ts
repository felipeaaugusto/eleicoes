import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVoto } from 'app/shared/model/voto.model';

@Component({
    selector: 'jhi-voto-detail',
    templateUrl: './voto-detail.component.html'
})
export class VotoDetailComponent implements OnInit {
    voto: IVoto;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ voto }) => {
            this.voto = voto;
        });
    }

    previousState() {
        window.history.back();
    }
}
