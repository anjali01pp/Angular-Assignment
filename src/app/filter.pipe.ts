import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(employees: any[], searchText: string): any[] {
    if (!employees || !searchText) {
      return employees;
    }

  
    searchText = searchText.toLowerCase();
    return employees.filter(employee => {
      return employee.name.toLowerCase().startsWith(searchText);
   
    });
   
  }
}
