import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EleicoesSharedModule } from 'app/shared';
import {
    VotoComponent,
    VotoDetailComponent,
    VotoUpdateComponent,
    VotoDeletePopupComponent,
    VotoDeleteDialogComponent,
    votoRoute,
    votoPopupRoute
} from './';

const ENTITY_STATES = [...votoRoute, ...votoPopupRoute];

@NgModule({
    imports: [EleicoesSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [VotoComponent, VotoDetailComponent, VotoUpdateComponent, VotoDeleteDialogComponent, VotoDeletePopupComponent],
    entryComponents: [VotoComponent, VotoUpdateComponent, VotoDeleteDialogComponent, VotoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EleicoesVotoModule {}
