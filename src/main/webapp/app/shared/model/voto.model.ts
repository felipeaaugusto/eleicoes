export interface IVoto {
    id?: number;
    cpf?: string;
    nome?: string;
}

export class Voto implements IVoto {
    constructor(public id?: number, public cpf?: string, public nome?: string) {}
}
