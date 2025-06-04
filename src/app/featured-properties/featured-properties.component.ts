import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  properties: Property[] = [
    {
      id: 1,
      title: 'Upgraded Villa | Furnished | 4 Cheques | Vac...',
      price: 'Rs.195,000',
      description: 'Experience Refined Living In This Beautifully Upgraded And Fully Furnished Villa Located...',
      location: 'Geneva',
      bedrooms: 2,
      area: '332,993.98 Ft',
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      type: 'Rent'
    },
    {
      id: 2,
      title: 'Upgraded Villa | Furnished | 4 Cheques | Vac...',
      price: 'Rs.195,000',
      description: 'Experience Refined Living In This Beautifully Upgraded And Fully Furnished Villa Located...',
      location: 'Geneva',
      bedrooms: 2,
      area: '332,993.98 Ft',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      type: 'Rent'
    },
    {
      id: 3,
      title: 'Upgraded Villa | Furnished | 4 Cheques | Vac...',
      price: 'Rs.195,000',
      description: 'Experience Refined Living In This Beautifully Upgraded And Fully Furnished Villa Located...',
      location: 'Geneva',
      bedrooms: 2,
      area: '332,993.98 Ft',
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      type: 'Rent'
    },
    {
      id: 4,
      title: 'Upgraded Villa | Furnished | 4 Cheques | Vac...',
      price: 'Rs.195,000',
      description: 'Experience Refined Living In This Beautifully Upgraded And Fully Furnished Villa Located...',
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