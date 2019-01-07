import { ICargo } from 'app/shared/model//cargo.model';
import { ICandidato } from 'app/shared/model//candidato.model';
import { IEleicao } from 'app/shared/model//eleicao.model';

export interface IVoto {
    id?: number;
    cpf?: string;
    nome?: string;
    protocolo?: string;
    cargo?: ICargo;
    candidato?: ICandidato;
    eleicao?: IEleicao;
}

export class Voto implements IVoto {
    constructor(
        public id?: number,
        public cpf?: string,
        public nome?: string,
        public protocolo?: string,
        public cargo?: ICargo,
        public candidato?: ICandidato,
        public eleicao?: IEleicao
    ) {}
}
