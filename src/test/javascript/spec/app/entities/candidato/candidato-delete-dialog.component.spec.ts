/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EleicoesTestModule } from '../../../test.module';
import { CandidatoDeleteDialogComponent } from 'app/entities/candidato/candidato-delete-dialog.component';
import { CandidatoService } from 'app/entities/candidato/candidato.service';

describe('Component Tests', () => {
    describe('Candidato Management Delete Component', () => {
        let comp: CandidatoDeleteDialogComponent;
        let fixture: ComponentFixture<CandidatoDeleteDialogComponent>;
        let service: CandidatoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EleicoesTestModule],
                declarations: [CandidatoDeleteDialogComponent]
            })
                .overrideTemplate(CandidatoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CandidatoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CandidatoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
