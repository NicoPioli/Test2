import { Component } from '@angular/core';
import { LicensePlateComponent } from './components/license-plate.component';

@Component({
  selector: 'app-root',
  imports: [LicensePlateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-test2';
}
