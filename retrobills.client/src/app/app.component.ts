import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'retrobills.client';

  constructor(private router: Router, private route: ActivatedRoute) {}

  navIsVisible = false; 

  toggleNav() {
    this.navIsVisible = !this.navIsVisible;
  }

  OnLoginClick(){
    this.router.navigate(['login'])
  }

  OnSignUpClick(){
    this.router.navigate(['signup'])
  }

  OnAboutClicked(){
    this.router.navigate(['home/about'])
  }

  OnContactClicked(){
    this.router.navigate(['home/contact'])
  }

  OnHomeClicked(){
    this.router.navigate([''])
  }
}


