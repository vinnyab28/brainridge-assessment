import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { } from "@ng-bootstrap/ng-bootstrap/";
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ToastService } from '../../services/toast.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'br-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AsyncPipe, ToastComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  toastService = inject(ToastService);

  ngOnInit(): void {

  }
}
