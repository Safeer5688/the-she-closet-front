import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 
import {CustomFormsModule} from 'ng2-validation';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent} from './components/register/register.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminBannerComponent } from './components/admin/admin-banner/admin-banner.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AdminOrderEditComponent } from './components/admin/admin-order-edit/admin-order-edit.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AdminBannerEditComponent } from './components/admin/admin-banner-edit/admin-banner-edit.component';
import { AdminBannerFormComponent } from './components/admin/admin-banner-form/admin-banner-form.component';
import { ProductsSingleComponent } from './components/products-single/products-single.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { SendVerificationLinkComponent } from './components/send-verification-link/send-verification-link.component';


import {FlashMessagesModule} from 'angular2-flash-messages';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';
import {AdminGuard} from './guards/admin.guard';
import {ActiveGuard} from './guards/active.guard';
import {ProductService} from './services/product.service';
import { CategoryService } from './services/category.service';
import { PasswordResetService } from './services/password-reset.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { BannerService } from './services/banner.service';
import { ConstantsService } from './services/constants.service';
import { PlagCheckerService } from './services/plag-checker.service';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AdminPromoComponent } from './components/admin/admin-promo/admin-promo.component';
import { AdminPromoFormComponent } from './components/admin/admin-promo-form/admin-promo-form.component';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';
import { AdminCategoryFormComponent } from './components/admin/admin-category-form/admin-category-form.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { SendForgetPasswordLinkComponent } from './components/send-forget-password-link/send-forget-password-link.component';
import { NewslettersComponent } from './components/admin/newsletters/newsletters.component';
import { OrderDatailsComponent } from './components/order-datails/order-datails.component';
import { PlagCheckerComponent } from './components/plag-checker/plag-checker.component';
import { DesignGeneratorComponent } from './components/design-generator/design-generator.component';



@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    OrderSuccessComponent,
    LoginComponent,
    MyOrdersComponent,
    RegisterComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    AdminOrderEditComponent,
    ResetPasswordComponent,
    AdminBannerComponent,
    AdminBannerEditComponent,
    AdminBannerFormComponent,
    ProductsSingleComponent,
    FooterComponent,
    CategoryPageComponent,
    SendVerificationLinkComponent,
    ForgetPasswordComponent,
    AdminPromoComponent,
    AdminPromoFormComponent,
    AdminCategoryComponent,
    AdminCategoryFormComponent,
    AboutusComponent,
    ContactusComponent,
    SendForgetPasswordLinkComponent,
    NewslettersComponent,
    OrderDatailsComponent,
    PlagCheckerComponent,
    DesignGeneratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot([
      {path:'',component:ProductsComponent},
      {path:'allproducts',component:ProductsComponent},
      {path:'products/:id',component:ProductsSingleComponent},
      {path:'category',component:CategoryPageComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'forgetpassword/:userid/:otp',component:ForgetPasswordComponent},
      {path:'sendforgetpasswordlink',component:SendForgetPasswordLinkComponent},
      {path:'aboutus',component:AboutusComponent},
      {path:'contactus',component:ContactusComponent},

      {path:'login',component:LoginComponent, canActivate:[LoginGuard]},
      {path:'register',component:RegisterComponent, canActivate:[LoginGuard]},

      {path:'check-out',component:CheckOutComponent, canActivate:[AuthGuard]},
      {path:'order-success',component:OrderSuccessComponent, canActivate:[AuthGuard]},
      {path:'my/orders',component:MyOrdersComponent, canActivate:[AuthGuard]},
      {path:'my/orders/:id',component:OrderDatailsComponent, canActivate:[AuthGuard]},
      {path:'resetpassword',component:ResetPasswordComponent, canActivate:[AuthGuard]},
      {path:'sendverificationlink',component:SendVerificationLinkComponent, canActivate:[AuthGuard]},
      {path:'plag-checker',component:PlagCheckerComponent},
      {path:'design-generator',component:DesignGeneratorComponent},
      
      {path:'admin/products',component:AdminProductsComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/products/new',component:ProductFormComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/products/:id',component:ProductFormComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/orders',component:AdminOrdersComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/orders/:id',component:AdminOrderEditComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/banners',component:AdminBannerComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/banners/new',component:AdminBannerFormComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/banners/:id',component:AdminBannerFormComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/promos',component:AdminPromoComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/promos/new',component:AdminPromoFormComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/promos/:id',component:AdminPromoFormComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/categories',component:AdminCategoryComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/categories/new',component:AdminCategoryFormComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/categories/:id',component:AdminCategoryFormComponent, canActivate:[AuthGuard,AdminGuard]},
      {path:'admin/newsletters',component:NewslettersComponent, canActivate:[AuthGuard,AdminGuard]}
    ], { scrollPositionRestoration: 'enabled' }),
    FlashMessagesModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    HttpModule,
    DataTablesModule
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    ActiveGuard,
    AdminGuard,
    LoginGuard,
    ProductService,
    CategoryService,
    ShoppingCartService,
    PasswordResetService,
    BannerService,
    ConstantsService,
    PlagCheckerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
