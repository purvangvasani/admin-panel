import { Injectable } from '@angular/core';
import * as sjcl from 'sjcl';

/**
 * 
 */
@Injectable()
export class LocalStorageService {

  public storage: {[index: string]:any} = {
    user: {},
    auth: {}
    // product: {}
  };
  private isStorage = false;
  private secret: string = '1@Alpha-'

  constructor() {
    this.createeSessionStorage();
  }

  createeSessionStorage = () => {
    sessionStorage.setItem('auth', JSON.stringify({}));
    sessionStorage.setItem('user', JSON.stringify({}));
  }

  /**
   * Creates localstorage
   */
  public create() {
    localStorage.setItem('auth', JSON.stringify(this.storage['auth']));
    localStorage.setItem('user', JSON.stringify(this.storage['user']));
    // localStorage.setItem('product', JSON.stringify(this.storage.product));
    this.isStorage = true;
    return localStorage;
  }

  /**
   * Set value to localstorage
   * 
   * @param  {} key
   * @param  {} value
   */
  public setValue = (key: any, value: any, isSession?: boolean) => {
    let storageObject: any = localStorage;
    if (isSession) {
      storageObject = sessionStorage;
      if (!storageObject.length) {
        this.createeSessionStorage();
      }
    }
    const objectKey = this.storageForKey(key);
    if (storageObject.getItem(objectKey)) {
      try {
        this.storage[objectKey] = Object.assign(JSON.parse(storageObject.getItem(objectKey)), this.storage[objectKey]);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.storage[objectKey] = Object.assign({}, this.storage[objectKey]);
    }
    if (value && typeof (value) !== 'boolean' && typeof (value) !== 'object' && typeof (value) !== 'number') {
      // if (typeof (value) !== 'boolean' && typeof (value) !== 'object') {
      // this.storage[objectKey][key] = window.btoa(value);
      this.storage[objectKey][key] = sjcl.encrypt(this.secret + key, value);
    } else if (value && typeof (value) === 'object') {
      for (let oKey in value) {
        this.setValue(oKey, value[oKey]);
      }
    } else if (typeof (value) === 'number') {
      this.storage[objectKey][key] = value;
    } else if (typeof (value) === 'boolean') {
      this.storage[objectKey][key] = value;
    } else if (value) {
      this.storage[objectKey][key] = value;
    }
    storageObject.setItem(objectKey, JSON.stringify(this.storage[objectKey]));
  }

  /**
   * Get value from localstorage
   *
   * @param  {} key
   * @returns any
   */
  public getValue(key: any, isSession?: boolean): any {
    let storageObject = localStorage;
    if (isSession) {
      storageObject = sessionStorage;
    }
    const objectKey = this.storageForKey(key);
    if (storageObject && storageObject[objectKey]) {
      // if (key === 'user' || key === 'product') {
      if (key === 'user') {
        let value = JSON.parse(storageObject[objectKey]);
        if (typeof (value) === 'object') {
          for (let vKey in value) {
            if (typeof value[vKey] !== 'boolean' && typeof (value[vKey]) !== 'number') {
              // if (typeof value[vKey] !== 'boolean') {
              // value[vKey] = window.atob(value[vKey]);
              value[vKey] = sjcl.decrypt(this.secret + vKey, value[vKey]);
            }
          }
          return value;
        } else {
          // return window.atob(value);
          return sjcl.decrypt(this.secret + objectKey, value)
        }
      }
      if (JSON.parse(storageObject[objectKey])[key] || JSON.parse(storageObject[objectKey])[key] === 0) {
        const value = JSON.parse(storageObject[objectKey])[key];
        if (typeof (value) !== 'boolean' && typeof (value) !== 'number') {
          // if (typeof (value) !== 'boolean') {
          // return window.atob(JSON.parse(storageObject[objectKey])[key]);
          return sjcl.decrypt(this.secret + key, JSON.parse(storageObject[objectKey])[key]);
        } else {
          return value;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Clear local storage
   */
  clearLocalStorage() {
    //prevent to remove language settings
    //localStorage.clear();
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('user');
    this.storage['user'] = {};
    this.storage['auth'] = {};
  }
  clearAllLocalStorage() {
    localStorage.clear();
    sessionStorage.clear();
    this.storage['user'] = {};
    this.storage['auth'] = {};
  }

  public remove(key: any): any {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  /**
   * Check if localsorage is created or not
   */
  public isLocalStorage() {
    return this.isStorage;
  }

  /**
   * Identify key of localstorage
   * 
   * @param  {} key
   */
  private storageForKey(key: any) {
    // if(key.indexOf('licensedProduct.') === 0) {
//   return 'product';
// };
    switch (key) {
      case 'accessToken':
      case 'refreshToken':
        return 'auth';
      default:
        return 'user';
    }
  }
}