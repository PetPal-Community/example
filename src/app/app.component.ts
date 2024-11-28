import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo3';
  private Router = inject(Router);
  irReport():void{
    this.Router.navigate(['/reports'])
  }

  irRedis():void{
    this.Router.navigate(['/register'])
  }
}
