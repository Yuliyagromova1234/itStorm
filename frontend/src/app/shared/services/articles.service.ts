import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticleType} from "../../../types/article.type";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ArticlesType} from "../../../types/articles.type";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }

  getPopular(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  getArticles(params?: {page: number, categories: string[]}): Observable<ArticlesType> {
    return this.http.get<ArticlesType>(environment.api + 'articles', {
      params: params
    });
  }

  getArticle(url: string): Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.api + 'articles/' + url);
  }

  getArticle1(): Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.api + 'articles/');
  }

  getRelatedArticles(url: ArticleType): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/related/' + url);
  }
}
