import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service'
import { CommonModule } from '@angular/common'; // ✅ Import this!
@Component({
  selector: 'app-loader-interceptor',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './loader-interceptor.component.html',
  styleUrl: './loader-interceptor.component.css'
})
export class LoaderInterceptorComponent {
  isLoading$:any;

  constructor(public loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.loading$;
  }
}
