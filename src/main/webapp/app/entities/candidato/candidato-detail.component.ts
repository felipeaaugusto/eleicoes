import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ICandidato } from 'app/shared/model/candidato.model';

@Component({
    selector: 'jhi-candidato-detail',
    templateUrl: './candidato-detail.component.html'
})
export class CandidatoDetailComponent implements OnInit {
    candidato: ICandidato;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ candidato }) => {
            this.candidato = candidato;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
