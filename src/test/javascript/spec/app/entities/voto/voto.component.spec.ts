/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EleicoesTestModule } from '../../../test.module';
import { VotoComponent } from 'app/entities/voto/voto.component';
import { VotoService } from 'app/entities/voto/voto.service';
import { Voto } from 'app/shared/model/voto.model';

describe('Component Tests', () => {
    describe('Voto Management Component', () => {
        let comp: VotoComponent;
        let fixture: ComponentFixture<VotoComponent>;
        let service: VotoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [EleicoesTestModule],
                declarations: [VotoComponent],
                providers: []
            })
                .overrideTemplate(VotoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VotoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VotoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Voto(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.votos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
