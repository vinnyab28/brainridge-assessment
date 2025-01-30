import { Pipe, PipeTransform } from '@angular/core';
import { TransactionLog } from '../models/transaction-log.model';

@Pipe({
  name: 'filterLogs'
})
export class FilterLogsPipe implements PipeTransform {

  transform(value: TransactionLog[], args: string): unknown {

    return value;
  }

}
