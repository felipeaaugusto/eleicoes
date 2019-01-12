import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';

import { EleicoesSharedModule } from 'app/shared';
import {
    EleicaoComponent,
    EleicaoDetailComponent,
    EleicaoUpdateComponent,
    EleicaoDeletePopupComponent,
    EleicaoDeleteDialogComponent,
    EleicaoRegisterVoteComponent,
    eleicaoRoute,
    eleicaoPopupRoute
} from './';

const ENTITY_STATES = [...eleicaoRoute, ...eleicaoPopupRoute];

@NgModule({
    imports: [EleicoesSharedModule, RouterModule.forChild(ENTITY_STATES), ChartModule],
    declarations: [
        EleicaoComponent,
        EleicaoDetailComponent,
        EleicaoUpdateComponent,
        EleicaoDeleteDialogComponent,
        EleicaoDeletePopupComponent,
        EleicaoRegisterVoteComponent
    ],
    exports: [EleicaoComponent],
    entryComponents: [
        EleicaoComponent,
        EleicaoUpdateComponent,
        EleicaoDeleteDialogComponent,
        EleicaoDeletePopupComponent,
        EleicaoRegisterVoteComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EleicoesEleicaoModule {}
