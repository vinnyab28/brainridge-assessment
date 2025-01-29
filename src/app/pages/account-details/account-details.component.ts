import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'br-account-details',
  imports: [NgbAccordionModule, CurrencyPipe, CommonModule],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss',
  styles: `
		.custom-header::after {
			content: none;
		}
	`,
})
export class AccountDetailsComponent {

}
