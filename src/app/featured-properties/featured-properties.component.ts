import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PropertyDetailsDialogComponent } from './property-details-dialog/property-details-dialog.component';

interface Property {
  id: number;
  title: string;
  price: string;
  description: string;
  location: string;
  bedrooms: number;
  area: string;
  image: string;
  type: 'Rent' | 'Sale';
}

@Component({
  selector: 'app-featured-properties',
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.css'],
  standalone: false,
})
export class FeaturedPropertiesComponent {
  constructor(public dialog: MatDialog) {}

  openDetails(property: any): void {
    this.dialog.open(PropertyDetailsDialogComponent, {
      width: '600px',
      data: property
    });
  }

  properties: Property[] = [
    {
      id: 1,
      title: 'Luxury Lakefront Villa | Fully Furnished | Flexible Payment | Ready to Move',
      price: 'Rs.195,000',
      description: 'Experience refined living in this beautifully upgraded and fully furnished lakefront villa. Featuring spacious interiors, modern amenities, and breathtaking views, this property is perfect for families seeking comfort and elegance. Enjoy a private garden, swimming pool, and 24/7 security in a prestigious Geneva neighborhood. Flexible payment options available.',
      location: 'Geneva',
      bedrooms: 2,
      area: '332,993.98 Ft',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      type: 'Rent'
    },
    {
      id: 2,
      title: 'Modern Family Home | Prime Location | Spacious Layout | Move-in Ready',
      price: 'Rs.195,000',
      description: 'This modern family home offers a spacious open-plan layout, high-end finishes, and abundant natural light. Located in the heart of Geneva, it features a gourmet kitchen, large bedrooms, and a beautifully landscaped backyard. Ideal for families looking for convenience and style in a sought-after community.',
      location: 'Geneva',
      bedrooms: 2,
      area: '332,993.98 Ft',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      type: 'Rent'
    },
    {
      id: 3,
      title: 'Elegant Penthouse Apartment | Panoramic Views | Exclusive Amenities',
      price: 'Rs.195,000',
      description: 'Live above it all in this elegant penthouse apartment boasting panoramic city and lake views. The property includes three spacious bedrooms, a designer kitchen, and access to exclusive amenities such as a fitness center, rooftop terrace, and concierge services. Perfect for professionals and families seeking luxury and convenience.',
      location: 'Geneva',
      bedrooms: 2,
      area: '332,993.98 Ft',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      type: 'Rent'
    },
    {
      id: 4,
      title: 'Contemporary Urban Villa | Private Pool | Secure Community | Investment Opportunity',
      price: 'Rs.195,000',
      description: 'Discover this contemporary urban villa featuring a private pool, lush gardens, and secure gated access. The villa offers a blend of modern architecture and functional design, with spacious living areas and premium finishes. Located in a thriving Geneva neighborhood, this property is an excellent investment or family home.',
      location: 'Geneva',
      bedrooms: 2,
      area: '332,993.98 Ft',
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      type: 'Rent'
    }
  ];

  showFilter = false;

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
}