import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  forecasts(forecasts: any) {
      throw new Error('Method not implemented.');
  }
  ngOnInit() {
      throw new Error('Method not implemented.');
  }
  title = 'retrobills.client';
}
