import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEleicao } from 'app/shared/model/eleicao.model';

@Component({
    selector: 'jhi-eleicao-detail',
    templateUrl: './eleicao-detail.component.html'
})
export class EleicaoDetailComponent implements OnInit {
    eleicao: IEleicao;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ eleicao }) => {
            this.eleicao = eleicao;
        });
    }

    previousState() {
        window.history.back();
    }
}
