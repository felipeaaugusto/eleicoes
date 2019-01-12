import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EleicoesBarchartModule } from './barchart/barchart.module';
import { EleicoesDoughnutchartModule } from './doughnutchart/doughnutchart.module';
import { EleicoesLinechartModule } from './linechart/linechart.module';
import { EleicoesPiechartModule } from './piechart/piechart.module';
import { EleicoesPolarareachartModule } from './polarareachart/polarareachart.module';
import { EleicoesRadarchartModule } from './radarchart/radarchart.module';

@NgModule({
    imports: [
        EleicoesBarchartModule,
        EleicoesDoughnutchartModule,
        EleicoesLinechartModule,
        EleicoesPiechartModule,
        EleicoesPolarareachartModule,
        EleicoesRadarchartModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EleicoesDashboardModule {}
