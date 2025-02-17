import {Component, HostListener, OnInit} from '@angular/core';
import {ArticlesService} from "../../shared/services/articles.service";
import {ArticlesType} from "../../../types/articles.type";
import {CategoriesService} from "../../shared/services/categories.service";
import {CategoriesType} from "../../../types/categories.type";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: ArticlesType | undefined;
  filterHeaderStatus: boolean = false;

  categories: CategoriesType[] | undefined;

  filterCategories: CategoriesType[] = [];
  activeFilterCategories: string[] = [];
  activeParams: { page: number, categories: string[] } = {page: 1, categories: []};
  pages: number[] = [];

  constructor(private articlesService: ArticlesService,
              private categoriesService: CategoriesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.processArticles();
    this.categoriesService.getCategories()
      .subscribe((data: CategoriesType[]) => {
        this.categories = data;
      })
  }

  processArticles() {
    this.activatedRoute.queryParams
      .subscribe((params) => {
        this.activeParams = {
          page: +params['page'],
          categories: this.activeFilterCategories
        }
        this.articlesService.getArticles(this.activeParams)
          .subscribe((data: ArticlesType) => {
            this.articles = data;

            this.pages = [];
            for (let i = 1; i <= data.pages; i++) {
              this.pages.push(i)
            }
          })
      })
  }

  updateFilter() {
    this.activeFilterCategories = this.filterCategories.map((item) => item.url);
    this.router.navigate(['/articles'], {
      queryParams: {
        page: 1,
        categories: this.activeFilterCategories
      }
    })
    this.processArticles();
  }

  switchFilterSelect(category: CategoriesType) {
    if (this.filterCategories.includes(category)) {
      this.filterCategories = this.filterCategories.filter((item) => item !== category);
      category.status = false;
    } else {
      this.filterCategories.push(category);
      category.status = true;
    }
    this.updateFilter();
  }

  @HostListener('document:click', ['$event'])
  click(event: Event) {
    if (this.filterHeaderStatus && (event.target as HTMLElement).className.indexOf('filter-select') === -1) {
      this.filterHeaderStatus = false;
    }
  }

  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate(['/articles'], {
      queryParams: this.activeParams
    })
  }

  openNextPage() {
    if (this.activeParams.page && (this.activeParams.page < this.pages.length)) {
      this.activeParams.page++;
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      })
    } else {
      console.log('Ошибка: ' + this.activeParams.page);
    }
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate(['/articles'], {
        queryParams: this.activeParams
      })
    }
  }


}
