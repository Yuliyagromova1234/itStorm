import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";
import {AuthForwardGuard} from "./core/auth-forward.guard";
import {PolicyComponent} from "./views/policy/policy.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent},
      {path: '', loadChildren: () => import('./views/articles/articles.module').then(m => m.ArticlesModule)},
      {
        path: '',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
        canActivate: [AuthForwardGuard]
      },
      {path: 'policy', component: PolicyComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
