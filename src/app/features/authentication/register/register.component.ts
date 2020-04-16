import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/core/services/event.service';
import { UserData } from 'src/app/shared/interfaces/userData.interface';
import { MediaService } from 'src/app/core/services/media.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('userForm', { static: true }) userForm: FormGroupDirective;
  subscriptions: Subscription = new Subscription();
  userData: UserData = {
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  constructor(private router: Router, private mediaService: MediaService, private authService: AuthService,
    private toastrService: ToastrService, private eventService: EventService) { }
  ngOnInit() { }

  signUp() {
    // check if the form is valid
    if (!this.userForm.valid) {
      return;
    }
    // confirm password validation
    if (this.userData.password !== this.userData.confirmPassword) {
      this.toastrService.error("Password confirmation is incorrect");
      return;
    }
    // email validation
    if (!this.validateEmail(this.userData.email)) {
      this.toastrService.error("Invalid email format");
      return;
    }

    this.authService.signUp(this.userData)
      .pipe(first())
      .subscribe(
        data => {
          this.mediaService.isLoggedIn = true;
          this.toastrService.success('Registration successful');
          this.mediaService.username = this.userData.username;
          this.router.navigate(['search']);
          this.subscriptions.add(this.eventService.BroadcastEvent("SHOW_LOGGED_USER", this.userData.username));
        }, error => {
          this.toastrService.error(error.error.msg);
        });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}