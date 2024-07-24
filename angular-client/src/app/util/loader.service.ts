import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loading = false;

  get isLoaderAvailable(): boolean {
    return this.loading;
  }

  constructor() { }

  public showLoader() {
    this.loading = true;
  }
  public hideLoader() {
    this.loading = false;
  }
}