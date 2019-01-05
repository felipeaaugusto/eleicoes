/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EleicoesTestModule } from '../../../test.module';
import { EleicaoDetailComponent } from 'app/entities/eleicao/eleicao-detail.component';
import { Eleicao } from 'app/shared/model/eleicao.model';

describe('Component Tests', () => {
    describe('Eleicao Management Detail Component', () => {
        let comp: EleicaoDetailComponent;
        let fixture: ComponentFixture<EleicaoDetailComponent>;
        const route = ({ data: of({ eleicao: new Eleicao(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EleicoesTestModule],
                declarations: [EleicaoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EleicaoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EleicaoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.eleicao).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
