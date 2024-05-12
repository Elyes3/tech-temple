import { Component, OnInit } from '@angular/core';
import { ComponentVisibilityService } from '../service/ComponentVisibilityService';
import { CategoriesService } from '../../dashboard/services/categories.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories = [
    'Computers',
    'Accessories & Supplies',
    'Security & Surveillance',
    'Video Game Consoles & Accessories',
    'Smart Home',
  ]

  newCategories: any

  isVisible$ = this.componentVisibilityService.isVisible$;

  constructor(private componentVisibilityService: ComponentVisibilityService, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.loadCategories().subscribe(
      (data: any) => { 
        console.log(data)
        this.newCategories = data;
      },
      (error: any) => {
        console.error('An error occurred:', error);
      },
    )
  }

}
