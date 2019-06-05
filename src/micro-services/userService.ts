import baseService from './baseService';
import Axios, { AxiosPromise} from 'axios';
import user from '../models/user';

export class UserService extends baseService {
    constructor() {
        super();
    }

    create(data: user):  AxiosPromise {

        if(data.email && data.firstName && data.lastName 
            && data.password && data.type && data.username) {

            data.email = this.encryptData(data.email);
            data.firstName = this.encryptData(data.firstName);
            data.lastName = this.encryptData(data.lastName);
            data.password = this.encryptData(data.password);
            data.type = this.encryptData(data.type);
            data.username = this.encryptData(data.username);

        } 
        return Axios.post(this.userEndpoint, data,  this.requestConfig);
    }

    mapDataItem(items: {}[]): String[]{

        let _data:String[] = [];

        if(items) {
            for(let i=0; i < items.length; i++) {

                let _pItem = JSON.parse(JSON.stringify(items[i]));
                let _dataItem = new user();
                _dataItem.id = this.decryptData(_pItem.id);
                _dataItem.email = this.decryptData(_pItem.email);
                _dataItem.firstName = this.decryptData(_pItem.firstName);
                _dataItem.lastName = this.decryptData(_pItem.lastName);
                _dataItem.username = this.decryptData(_pItem.username);
                _dataItem.type = this.decryptData(_pItem.userType.display)
                _dataItem.active = _pItem.active;

                _data.push(<String>_dataItem);
            }
        }

        return _data;
    }

    delete(id: string): AxiosPromise {
        const _endpoint = `${this.userEndpoint}/${id}`;
        return Axios.delete(_endpoint, this.requestConfig);
    }

    getAll(): AxiosPromise {
        return Axios.get(this.userEndpoint, this.requestConfig);
    }

}

export default new UserService();