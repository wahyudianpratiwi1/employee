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

  newEmployeeStatus: any={
    employeeStatusName : '',
    employeeStatusType : '',
    duration  : null,
    isPKWTCompensation : null,
    isProbation : null,
  };

  // newupdateEmployeeStatus: any={
  //   employeeStatusName : '',
  //   employeeStatusType : '',
  //   duration  : null,
  //   isPKWTCompensation : null,
  //   isProbation : null,
  // }

  employeeStatusTypes: { id: string; name: string }[] = [
    { id: 'PKWT', name: 'PKWT' },
    { id: 'PKWTT', name: 'PKWTT' },
  ];

  constructor(private employeeStatusService: EmployeeService) {}

  async ngOnInit() {
    await this.loadEmployeeStatuses();
  }

  async loadEmployeeStatuses() {
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

   async updateEmployeeStatus(id: string, status: any) {
     console.log('Edit employee status with ID:', id);
     try {
       const updatedStatus = await this.employeeStatusService.updateEmployeeStatuses(status);
      
      const index = this.employeeStatuses.findIndex(s => s.id === id);
      if (index !== -1) {
        this.employeeStatuses[index] = updatedStatus;
      }
      console.log("Employee Status updated", updatedStatus);
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
   }

  deleteEmployeeStatus(id: string) {
    console.log('Delete employee status with ID:', id);
    try{
      this.employeeStatusService.deleteEmployeeStatuses(id);
      this.employeeStatuses = this.employeeStatuses.filter(status=> status.id!==id);
    }catch(error){
      console.error('Error fetching employee statuses:', error);
    }
  }

  // async onSaving(e: any) {
  //   e.cancel = true; // Prevent the default saving behavior
    
  //   if (e.changes.length > 0) {
  //     const change = e.changes[0];
      
  //     if (change.type === 'insert') {
  //       await this.createEmployeeStatus(change.data);
  //     } else if (change.type === 'update') {
  //       await this.updateEmployeeStatus(change.key, change.data);
  //     } else if (change.type === 'remove') {
  //       await this.deleteEmployeeStatus(change.key);
  //     }
      
  //     await this.loadEmployeeStatuses(); // Reload the data
  //   }
  // }

  async onSaving(e: any) {
    e.cancel = true;
    if (e.changes.length > 0) {
      const change = e.changes[0];
      try {
        let result;
        if (change.type === 'insert') {
          result = await this.employeeStatusService.createEmployeeStatuses(change.data);
        } else if (change.type === 'update') {
          result = await this.employeeStatusService.updateEmployeeStatuses(change.data);
        // } else if (change.type === 'remove') {
        //   await this.employeeStatusService.deleteEmployeeStatuses(change.key);
        //   const index = this.employeeStatuses.findIndex(status => status.id === change.key);
        //   if (index !== -1) {
        //     this.employeeStatuses.splice(index, 1);
        //   }
        }

        if (result) {
          const transformedResult = this.transformEmployeeStatuses([result])[0];
          const index = this.employeeStatuses.findIndex(status => status.id === result.id);
          if (index !== -1) {
            this.employeeStatuses[index] = transformedResult;
          } else {
            this.employeeStatuses.push(transformedResult);
          }
        }
        e.component.refresh(true);
      } catch (error) {
        console.error('Error saving employee status:', error);
      }
    }
  }

  async createEmployeeStatus(status: any){
    try{
      const newStatus = await this.employeeStatusService.createEmployeeStatuses(this.newEmployeeStatus);
      this.employeeStatuses.push(newStatus);
      console.log("New Employee Status created", status);
      this.newEmployeeStatus={
        employeeStatusName : '',
        employeeStatusType : '',
        duration  : null,
        isPKWTCompensation : null,
        isProbation : null,
      }
    }catch(error){
      console.error('Error create employee statuses:', error);
    }
  }

  


}
