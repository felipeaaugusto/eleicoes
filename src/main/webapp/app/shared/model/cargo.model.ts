export interface ICargo {
    id?: number;
    nome?: string;
}

export class Cargo implements ICargo {
    constructor(public id?: number, public nome?: string) {}
}
