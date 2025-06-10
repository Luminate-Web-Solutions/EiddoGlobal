import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-details-dialog',
  templateUrl: './property-details-dialog.component.html',
  styleUrls: ['./property-details-dialog.component.css'],
  imports: [CommonModule]
})
export class PropertyDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PropertyDetailsDialogComponent>,
    private router: Router
  ) {}

  openLightbox(imageUrl: string): void {
    window.open(imageUrl, '_blank'); // basic lightbox — can be enhanced
  }

  inquireAboutProperty(): void {
    this.dialogRef.close();
    this.router.navigate(['/contact'], {
      queryParams: {
        title: this.data.title,
        id: this.data.id,
        location: this.data.location
      }
    });
  }
}