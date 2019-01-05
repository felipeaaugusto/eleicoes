import { Moment } from 'moment';
import { ICargo } from 'app/shared/model//cargo.model';

export interface IEleicao {
    id?: number;
    nome?: string;
    dataInicio?: Moment;
    dataFim?: Moment;
    cargo_ids?: ICargo[];
}

export class Eleicao implements IEleicao {
    constructor(
        public id?: number,
        public nome?: string,
        public dataInicio?: Moment,
        public dataFim?: Moment,
        public cargo_ids?: ICargo[]
    ) {}
}
