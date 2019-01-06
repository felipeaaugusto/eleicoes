/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EleicoesTestModule } from '../../../test.module';
import { VotoDetailComponent } from 'app/entities/voto/voto-detail.component';
import { Voto } from 'app/shared/model/voto.model';

describe('Component Tests', () => {
    describe('Voto Management Detail Component', () => {
        let comp: VotoDetailComponent;
        let fixture: ComponentFixture<VotoDetailComponent>;
        const route = ({ data: of({ voto: new Voto(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EleicoesTestModule],
                declarations: [VotoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VotoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VotoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.voto).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
