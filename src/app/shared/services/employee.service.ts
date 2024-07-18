// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {
//   private apiUrl = 'https://hrms-api.dev.andalsoftware.com/graphql';

//   async getEmployeeStatuses(){
//     const query = `
//       query {
//         employeeStatuses {
//           createdAt
//           createdBy
//           duration
//           employeeStatusName
//           employeeStatusType
//           id
//           isPKWTCompensation
//           isProbation
//           isUsed
//           updatedAt
//           updatedBy
//         }
//       }
//     `;
//     try {
//        const response = await fetch(this.apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'CustomerId': '_d97njgf5objr8ftoxas7sp1heh',
//         }, body: JSON.stringify({ query }),

//       });
//       const result = await response.json();
//       console.log("Fatched Employees:", result.data.employees);
//       return result.data.employees;
//     } catch (error) {
//       console.error('Error fetching employee statuses:', error);
//       return [];
//     }
    
//   }
  
// }


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
}
