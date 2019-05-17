import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        console.log(searchText);
        console.log(items);
        if (searchText.length >= 3) {
            return items.filter(it => {
                return it.name.includes(searchText) || it.salary.includes(searchText) || it.retirementDate.includes(searchText);
            });
        }
        else {
            return items;
        }
    }
}