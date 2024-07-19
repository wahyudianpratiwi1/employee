

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://hrms-api.dev.andalsoftware.com/graphql';

  async getEmployeeStatuses() {
    const query = `
      query {
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
      }
    `;

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CustomerId': '_d97njgf5objr8ftoxas7sp1heh',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data.employeeStatuses.map((status: any) => ({
        ...status,
        createdAt: new Date(status.createdAt),
        updatedAt: new Date(status.updatedAt),
      }));
    } catch (error) {
      console.error('Error fetching employee statuses:', error);
      return [];
    }
  }

  async createEmployeeStatuses(newStatus : any){
    const mutation = `
      mutation ($employeeStatus: [EmployeeStatusInput!]!) {
        createEmployeeStatuses(employeeStatus: $employeeStatus)
      }
    `;
  const variables = {
      employeeStatus: [
        {
          employeeStatusName: newStatus.employeeStatusName,
          employeeStatusType: newStatus.employeeStatusType,
          duration: newStatus.duration,
          isPKWTCompensation: newStatus.isPKWTCompensation,
          isProbation: newStatus.isProbation
        }
      ]
    };

    try{
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CustomerId': '_d97njgf5objr8ftoxas7sp1heh',
        },
        body: JSON.stringify({query: mutation, variables}),
      });

      const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.createEmployeeStatuses[0];
      // if(!response.ok){
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

    }catch(error){
      console.error('Error mutation:', error);
      throw error
    }
    
  }

  async updateEmployeeStatuses( updatedStatus: any) {
    const mutation = `mutation ($employeeStatus: EmployeeStatusInput!) {
  updateEmployeeStatus(employeeStatus: $employeeStatus)
}`
    const variables = {
      employeeStatus:{
        id:updatedStatus.id,
        employeeStatusName: updatedStatus.employeeStatusName,
        employeeStatusType: updatedStatus.employeeStatusType,
        duration: updatedStatus.duration,
        isPKWTCompensation: updatedStatus.isPKWTCompensation,
        isProbation: updatedStatus.isProbation
      }
    };
     try{
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CustomerId': '_d97njgf5objr8ftoxas7sp1heh',
        },
        body: JSON.stringify({query: mutation, variables}),
      });
       
       if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }
    console.log("error", response)
    return result.data.updateEmployeeStatus;
  } catch (error) {
    console.error('Error mutation:', error);
    throw error;
  }
  
  }

  async deleteEmployeeStatuses(id: string){
    const mutation = `
    mutation {
  deleteEmployeeStatus(id: "${id}")
}`;

    try{
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'CustomerId': '_d97njgf5objr8ftoxas7sp1heh',
        },
        body: JSON.stringify({query: mutation}),
      });
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    }catch(error){
      console.error('Error mutation:', error);
      throw error
    }

  }
}
