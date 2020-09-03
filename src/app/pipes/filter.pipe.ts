import { Pipe, PipeTransform } from '@angular/core';
import { List } from '../models/list';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(lists: List[], done: boolean = true): List[] {
    return lists.filter(listData => listData.done === done)
  }

}
