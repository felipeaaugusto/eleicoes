/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EleicoesTestModule } from '../../../test.module';
import { CandidatoDetailComponent } from 'app/entities/candidato/candidato-detail.component';
import { Candidato } from 'app/shared/model/candidato.model';

describe('Component Tests', () => {
    describe('Candidato Management Detail Component', () => {
        let comp: CandidatoDetailComponent;
        let fixture: ComponentFixture<CandidatoDetailComponent>;
        const route = ({ data: of({ candidato: new Candidato(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EleicoesTestModule],
                declarations: [CandidatoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CandidatoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CandidatoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.candidato).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
