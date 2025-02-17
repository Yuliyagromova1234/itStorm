import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";

@Component({
  selector: 'article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input()
  public article: ArticleType | undefined;

  constructor() { }

  ngOnInit(): void {
  }



}
