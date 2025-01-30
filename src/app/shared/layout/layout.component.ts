import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { } from "@ng-bootstrap/ng-bootstrap/";
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'br-layout',
  imports: [RouterOutlet, HeaderComponent,],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent { }
