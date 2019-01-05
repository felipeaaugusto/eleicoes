import { ICargo } from 'app/shared/model//cargo.model';

export interface ICandidato {
    id?: number;
    nome?: string;
    fotoContentType?: string;
    foto?: any;
    cargo?: ICargo;
}

export class Candidato implements ICandidato {
    constructor(public id?: number, public nome?: string, public fotoContentType?: string, public foto?: any, public cargo?: ICargo) {}
}
