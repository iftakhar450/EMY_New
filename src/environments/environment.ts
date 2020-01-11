// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  projectStatus: [{ id: 1, text: 'In-progress' }, { id: 2, text: 'Hold' },
  { id: 3, text: 'Completed' }, { id: 4, text: 'Maintenence Period' }, { id: 5, text: 'Handover Period' }],
  attenedenceStatus: [{ id: 1, text: 'Present' }, { id: 2, text: 'Absent' },
  { id: 3, text: 'Leave' }, { id: 4, text: 'Weekend' }],

  // baseUrl: 'http://inspire-builder.herokuapp.com',
  baseUrl: 'http://localhost:3000',
  loginApi: '/login',
  // employees
  addNewEmplyee: '/users/createNewUser',
  allEmployees: '/users/getAllUser',
  deleteEmployee: '/users/deleteUser',
  editEmployee: '/users/updateUser',
  // departments
  allDepartments: '/settings/getAllDepartments',
  addNewDepartment: '/settings/addDepartment',
  deleteDeparment: '/settings/deleteDepartment',
  updateDeparment: '/settings/updateDepartment',
  // prfessions
  allProfessions: '/settings/getAllProfession',
  addNewProfession: '/settings/addProfession',
  deleteProfession: '/settings/deleteProfession',
  updateProfession: '/settings/updateProfession',
  // worknatures
  allWorknatures: '/settings/getAllWorknatures',
  addNewWorknature: '/settings/addWorknature',
  deleteWorknature: '/settings/deleteWorknature',
  updateWorknature: '/settings/updateWorknature',
  // projects
  allProjects: '/projects/getAllProjects',
  addNewProject: '/projects/createProject',
  deleteProject: '/projects/deleteProject',
  updateProject: '/projects/updateProject',
  // attendence
  todayAttendence: '/atn/getTodayAttendence',
  addAttendence: '/atn/addAttendence',
  updateAttendence: '/atn/updateAttendence',
  deleteAttendence: '/atn/deleteAttendence',
  fetchCardData: '/atn/fetchCardData',
  //  reports
  monthlySalaryData: '/reports/getMonthlySalaryData',
  dashboardData: '/reports/getDashboardData'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
