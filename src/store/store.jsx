import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import signupReducer from "./slices/signUpAdminSlice";
import employeesReducer from "./slices/employeeSlice";
import branchReducer from "./slices/branchSlice";
import categoryReducer from "./slices/categorySlice";
import stockReducer from "./slices/inventorySlice";
import sectionReducer from "./slices/sectionSlice";
import productReducer from "./slices/productSlice";
import bankAccountReducer from "./slices/bankAccountSlice";
import transactionReducer from "./slices/transactionSlice";

export const store = configureStore({
     reducer: {
    login: loginReducer,
    adminSignup: signupReducer,
    employees: employeesReducer,
    branch: branchReducer,
    category: categoryReducer,
    inventory: stockReducer,
    section: sectionReducer,
    product: productReducer,
    bankAccount: bankAccountReducer,
    transactions: transactionReducer,

  },
})