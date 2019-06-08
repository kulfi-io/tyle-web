import baseService from './baseService';
import Axios, { AxiosPromise, AxiosError } from 'axios';
import Login from '../models/login';

export class ClientService extends baseService {
    constructor() {
        super();
    }

    login(data: Login): AxiosPromise {
        
        if(data.password && data.username) {
            data.password = this.encryptData(data.password);
            data.username = this.encryptData(data.username);
        } 

        return Axios.post(this.loginEndpoint, data, this.requestConfig);
    }

    verify(data: Login): AxiosPromise {
        
        if(data.password && data.username && data.token)  {
            data.password = this.encryptData(data.password);
            data.username = this.encryptData(data.username);
        }

        return Axios.post(this.verifyEndpoint, data, this.requestConfig);
    }

}

export default new ClientService();