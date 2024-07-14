import { CommonModule, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from 'src/app/util/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, NgStyle],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService){  }
}
