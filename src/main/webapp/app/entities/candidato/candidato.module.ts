import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EleicoesSharedModule } from 'app/shared';
import {
    CandidatoComponent,
    CandidatoDetailComponent,
    CandidatoUpdateComponent,
    CandidatoDeletePopupComponent,
    CandidatoDeleteDialogComponent,
    candidatoRoute,
    candidatoPopupRoute
} from './';

const ENTITY_STATES = [...candidatoRoute, ...candidatoPopupRoute];

@NgModule({
    imports: [EleicoesSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CandidatoComponent,
        CandidatoDetailComponent,
        CandidatoUpdateComponent,
        CandidatoDeleteDialogComponent,
        CandidatoDeletePopupComponent
    ],
    entryComponents: [CandidatoComponent, CandidatoUpdateComponent, CandidatoDeleteDialogComponent, CandidatoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EleicoesCandidatoModule {}
