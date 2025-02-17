import {Component, OnInit} from '@angular/core';
import {OwlOptions, SlidesOutputData} from "ngx-owl-carousel-o";
import {ArticleType} from "../../../types/article.type";
import {ArticlesService} from "../../shared/services/articles.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  activeSlides?: number = 0;

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }
  reviewsSlider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 25,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1200: {
        items: 3
      }
    },
    nav: false
  }

  //Data
  services = [
    {
      title: 'Создание сайтов',
      subtitle: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
      image: 'assets/images/services/make-sites.png',
      price: 7500,
      category: 'Фриланс'
    },
    {
      title: 'Продвижение',
      subtitle: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
      image: 'assets/images/services/smm.png',
      price: 3500,
      category: 'SMM'
    },
    {
      title: 'Реклама',
      subtitle: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
      image: 'assets/images/services/advertising.png',
      price: 1000,
      category: 'Таргет'
    },
    {
      title: 'Копирайтинг',
      subtitle: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
      image: 'assets/images/services/copyrighting.png',
      price: 750,
      category: 'Копирайтинг'
    }
  ]
  advantages = [
    {
      title: 'Мастерски вовлекаем аудиторию в процесс.',
      subtitle: 'Мы увеличиваем процент вовлечённости за короткий промежуток времени.',
    },
    {
      title: 'Разрабатываем бомбическую визуальную концепцию.',
      subtitle: ' Наши специалисты знают как создать уникальный образ вашего проекта.',
    },
    {
      title: 'Создаём мощные воронки с помощью текстов.',
      subtitle: 'Наши копирайтеры создают не только вкусные текста, но и классные воронки.',
    },
    {
      title: 'Помогаем продавать больше.',
      subtitle: 'Мы не только помогаем разработать стратегию по продажам, но также корректируем её под нужды заказчика.',
    },
  ]

  articlesPopular: ArticleType[] = [];

  service = '';
  isVisible = false;

  constructor(private articlesService: ArticlesService) {
  }

  ngOnInit() {
    this.articlesService.getPopular()
      .subscribe((data: ArticleType[]) => {
        this.articlesPopular = data;
      })
  }

  slidesData(data: SlidesOutputData) {
    if (data) {
      this.activeSlides = data.startPosition;
    }
  }

  openModal(serviceName: string) {
    this.service = serviceName;
    this.isVisible = true;
  }


}
