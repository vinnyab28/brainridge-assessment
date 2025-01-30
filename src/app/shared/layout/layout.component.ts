import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { } from "@ng-bootstrap/ng-bootstrap/";
import { HeaderComponent } from '../../components/header/header.component';
import { ToastService } from '../../services/toast.service';
import { SplashScreenLoaderComponent } from "../splash-screen-loader/splash-screen-loader.component";

@Component({
  selector: 'br-layout',
  imports: [RouterOutlet, HeaderComponent, NgClass, AsyncPipe, SplashScreenLoaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  toastService = inject(ToastService);

  ngOnInit(): void {

  }
}
