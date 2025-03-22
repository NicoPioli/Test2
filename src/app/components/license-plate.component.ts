import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common';
import { LicensePlateService } from '../license/license-plate.service';

@Component({
  selector: 'app-license-plate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./license-plate.component.scss'],
  template: `
    <div class="license-plate-container">
      <!-- Input field for the index, styled with 'input-style' -->
      <input
        type="number"
        [(ngModel)]="index"
        placeholder="Enter index"
        class="input-style"
      />
      <!-- Button styled with 'button-style' that triggers license plate generation -->
      <button (click)="fetchLicensePlate()" class="button-style">
        Get License Plate
      </button>
      <!-- Display the resulting license plate with 'result-style' -->
      <p *ngIf="licensePlate" class="result-style">
        License Plate: {{ licensePlate }}
      </p>
    </div>
  `,
})
export class LicensePlateComponent {
  index: number = 0; // Holds the user-provided index
  licensePlate: string | null = null; // Will hold the generated license plate

  constructor(private readonly licensePlateService: LicensePlateService) {
    // LicensePlateService is injected via Angular's dependency injection.
  }

  /**
   * Fetch the license plate corresponding to the current index.
   */
  fetchLicensePlate(): void {
    this.licensePlate = this.licensePlateService.getLicensePlate(this.index);
  }
}
