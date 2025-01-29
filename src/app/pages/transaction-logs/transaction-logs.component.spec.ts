import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionLogsComponent } from './transaction-logs.component';

describe('TransactionLogsComponent', () => {
  let component: TransactionLogsComponent;
  let fixture: ComponentFixture<TransactionLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
