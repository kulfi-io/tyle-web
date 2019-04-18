import * as config from '../config/service.json';
import * as crypto from 'crypto-js';

export default class BaseService  {

    protected headers: { "Accept": string; "Content-Type": string; "enctype": string; "x_access_token": string; };
    protected baseUrl: string;
    protected requestConfig: { headers: { "Accept": string; "Content-Type": string; "enctype": string; "x_access_token": string; }; responseType: string; };
    protected clientEndPoint: string;
    protected loginEndPoint: string;
    protected userEndPoint: string;

    constructor() {
        this.headers = {
            "Accept" : "application/json; charset=utf-8"
            , "Content-Type": "application/json; charset=utf-8"
            , "enctype": "application/x-www-form-urlencoded"
            , "x_access_token": config.token
        }

        this.baseUrl = `${config.hostBaseEndpoint}`;
        this.clientEndPoint = `${this.baseUrl}${config.clientEndpoint}`;
        this.loginEndPoint = `${this.baseUrl}${config.loginEndpoint}`;
        this.userEndPoint = `${this.baseUrl}${config.userEndpoint}`;

        this.requestConfig = {
            headers: this.headers,
            responseType: "application/json; charset=utf-8"
        }
    }

    protected encryptData(data: string): string {
        const _data = crypto.AES.encrypt(data, config.transportSecret);
        return _data.toString();
    }

    protected decryptData(data: string): string {
        const _data = crypto.AES.decrypt(data, config.transportSecret);
        const _plainText = _data.toString(crypto.enc.Utf8)
        return _plainText;
    }
}