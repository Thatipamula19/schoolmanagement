import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    FooterComponent,
    ErrorComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule, BrowserAnimationsModule, MaterialModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [FooterComponent, ErrorComponent]
})
export class CommaonModule { }
