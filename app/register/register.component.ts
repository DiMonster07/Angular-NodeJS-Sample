import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bcrypt } from 'bcrypt';

import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { AlertService } from '../services/alert.service';
import { RegisterService } from '../services/register.service'
import { AuthenticationService } from '../services/authentication.service';
import { LetterModel } from '../models/letter.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})

export class RegisterComponent {
  model: any = {};
  loading = false;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService,
              private postService: PostService,
              private letterModel: LetterModel) { }

  emailExist() {
    return true;
  }

  register() {
    this.loading = true;
    this.model.is_verify = true;
    this.userService.create(this.model)
                    .subscribe(
                      data => {
                        this.postService.sendLetter(data._id, this.model.email, this.letterModel.registrationCompleted({
                          email: this.model.email,
                          password: this.model.password,
                          first_name: this.model.first_name,
                          last_name: this.model.last_name
                        })).subscribe(
                          data  => {  },
                          error => {  },
                          ()    => {  });
                        this.router.navigate(['/login']);
                        this.alertService.success('Registration successful! To verify you registarion' + 
                                                  'completed sucsessfully  we will send you a confirmation' +
                                                  'message to your email address. Please check your "Spam"' +
                                                  'folder If you don\'t  receive this message. ', true);
                        
                      },
                      error => {
                        this.alertService.error(JSON.parse(error._body).message, false);
                        this.loading = false;
                      });
  }
}
