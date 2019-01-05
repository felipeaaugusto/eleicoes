import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEleicao } from 'app/shared/model/eleicao.model';
import { EleicaoService } from './eleicao.service';

@Component({
    selector: 'jhi-eleicao-delete-dialog',
    templateUrl: './eleicao-delete-dialog.component.html'
})
export class EleicaoDeleteDialogComponent {
    eleicao: IEleicao;

    constructor(protected eleicaoService: EleicaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eleicaoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'eleicaoListModification',
                content: 'Deleted an eleicao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-eleicao-delete-popup',
    template: ''
})
export class EleicaoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ eleicao }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EleicaoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.eleicao = eleicao;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
