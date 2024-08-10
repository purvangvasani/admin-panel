import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Xml2JsonService } from './xml2json.service';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../environments/environment';
import { LoaderService } from './loader.service';


interface RequestConfig {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    data?: any;
    options?: {
        headers?: HttpHeaders;
        params?: HttpParams;
        [key: string]: any;
    };
    noDelay?: boolean;
}
/**
 * This class handles REST interaction with server, send REST to server and recieve response from server
 *
 */
@Injectable()
export class DelegatorService {

    private lockedForRefresh = false;
    private delayRequests: { [index: string]: any } = {};
    private runningRequests: { [index: string]: any } = {};
    private requestCounter = 0;
    private apiUrl = `${environment.apiUrl}`;

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private loaderService: LoaderService,
        private xml2jsonService: Xml2JsonService,
        private localStorageService: LocalStorageService
    ) {
    }

    /**
     * Get request config and send request to server
     * Return observer
     * 
     * @param  {} config
     */
    // private http = <T>(config: RequestConfig): Observable<T> => {
    //     if (this.lockedForRefresh && !config.noDelay) {
    //       this.storeDelayedRequest(config);
    //       return new Observable<T>(); // Return an empty observable or handle accordingly
    //     } else {
    //       const requestId = this.nextRequestId();
    //       let observer: Observable<any>;

    //       // Type guard to ensure config.method is one of the expected methods
    //       if (['get', 'delete'].includes(config.method)) {
    //         observer = this._http[config.method](config.url, config.options); // ...using get/delete request
    //       } else {
    //         observer = this._http[config.method](config.url, config.data, config.options); // ...using post/put request
    //       }

    //       // store request's config and store it in runningRequests
    //       const tracker = {
    //         requestId: requestId,
    //         config: config,
    //       };
    //       this.runningRequests[requestId] = tracker;

    //       return this.handleRespone<T>(observer, tracker);
    //     }
    //   };
    private http = <T>(config: RequestConfig) => {
        if (this.lockedForRefresh && !config.noDelay) {
            this.storeDelayedRequest(config);
        } else {
            const requestId = this.nextRequestId();
            let observer;
            if (config.method === 'get') {
                observer = this._http['get'](config.url, config.options); // ...using get request
            } else if (config.method === 'delete') {
                observer = this._http['delete'](config.url, config.options); // ...using delete request
            } else {
                observer = this._http[config.method](config.url, config.data, config.options); // ...using post/put request
            }

            // store request's config and store it in runningRequests
            const tracker = {
                requestId: requestId,
                config: config
            };
            this.runningRequests[requestId] = tracker;

            return this.handleRespone(<T>observer, tracker);
        }
    }

    /**
     * Build config object of request
     *
     * @param  {} url
     * @param  {} data
     * @param  {} method
     * @param  {} successCallback
     */
    // private buildConfig = (url: any, data: any, method: any, successCallback: any, errorCallback: any) => {
    //     const config: any = {};

    //     // Prepare header
    //     let headers: HttpHeaders = this.prepareHeader(data);

    //     if (data && (data.isSOAP || data.isFileUpload)) {
    //         data = data.body;
    //     }

    //     // Create a request option
    //     let options;
    //     if (data && data.isFileDownload) {
    //         options = {
    //             headers: headers,
    //             responseType: 'blob',
    //             observe: "response" as 'body', // to display the full response & as 'body' for type cast
    //         };
    //     } else {
    //         options = {
    //             headers: headers,
    //             responseType: 'json',
    //             observe: "response" as 'body', // to display the full response & as 'body' for type cast
    //         };
    //     }

    //     config.url = url;
    //     config.options = options;
    //     config.data = data;
    //     config.method = method;
    //     config.successCallback = successCallback;
    //     config.errorCallback = errorCallback;

    //     return config;
    // }
    private buildConfig = (url: string, data: any, method: string, successCallback: any, errorCallback: any) => {
        const config: any = {};

        // Prepare header
        const headers: HttpHeaders = this.prepareHeader(data);

        if (data && (data.isFileUpload)) {
            data = data.body;
        }

        // Create a request option
        let options;
        if (data && data.isFileDownload) {
            options = {
                headers: headers,
                responseType: 'blob',
                observe: "response" as 'body', // to display the full response & as 'body' for type cast
            };
        } else {
            options = {
                headers: headers,
                responseType: 'json',
                observe: "response" as 'body', // to display the full response & as 'body' for type cast
            };
        }

        config.url = url;
        config.options = options;
        config.data = data;
        config.method = method;
        config.successCallback = successCallback;
        config.errorCallback = errorCallback;

        return config;
    }

    /**
     * Post requests
     *
     * @param  {} data
     * @param  {} url
     * @param  {} customConfig
     * @param  {} successCallback
     * @returns Observable
     */
    // public post = <T>(data: { new(): T; }, url: string, customConfig: any, successCallback: any, errorCallback: any): Observable<T[]> => {
    //     const config = this.buildConfig(url, data, 'post', successCallback, errorCallback);
    //     if (customConfig) {
    //         config.noDelay = customConfig.noDelay;
    //     }
    //     return this.http<T>(config);
    // }
    public post = <T>(data: any, url: string, customConfig: any, successCallback: any, errorCallback: any): Observable<T[]> => {
        const config = this.buildConfig(url, data, 'post', successCallback, errorCallback);
        if (customConfig) {
            config.noDelay = customConfig.noDelay;
        }
        return this.http<T>(config);
    }

    /**
     * Get requests
     *
     * @param  {} url
     * @param  {} customConfig
     * @param  {} successCallback
     * @returns Observable
     */
    public get = <T>(url: string, successCallback: any, errorCallback: any, options?: any): Observable<T[]> => {
        const config = this.buildConfig(url, options, 'get', successCallback, errorCallback);
        return this.http<T>(config);
    }

    /**
     * Post requests
     * 
     * @param  {} data
     * @param  {} url
     * @param  {} customConfig
     * @param  {} successCallback
     * @returns Observable
     */
    public put = <T>(data: { new(): T; }, url: string, successCallback: any, errorCallback: any): Observable<T[]> => {
        const config = this.buildConfig(url, data, 'put', successCallback, errorCallback);
        return this.http<T>(config);
    }

    /**
     * Post requests
     * 
     * @param  {} data
     * @param  {} url
     * @param  {} customConfig
     * @param  {} successCallback
     * @returns Observable
     */
    public delete = <T>(url: string, successCallback: any, errorCallback: any): Observable<T[]> => {
        const config = this.buildConfig(url, '', 'delete', successCallback, errorCallback);
        return this.http<T>(config);
    }

    /**
     * SOAP Get requests
     *
     * @param  {} url
     * @param  {} customConfig
     * @param  {} successCallback
     * @returns Observable
     */
    public soapGet = <T>(url: string, credentials: any, successCallback: any, errorCallback: any): Observable<T[]> => {
        let data = {
            isSOAP: true,
            credentials: credentials
        }

        const config = this.buildConfig(url, data, 'get', successCallback, errorCallback);
        return this.http<T>(config);
    }

    /**
     * SOAP Post requests
     *
     * @param  {} data
     * @param  {} url
     * @param  {} customConfig
     * @param  {} successCallback
     * @returns Observable
     */
    public soapPost = <T>(data: any, url: string, customConfig: any, successCallback: any, errorCallback: any): Observable<T[]> => {
        data['isSOAP'] = true;

        const config = this.buildConfig(url, data, 'post', successCallback, errorCallback);

        if (customConfig) {
            config.noDelay = customConfig.noDelay;
        }

        return this.http<T>(config);
    }

    /**
     * Prepare header for request
     *
     * @param  {} data
     */
    private prepareHeader = (data: any) => {

        // Set content type to JSON
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Security-Policy', "frame-ancestors none;X-Frame-Options DENY;")

        headers = headers.append('Content-Security-Policy-Report-Only', "default-src 'self'; connect-src 'self' www.google-analytics.com; font-src 'self' fonts.gstatic.com fonts.googleapis.com; img-src 'self' www.google-analytics.com data:; script-src 'self' 'unsafe-eval' www.google-analytics.com www.googletagmanager.com www.gstatic.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com;")
        // let userId = this.localStorageService.getValue('userId');

        let userId = this.localStorageService.getValue('userId');
        if (userId) { headers = headers.append('userid', userId); }

        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone) { headers = headers.append('timezone', timezone); }

        if (data && data.isSOAP) {
            headers = headers.append('Content-Type', 'text/xml');
            if (data.credentials && data.credentials.username && data.credentials.password) {
                headers = headers.append('Authorization', 'Basic ' + window.btoa(data.credentials.username + ':' + data.credentials.password));
                // delete data.credentials.password;
            }
        } else if ((data && !data.isSOAP) || !data) {
            if (data && !data.isFileUpload) {
                headers = headers.append('Content-Type', 'application/json');
            }
            if (data && data.email && data.password) {
                // basic header for requesting access token
                headers = headers.append('Authorization', 'Basic ' + window.btoa(data.email + ':' + data.password));
                // delete data.password;
            } else if (data && data.refreshToken) {
                const refreshToken = this.localStorageService.getValue('refreshToken');
                // Bearer with refresh token
                headers = headers.append('Authorization', 'Bearer ' + refreshToken);
            } else {
                // get access token from session
                const accessToken = this.localStorageService.getValue('accessToken');
                // const accessToken = this.localStorageService.getValue('accessToken');
                if (accessToken) {
                    headers = headers.append('Authorization', 'Bearer ' + accessToken);
                }
            }
        }
        return headers;
    }

    /**
     * handle observer after compeltion of request
     * 
     * @param  {} observer
     * @param  {} tracker
     */
    private handleRespone = <T>(observer: any, tracker: any) => {
        return observer.subscribe(
            (result: any) => {
                // delete request from runningRequests
                delete this.runningRequests[tracker.requestId];

                // success in getting response
                if (result.headers.get('content-type') && result.headers.get('content-type').indexOf('text/xml') >= 0) {
                    let data = result['_body'];
                    // if (data) {
                    //     data = $.parseXML(result['_body']);
                    // }
                    data = this.xml2jsonService.xml2json(data);
                    tracker.config.successCallback(data);
                } else if (result.headers.get('content-type') && result.headers.get('content-type').indexOf('octet-stream') >= 0) {
                    try {
                        let filename = result.headers.get('x-filename');
                        let mimetype = result.headers.get('x-mimetype');
                        let blob = new Blob([(<any>result.blob())], { type: mimetype });
                        let data = {
                            success: true,
                            blob: blob,
                            filename: filename,
                            mimetype: mimetype
                        };
                        tracker.config.successCallback(data);
                    } catch (e: any) {
                        try {
                            e = (e && e._body) ? JSON.parse(e._body) : e;
                        } catch (err) {
                        }
                        let message = (e && e.message) ? e.message : 'Something went wrong! Please try again.';
                        tracker.config.errorCallback({ success: false, message: message, error: e });
                    }
                } else {
                    try {
                        tracker.config.successCallback(result.body);
                    } catch (ex) {
                        tracker.config.successCallback(result);
                    }
                }
            },
            (error: any) => {
                try {
                    this.loaderService.hideLoader();
                    let err = error;
                    try {
                        try {
                            err = (err && err._body) ? JSON.parse(err._body) : err.json();
                        } catch (err) {
                        }
                    } catch (e) { }
                    if (error.status === 0) {
                        delete this.runningRequests[tracker.requestId];
                        tracker.config.errorCallback({ success: false, message: 'SimplrOps server is under maintenance! Please try agian after some time.', error: error });
                        return;
                    }
                    // if session time out status
                    if (error.status === 599) {
                        this.unLockRequestFlag();
                        this.localStorageService.clearLocalStorage();
                        if (this._router.url.indexOf('redirTo') < 0) {
                            this._router.navigate(['login', { redirTo: this._router.url }]);
                        }
                        return;
                    }
                    if (error.status === 419 && !this.lockedForRefresh) { // Session Time Out
                        this._router.navigate(['login']);
                        // this.interceptSessionExpired();
                    } else if (error.status === 401) {
                        delete this.runningRequests[tracker.requestId];
                        this.localStorageService.clearLocalStorage();
                        tracker.config.errorCallback(err);
                        if (this._router.url.indexOf('redirTo') < 0) {
                            this._router.navigate(['login', { redirTo: this._router.url }]);
                        }
                    } else if (error.status === 403) { // User has not access rights (Forbidden)
                        if (error.error) {
                            try {
                                let body = error.error;
                                if (body && body.error === 'No header is provided') {
                                    this.unLockRequestFlag();
                                    this.localStorageService.clearLocalStorage();
                                    if (this._router.url.indexOf('redirTo') < 0) {
                                        this._router.navigate(['login', { redirTo: this._router.url }]);
                                    }
                                } else {
                                    delete this.runningRequests[tracker.requestId];
                                    tracker.config.errorCallback(body || err);
                                }
                            } catch (e) {
                                delete this.runningRequests[tracker.requestId];
                                tracker.config.errorCallback(err);
                            }
                        } else {
                            delete this.runningRequests[tracker.requestId];
                            tracker.config.errorCallback(err);
                        }
                    } else if (!this.lockedForRefresh) {
                        delete this.runningRequests[tracker.requestId];
                        tracker.config.errorCallback(err);
                    }
                } finally {
                    // setTimeout(() => {
                    //     let loaderDiv = ($('#div_loader'));
                    //     if (loaderDiv && loaderDiv.hasClass && !loaderDiv.hasClass('hide')) {
                    //         loaderDiv.addClass('hide');
                    //     }
                    // }, 1000);
                }
            }
        );
    }

    /**
     * Lock requests, it won't interact to server and store requests
     */
    private lockRequest = () => {
        this.lockedForRefresh = true;
    }

    private unLockRequestFlag = () => {
        this.lockedForRefresh = false;
        this.runningRequests = [];
        this.delayRequests = [];
    }

    /**
     * Lock requests, execute requests from executeDelayedRequests and executeRunningRequests
     */
    private unLockRequest = () => {
        this.lockedForRefresh = false;
        this.executeRunningRequests();
        this.executeDelayedRequests();
    }
    /**
     * Store requests after locked
     * 
     * @param  {} config
     */
    private storeDelayedRequest = (config: any) => {
        const requestId = this.nextRequestId();
        const tracker = {
            requestId: requestId,
            config: config
        };
        this.delayRequests[requestId] = tracker;
    }

    /**
     * Increment requestCounter and return new number as a string
     */
    private nextRequestId = () => {
        return this.requestCounter += 1;
    }

    /**
     * Execute running requests
     */
    private executeRunningRequests = () => {
        for (const key in this.runningRequests) {
            if (this.runningRequests.hasOwnProperty(key)) {
                this.executeRequests(this.runningRequests[key]);
                delete this.runningRequests[key];
            }
        }
    }

    /**
     * Executes delayed requests
     */
    private executeDelayedRequests = () => {
        for (const key in this.delayRequests) {
            if (this.delayRequests.hasOwnProperty(key)) {
                this.executeRequests(this.delayRequests[key]);
                delete this.runningRequests[key];
            }
        }
    }

    /**
     * Execute requests
     * 
     * @param  {} request
     */
    private executeRequests = (request: any) => {
        const config = this.buildConfig(
            request.config.url,
            request.config.data,
            request.config.method,
            request.config.successCallback,
            request.config.errorCallback);
        return this.http<any>(config);
    }

    /**
     * Set lockedForRefresh as true
     * Lock all the upcoming request in delegator service
     */
    private interceptSessionExpired = () => {
        if (!this.lockedForRefresh) {
            this.lockedForRefresh = true;

            // queue the requests
            this.lockRequest();
            // this.refreshAccessToken();
        }
    }

    /**
     * Sets new access token and refresh token to localStorage and
     * Unlocks the requests from delegator service
     *
     * @param  {} result
     */
    // private refreshAccessToken = () => {
    //     let refreshAccessTokenSuccess = (result) => {
    //         this.localStorageService.setValue('accessToken', result.accessToken);
    //         this.localStorageService.setValue('refreshToken', result.refreshToken);
    //         this.lockedForRefresh = false;
    //         this.unLockRequest();
    //     }
    //     let refreshAccessTokenError = (error) => {
    //         this.unLockRequestFlag();
    //         this.lockedForRefresh = false;
    //         this.localStorageService.clearAllLocalStorage();
    //         if (this._router.url.indexOf('redirTo') < 0) {
    //             this._router.navigate(['auth/login', { redirTo: this._router.url }]);
    //         }
    //     }

    //     // Send request for new access token
    //     let data: any = {
    //         refreshToken: true,
    //         grantType: 'accessToken'
    //     };
    //     const url = this.apiUrl + this.apiUrl.myprofile + this.restUrl.authenticate;
    //     this.post(data, url, { noDelay: true }, refreshAccessTokenSuccess, refreshAccessTokenError);
    // }

    public getIcons = (successCallback: Function, errorCallback: Function) => {
        let iconList: any = {};
        /* Ionic Icons */
        let url = "https://raw.githubusercontent.com/ionic-team/ionicons/main/src/data.json";
        this._http.get(url).subscribe((response: any) => {
            try {
                response.icons.forEach((elem: any) => {
                    let splitVal = elem.name.split("-");
                    if (splitVal[splitVal.length - 1] !== 'outline' && splitVal[splitVal.length - 1] !== 'sharp') {
                        iconList[elem.name] = elem;
                    }
                });
                successCallback({ success: true, data: iconList });
            } catch (error) {
                errorCallback({ success: false, error: error });
            }
        }, (error: any) => {
            errorCallback({ success: false, error: error });
        });
    }
};
