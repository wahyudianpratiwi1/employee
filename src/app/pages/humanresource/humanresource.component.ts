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
  selectedEmployeeStatus: EmployeeStatus | null = null;
  newEmployeeStatus: any = {
    id: '',
    employeeStatusName: '',
    employeeStatusType: '',
    duration: null,
    isPKWTCompensation: false,
    isProbation: false,
  };
  employeeStatusTypes: { id: string; name: string }[] = [
    { id: 'PKWT', name: 'PKWT' },
    { id: 'PKWTT', name: 'PKWTT' },
  ];

  constructor(private employeeStatusService: EmployeeService) { }

  async ngOnInit() {
    await this.loadEmployeeStatuses();
  }

  transformEmployeeStatuses(statuses: EmployeeStatus[]): EmployeeStatus[] {
    return statuses.map(status => ({
      ...status,
      description: this.getDescription(status)
      
    }
    ));
  }
  //   onCheckBoxValueChanged(fieldName: string, e: any) {
  //   console.log(`${fieldName} changed to:`, e.value);
  // }
  async loadEmployeeStatuses() {
    try {
      const rawStatuses = await this.employeeStatusService.getEmployeeStatuses()
      this.employeeStatuses = await this.transformEmployeeStatuses(rawStatuses);
      console.log('Employee statuses:', this.employeeStatuses);
    } catch (error) {
      console.error('Error fetching employee statuses:', error);
    }
  }

  // transformEmployeeStatuses(statuses: any[]) {
  //   return statuses.map(status => ({
  //     ...status,
  //     deskription: this.getDescription(status)
  //   }));
  // }

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
      const updatedStatus = await this.employeeStatusService.updateEmployeeStatuses(id, status);
      const index = this.employeeStatuses.findIndex(s => s.id === id);
      if (index !== -1) {
        this.employeeStatuses[index] = updatedStatus;
      }
      console.log("Employee Status updated", updatedStatus);
      this.newEmployeeStatus = {
        id :'',
        employeeStatusName : '',
        employeeStatusType : '',
        duration  : null,
        isPKWTCompensation : false,
        isProbation : false,
      }
    } catch (error) {
      console.error('Error updating employee status:', error);
    }
  }

  deleteEmployeeStatus(id: string) {
    console.log('Delete employee status with ID:', id);
    try {
      this.employeeStatusService.deleteEmployeeStatuses(id);
      this.employeeStatuses = this.employeeStatuses.filter(status => status.id !== id);
    } catch (error) {
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

  // async onSaving(e: any) {
  //   e.cancel = true;
  //   if (e.changes.length > 0) {
  //     const change = e.changes[0];
  //     try {
  //       let result : EmployeeStatus;
  //      if (change.type === 'insert' || change.type === 'update') {
  //       const data = {
  //         ...change.data,
  //         isPKWTCompensation: Boolean(change.data.isPKWTCompensation),
  //         isProbation: Boolean(change.data.isProbation)
  //       };
  //       console.log('Saving data:', data);

  //       if (change.type === 'insert') {
  //         result = await this.employeeStatusService.createEmployeeStatuses(data);
  //       } else {
  //         result = await this.employeeStatusService.updateEmployeeStatuses(data.id, data);
  //       }
  //       if (result) {
  //         const transformedResult = this.transformEmployeeStatuses([result])[0];
  //         const index = this.employeeStatuses.findIndex(status => status.id === result.id);
  //         if (index !== -1) {
  //           this.employeeStatuses[index] = transformedResult;
  //         } else {
  //           this.employeeStatuses.push(transformedResult);
  //         }
        
  //       }
  //       } else if (change.type === 'remove') {
  //         await this.employeeStatusService.deleteEmployeeStatuses(change.key);
  //         const index = this.employeeStatuses.findIndex(status => status.id === change.key);
  //         if (index !== -1) {
  //           this.employeeStatuses.splice(index, 1);
  //         }
  //       }
       
  //       e.component.refresh(true);
  //     } catch (error) {
  //       console.error('Error saving employee status:', error);
  //     }
  //   }
  // }
  async onSaving(e: any) {
  console.log('onSaving triggered', e);
  e.cancel = true;
  if (e.changes.length > 0) {
    const change = e.changes[0];
    try {
      switch (change.type) {
        case 'insert':
          const newData = {
            employeeStatusName: change.data.employeeStatusName,
            employeeStatusType: change.data.employeeStatusType,
            duration: change.data.duration,
            isPKWTCompensation: Boolean(change.data.isPKWTCompensation),
            isProbation: Boolean(change.data.isProbation)
          };
          console.log('Creating new employee status:', newData);
          const insertedResult = await this.employeeStatusService.createEmployeeStatuses(newData);
          if (insertedResult) {
            this.employeeStatuses.push(this.transformEmployeeStatuses([insertedResult])[0]);
            console.log('New employee status created:', insertedResult);
          }
          break;

        case 'update':
          const updatedData = {
            id: change.key,
            employeeStatusName: change.data.employeeStatusName,
            employeeStatusType: change.data.employeeStatusType,
            duration: change.data.duration,
            isPKWTCompensation: Boolean(change.data.isPKWTCompensation),
            isProbation: Boolean(change.data.isProbation)
          };
          console.log('Updating employee status:', updatedData);
          const updatedResult = await this.employeeStatusService.updateEmployeeStatuses(updatedData.id, updatedData);
          if (updatedResult) {
            const index = this.employeeStatuses.findIndex(status => status.id === updatedResult.id);
            if (index !== -1) {
              this.employeeStatuses[index] = this.transformEmployeeStatuses([updatedResult])[0];
            }
            console.log('Employee status updated:', updatedResult);
          }
          break;

        case 'remove':
          console.log('Deleting employee status with ID:', change.key);
          await this.employeeStatusService.deleteEmployeeStatuses(change.key);
          this.employeeStatuses = this.employeeStatuses.filter(status => status.id !== change.key);
          console.log('Employee status deleted');
          break;

        default:
          console.warn('Unhandled operation type:', change.type);
          return;
      }

      e.component.refresh(true);
    } catch (error) {
      console.error('Error saving employee status:', error);
      alert('An error occurred while saving. Please try again.');
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
        isPKWTCompensation : false,
        isProbation : false,
      }
    }catch(error){
      console.error('Error create employee statuses:', error);
    }
  }
 onCheckBoxValueChanged(e: any) {
    const updatedValue = e.value;
    console.log(`Checkbox value changed to: ${updatedValue}`);
    this.employeeStatuses = this.employeeStatuses.map(status => {
        if (status.id === e.data.id) {
            return { ...status, isProbation: updatedValue };
        }
        return status;
    });
 }
   onRowClick(e: any) {
    this.selectedEmployeeStatus = e.data;
  }
  
  onEditorPreparing(e: any) {
  if (e.dataField === "isPKWTCompensation" || e.dataField === "isProbation") {
    e.editorOptions.value = Boolean(e.value);
    e.editorOptions.onValueChanged = (args: any) => {
      e.setValue(Boolean(args.value));
    };
  }
}


}

interface EmployeeStatus{
  id:string,
  employeeStatusName : string,
    employeeStatusType : string,
    duration  : number,
    isPKWTCompensation : boolean,
    isProbation : boolean,
}