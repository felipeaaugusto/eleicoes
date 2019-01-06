/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { EleicoesTestModule } from '../../../test.module';
import { VotoUpdateComponent } from 'app/entities/voto/voto-update.component';
import { VotoService } from 'app/entities/voto/voto.service';
import { Voto } from 'app/shared/model/voto.model';

describe('Component Tests', () => {
    describe('Voto Management Update Component', () => {
        let comp: VotoUpdateComponent;
        let fixture: ComponentFixture<VotoUpdateComponent>;
        let service: VotoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EleicoesTestModule],
                declarations: [VotoUpdateComponent]
            })
                .overrideTemplate(VotoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VotoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VotoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Voto(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.voto = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Voto();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.voto = entity;
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
