// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import {DxButtonModule, DxDataGridModule} from 'devextreme-angular';
// import { EmployeeService } from '../../shared/services/employee.service';
// @Component({
//   selector: 'app-humanresource',
//   templateUrl: './humanresource.component.html',
//   styleUrl: './humanresource.component.scss',

// })
// export class HumanresourceComponent implements OnInit{
//   employeeStatuses: any[] =[];
//   constructor(private employeeService: EmployeeService) {}
//   async ngOnInit() {
//     this.employeeStatuses = await this.employeeService.getEmployeeStatuses()
//     console.log('Employees in Component:', this.employeeStatuses);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';



@Component({
  selector: 'app-humanresource',
  templateUrl: './humanresource.component.html',
  styleUrl: './humanresource.component.scss',
})
export class HumanresourceComponent implements OnInit {
  employeeStatuses: any[] = [];

  constructor(private employeeStatusService: EmployeeService) {}

  async ngOnInit() {
    try {
      const rawStatuses = await this.employeeStatusService.getEmployeeStatuses()
      this.employeeStatuses = await this.transformEmployeeStatuses(rawStatuses);
      console.log('Employee statuses:', this.employeeStatuses);
    } catch (error) {
      console.error('Error fetching employee statuses:', error);
    }
  }

  transformEmployeeStatuses(statuses: any[]) {
    return statuses.map(status => ({
      ...status,
      deskription: this.getDescription(status)
    }));
  }

  getDescription(status: any) {
    if (status.employeeStatusType === 'PKWT') {
      return status.isPKWTCompensation ? 'With Compasation' : 'Without Compensation';
    } else if (status.employeeStatusType === 'PKWTT') {
      return status.isProbation ? 'Probation' : 'Permanent';
    }
    return '';
  }

   editEmployeeStatus(id: string) {
    console.log('Edit employee status with ID:', id);
    // Implementasi logika edit di sini
  }

  deleteEmployeeStatus(id: string) {
    console.log('Delete employee status with ID:', id);
    // Implementasi logika hapus di sini
  }

  


}
