/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EleicoesTestModule } from '../../../test.module';
import { CandidatoUpdateComponent } from 'app/entities/candidato/candidato-update.component';
import { CandidatoService } from 'app/entities/candidato/candidato.service';
import { Candidato } from 'app/shared/model/candidato.model';

describe('Component Tests', () => {
    describe('Candidato Management Update Component', () => {
        let comp: CandidatoUpdateComponent;
        let fixture: ComponentFixture<CandidatoUpdateComponent>;
        let service: CandidatoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EleicoesTestModule],
                declarations: [CandidatoUpdateComponent]
            })
                .overrideTemplate(CandidatoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CandidatoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CandidatoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Candidato(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.candidato = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Candidato();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.candidato = entity;
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
