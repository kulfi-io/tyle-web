import baseService from './baseService';
import Axios, { AxiosPromise } from 'axios';
import Login from '../models/login';

export class ClientService extends baseService {
    constructor() {
        super();
    }

    login(data: Login):  AxiosPromise {
        
        if(data.password && data.username) {

           data.password = this.encryptData(data.password);
           data.username = this.encryptData(data.username);
        } 

        return Axios.post(this.loginEndPoint, data, this.requestConfig);
    }
}

export default new ClientService();