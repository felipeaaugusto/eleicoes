import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVoto } from 'app/shared/model/voto.model';

type EntityResponseType = HttpResponse<IVoto>;
type EntityArrayResponseType = HttpResponse<IVoto[]>;

@Injectable({ providedIn: 'root' })
export class VotoService {
    public resourceUrl = SERVER_API_URL + 'api/votos';

    constructor(protected http: HttpClient) {}

    create(voto: IVoto): Observable<EntityResponseType> {
        return this.http.post<IVoto>(this.resourceUrl, voto, { observe: 'response' });
    }

    update(voto: IVoto): Observable<EntityResponseType> {
        return this.http.put<IVoto>(this.resourceUrl, voto, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVoto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVoto[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
