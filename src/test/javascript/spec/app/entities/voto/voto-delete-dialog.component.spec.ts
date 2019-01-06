/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { EleicoesTestModule } from '../../../test.module';
import { VotoDeleteDialogComponent } from 'app/entities/voto/voto-delete-dialog.component';
import { VotoService } from 'app/entities/voto/voto.service';

describe('Component Tests', () => {
    describe('Voto Management Delete Component', () => {
        let comp: VotoDeleteDialogComponent;
        let fixture: ComponentFixture<VotoDeleteDialogComponent>;
        let service: VotoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EleicoesTestModule],
                declarations: [VotoDeleteDialogComponent]
            })
                .overrideTemplate(VotoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VotoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VotoService);
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
