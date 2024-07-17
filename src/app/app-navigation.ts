export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text : 'Human Resource',
    path: '/humanresource'
  },
  {
    text: 'Payroll',
    // path: '/home',
    icon: 'home',
    items:[
      {
        text: 'Basic Sallary',
        path: '/basicsallary'
      },
      {
        text: 'Salary Component',
        path: '/salarycomponent'
      },
      {
        text: 'Insurance Component',
        path: '/insurancecomponent'
      },
      {
        text: 'Disbursement',
        path: '/disbursement'
      },
      {
        text: 'Severance & Merit',
        path: '/saverance'
      },
      
    ]
  },
  // {
  //   text: 'Report',
  //   // path: '/home',
  //   icon: 'home',
  //   items:[
  //     {
  //       text: 'Pivot Table'
  //     }
  //   ]
  // },
  // {
  //   text: 'Settings',
  //   path: '/settings',
  //   icon: 'home'
  // },
  {
    text:'Report',
    items:[
      {
        text: 'Pivot Table',
        path:'/pivot'
      }
    ]
  },
  {
    text: 'Settings',
    path: '/settings',
    icon: 'home'
  },
  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile'
      },
      {
        text: 'Tasks',
        path: '/tasks'
      }
    ]
  }
];
