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
    console.log("Show")
    this.loading = true;
  }
  public hideLoader() {
    console.log("Hide")
    this.loading = false;
  }
  
}