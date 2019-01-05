import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EleicoesSharedModule } from 'app/shared';
import {
    EleicaoComponent,
    EleicaoDetailComponent,
    EleicaoUpdateComponent,
    EleicaoDeletePopupComponent,
    EleicaoDeleteDialogComponent,
    eleicaoRoute,
    eleicaoPopupRoute
} from './';

const ENTITY_STATES = [...eleicaoRoute, ...eleicaoPopupRoute];

@NgModule({
    imports: [EleicoesSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EleicaoComponent,
        EleicaoDetailComponent,
        EleicaoUpdateComponent,
        EleicaoDeleteDialogComponent,
        EleicaoDeletePopupComponent
    ],
    exports: [EleicaoComponent],
    entryComponents: [EleicaoComponent, EleicaoUpdateComponent, EleicaoDeleteDialogComponent, EleicaoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EleicoesEleicaoModule {}
