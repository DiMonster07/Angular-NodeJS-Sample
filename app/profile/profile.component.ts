import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(private http: Http,
              private userService: UserService) { }

  ngOnInit() {
    var token_data = JSON.parse(localStorage.getItem('currentUser'));
    this.model = this.userService.getById(token_data.id)
                                 .subscribe(
                                     data => {
                                         this.fillModel(data.message);
                                         this.loading = false;
                                     },
                                     error => {
                                         this.loading = false;
                                     });
  }

  updateProfile() {
    this.userService.update(this.model)
                    .subscribe(
                        data => {
                            localStorage.setItem('currentUser', JSON.stringify(data.message.token));
                            this.loading = false;
                        },
                        error => {
                            this.loading = false;
                        });
  }

  private fillModel(data) {
    this.model.id           = data._id,
    this.model.city         = data.city,
    this.model.email        = data.email,
    this.model.about        = data.about,
    this.model.address      = data.address,
    this.model.country      = data.country,
    this.model.password     = data.password,
    this.model.last_name    = data.last_name,
    this.model.first_name   = data.first_name,
    this.model.postal_code  = data.postal_code,
    this.model.organization = data.organization;
  }

}
