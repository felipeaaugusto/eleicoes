import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEleicao } from 'app/shared/model/eleicao.model';

@Component({
    selector: 'jhi-eleicao-register-vote',
    templateUrl: './eleicao-register-vote.component.html'
})
export class EleicaoRegisterVoteComponent implements OnInit {
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
