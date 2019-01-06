import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EleicoesCargoModule } from './cargo/cargo.module';
import { EleicoesCandidatoModule } from './candidato/candidato.module';
import { EleicoesEleicaoModule } from './eleicao/eleicao.module';
import { EleicoesVotoModule } from './voto/voto.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        EleicoesCargoModule,
        EleicoesCandidatoModule,
        EleicoesEleicaoModule,
        EleicoesVotoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EleicoesEntityModule {}
