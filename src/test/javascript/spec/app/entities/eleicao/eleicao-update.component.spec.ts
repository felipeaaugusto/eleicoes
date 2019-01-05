/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EleicoesTestModule } from '../../../test.module';
import { EleicaoUpdateComponent } from 'app/entities/eleicao/eleicao-update.component';
import { EleicaoService } from 'app/entities/eleicao/eleicao.service';
import { Eleicao } from 'app/shared/model/eleicao.model';

describe('Component Tests', () => {
    describe('Eleicao Management Update Component', () => {
        let comp: EleicaoUpdateComponent;
        let fixture: ComponentFixture<EleicaoUpdateComponent>;
        let service: EleicaoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EleicoesTestModule],
                declarations: [EleicaoUpdateComponent]
            })
                .overrideTemplate(EleicaoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EleicaoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EleicaoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Eleicao(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.eleicao = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Eleicao();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.eleicao = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
