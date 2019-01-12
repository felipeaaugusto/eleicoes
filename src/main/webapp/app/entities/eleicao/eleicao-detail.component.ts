import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiAlertService } from 'ng-jhipster';

import { AccountService, LoginModalService, LoginService } from 'app/core';
import { IEleicao } from 'app/shared/model/eleicao.model';
import { IVoto } from 'app/shared/model/voto.model';
import { VotoService } from 'app/entities/voto/voto.service';
import { ICandidato } from 'app/shared/model/candidato.model';
import { CandidatoService } from '../candidato';

@Component({
    selector: 'jhi-eleicao-detail',
    templateUrl: './eleicao-detail.component.html'
})
export class EleicaoDetailComponent implements OnInit {
    eleicao: IEleicao;
    votos: IVoto[];
    candidatos: ICandidato[];
    datas: any[];
    chartOptions: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected activatedRoute: ActivatedRoute,
        private accountService: AccountService,
        protected votoService: VotoService,
        protected candidatoService: CandidatoService
    ) {
        this.datas = [];
        this.chartOptions = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }
                ]
            }
        };
        this.candidatos = [];
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ eleicao }) => {
            this.eleicao = eleicao;
            this.votoService.query().subscribe(
                (res: HttpResponse<IVoto[]>) => {
                    this.votos = res.body.filter(voto => voto.eleicao.id === this.eleicao.id);
                    this.candidatoService.query().subscribe(
                        (res: HttpResponse<ICandidato[]>) => {
                            this.candidatos = res.body;
                            this.eleicao.cargo_ids.forEach(cargo => {
                                this.datas[cargo.nome] = this.getValoresDosVotosPorCargo(cargo.id);
                            });
                        },
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    getResult() {
        const totalVotes = [];
        if (this.votos) {
            this.votos.forEach((voto, index) => {
                if (totalVotes.indexOf(this.votos[index].cpf) === -1) {
                    totalVotes.push(this.votos[index].cpf);
                }
            });
        }
        return totalVotes.length;
    }

    getStatusEleicao() {
        if (this.eleicao) {
            const dataAgora = new Date();
            dataAgora.setHours(0, 0, 0, 0);
            if (this.eleicao.dataInicio.isAfter(dataAgora) || this.eleicao.dataFim.isBefore(dataAgora)) {
                return false;
            }
            return true;
        }
    }

    isFinalEleicao() {
        if (this.eleicao) {
            const dataAgora = new Date();
            dataAgora.setHours(0, 0, 0, 0);
            if (this.eleicao.dataFim.isBefore(dataAgora)) {
                return true;
            }
            return false;
        }
    }

    getVotosPorCandidato(votos, cargo_id) {
        const votosPorCandidato = [];
        let candidatosCargo = [];
        candidatosCargo = this.candidatos.filter(candidato => candidato.cargo.id === cargo_id);
        candidatosCargo.forEach(candidato => {
            let candidatoVotos = [];
            candidatoVotos = votos.filter(voto => voto.candidato.id === candidato.id);
            if (candidatoVotos.length > 0) {
                votosPorCandidato.push({
                    candidato: candidato.nome,
                    qtdVotos: candidatoVotos.length
                });
            } else {
                votosPorCandidato.push({
                    candidato: candidato.nome,
                    qtdVotos: 0
                });
            }
        });
        return votosPorCandidato;
    }

    getDataChart(votosPorCandidato) {
        const data = {
            labels: [],
            datasets: []
        };
        const datasetCandidato = [];
        votosPorCandidato.forEach(totalVotos => {
            datasetCandidato.push({
                label: totalVotos.candidato,
                backgroundColor: '#' + ((Math.random() * 0xffffff) << 0).toString(16),
                data: [totalVotos.qtdVotos]
            });
        });
        data.labels = [this.eleicao.nome];
        data.datasets = datasetCandidato;
        return data;
    }

    getValoresDosVotosPorCargo(cargo_id) {
        if (this.votos) {
            const votosPorCargo = this.votos.filter(voto => voto.cargo.id === cargo_id);
            let votosPorCandidato = this.getVotosPorCandidato(votosPorCargo, cargo_id);
            return this.getDataChart(votosPorCandidato);
        }
        return [];
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    previousState() {
        window.history.back();
    }
}
