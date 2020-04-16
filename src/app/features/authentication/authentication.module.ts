import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AuthenticationRoutingModule
  ],
  exports: [
    LoginComponent,
  ],
})
export class AuthenticationModule { }
