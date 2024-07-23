
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/services/employee.service';
import { DxDataGridComponent } from 'devextreme-angular';



@Component({
  selector: 'app-humanresource',
  templateUrl: './humanresource.component.html',
  styleUrl: './humanresource.component.scss',
})
export class HumanresourceComponent implements OnInit {
  employeeStatuses: any[] = [];
 @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
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
  isAdding: boolean = false;

   onSaved(e: any) {
    this.isAdding = false;
  }


  constructor(private employeeStatusService: EmployeeService) { }

  async ngOnInit() {
    await this.loadEmployeeStatuses();
    this.isAdding = false;
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

  
  async onSaving(e: any) {
  console.log('onSaving triggered', e);
  e.cancel = true;
  if (e.changes.length > 0) {
    const change = e.changes[0];
    try {
      switch (change.type) {
        case 'insert':
          console.log("change data", change.data)
          const newData = {
            employeeStatusName: change.data.employeeStatusName,
            employeeStatusType: change.data.employeeStatusType,
            duration: change.data.duration,
            isPKWTCompensation: change.data.isPKWTCompensation === undefined ? false : Boolean(change.data.isPKWTCompensation),
            isProbation: change.data.isProbation === undefined ? false : Boolean(change.data.isProbation)
          };
          console.log('Creating new employee status:', newData);
          const insertedResult = await this.employeeStatusService.createEmployeeStatuses(newData);
          if (insertedResult) {
            this.employeeStatuses.push(this.transformEmployeeStatuses([insertedResult])[0]);
            console.log('New employee status created:', insertedResult);
          }
          break;

        case 'update':
          var dataUpdated = this.employeeStatuses.filter(x => x.id === change.key);
          const updatedData = {
            id: change.key,
            employeeStatusName: change.data.employeeStatusName ? change.data.employeeStatusName : dataUpdated[0].employeeStatusName,
            employeeStatusType: change.data.employeeStatusType ? change.data.employeeStatusType : dataUpdated[0].employeeStatusType,
            duration: change.data.duration ? change.data.duration : dataUpdated[0].duration,
            isPKWTCompensation: Boolean(change.data.isPKWTCompensation) ? change.data.isPKWTCompensation : dataUpdated[0].isPKWTCompensation,
            isProbation: Boolean(change.data.isProbation) ? change.data.isProbation : dataUpdated[0].isProbation
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
  this.isAdding = false;
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
onEditingStart(e: any) {
  console.log('onEditingStart triggered', e);
  this.isAdding = e.data === undefined;

  }
  onInitNewRow(e: any) {
  this.isAdding = true;
}
onAddClick() {
  this.isAdding = true;
  this.dataGrid.instance.addRow();
}

  onRowRemoved(e: any) {
    this.isAdding = false;
  }
  getEmployeeStatusTypeName = (rowData: any) => {
  const statusType = this.employeeStatusTypes.find(type => type.id === rowData.employeeStatusType);
  return statusType ? statusType.name : '';
}
  onEditorPreparing(e: any) {

  if (e.dataField === "employeeStatusType") {
    e.editorOptions.dataSource = this.employeeStatusTypes;
    e.editorOptions.displayExpr = "name";
    e.editorOptions.valueExpr = "id";
    e.editorOptions.onValueChanged = (args: any) => {
      e.setValue(args.value);
      console.log(`${e.dataField} changed to:`, args.value);
    };
  } else if (e.dataField === "isPKWTCompensation" || e.dataField === "isProbation") {
    e.editorOptions.value = e.value !== undefined ? Boolean(e.value) : false;
    e.editorOptions.onValueChanged = (args: any) => {
      const newValue = Boolean(args.value);
      e.setValue(newValue);
      console.log(`${e.dataField} changed to:`, newValue);
    };
  }
    if (e.component) {
    const originalSetCellValue = e.component.option('onSetCellValue');
    e.component.option('onSetCellValue', (rowData: any, value: any, currentRowData: any) => {
      console.log(`Setting ${e.dataField} to:`, value);
      if (originalSetCellValue) {
        originalSetCellValue(rowData, value, currentRowData);
      }
    });
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