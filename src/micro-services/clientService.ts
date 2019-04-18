import baseService from './baseService';
import Axios, { AxiosPromise } from 'axios';

export class ClientService extends baseService {
    constructor() {
        super();
    }

    getAll():  AxiosPromise {
        return Axios.get(this.clientEndPoint, this.requestConfig);
    }
}

export default new ClientService();