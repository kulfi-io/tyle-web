import * as config from '../config/service.json';
import * as crypto from 'crypto-js';

export default class BaseService  {

    protected headers: { "Accept": string; "Content-Type": string; "enctype": string; "x_access_token": string; };
    protected accountBaseUrl: string;
    protected mailerBaseUrl: string;
    protected requestConfig: { headers: { "Accept": string; "Content-Type": string; "enctype": string; "x_access_token": string; }};
    protected clientEndpoint: string;
    protected loginEndpoint: string;
    protected userEndpoint: string;
    protected registerEmailEndpoint: string;

    constructor() {
        this.headers = {
            "Accept" : "application/json; charset=utf-8"
            , "Content-Type": "application/json; charset=utf-8"
            , "enctype": "application/x-www-form-urlencoded"
            , "x_access_token": config.token
        }
        //  account api
        this.accountBaseUrl = `${config.accountBaseEndpoint}`;
        this.clientEndpoint = `${this.accountBaseUrl}${config.clientEndpoint}`;
        this.loginEndpoint = `${this.accountBaseUrl}${config.loginEndpoint}`;
        this.userEndpoint = `${this.accountBaseUrl}${config.userEndpoint}`;

        // mailer api
        this.mailerBaseUrl = `${config.mailerBaseEndpoint}`;
        this.registerEmailEndpoint = `${this.mailerBaseUrl}${config.registerEmailEndpoint}`;

        this.requestConfig = {
            headers: this.headers
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