import { NgModule } from '@angular/core';

import { EleicoesSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [EleicoesSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [EleicoesSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class EleicoesSharedCommonModule {}
