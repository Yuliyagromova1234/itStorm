import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticlesComponent} from "./articles.component";
import {ArticleComponent} from "./article/article.component";

const routes: Routes = [
  {path: 'articles', component: ArticlesComponent},
  {path: 'articles/:url', component: ArticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {
}

