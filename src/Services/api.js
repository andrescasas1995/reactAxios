import axios from 'axios';
export default {
  api: axios.create({
    // baseURL: `http://maurouc-001-site2.atempurl.com/api/`, 
    baseURL: `http://localhost:3500/`, 
  })
  // , services: {
  //   users: "RTUsers",
  //   areas:"RTAreas"
  // }
  , services: {
    customers: "customer",
    documentTypes: "documentType"
  }
};