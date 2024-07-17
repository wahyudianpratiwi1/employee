import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://hrms-api.dev.andalsoftware.com/graphql'

  async getEmployee(){
    const query = `
    {
      employeeStatuses {
          createdAt
          createdBy
          duration
          employeeStatusName
          employeeStatusType
          id
          isPKWTCompensation
          isProbation
          isUsed
          updatedAt
          updatedBy
      }
  }`;
  const respons = await fetch(this.apiUrl, {
    method : 'POST',
    headers : {
      'CustomerId' : '_d97njgf5objr8ftoxas7sp1heh',
    }

  })
  }
  

  constructor() { }
}
