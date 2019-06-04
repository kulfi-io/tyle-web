import baseService from './baseService';
import Axios, { AxiosPromise } from 'axios';

export class MailService extends baseService {
    constructor() {
        super();
    }

    register(data: {}):  AxiosPromise {
        return Axios.post(this.registerEmailEndpoint, data, this.requestConfig);
    }
}

export default new MailService();