import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'br-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent { }
