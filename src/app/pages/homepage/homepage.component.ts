import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'br-homepage',
  imports: [NgClass],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  userClicked: boolean = false;
  router: Router = inject(Router);

  onEnter() {
    this.userClicked = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}
