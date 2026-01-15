import { Routes, Route } from "react-router";
import Dashboard from "./screen/Dashboard";
import DashboardHome from "./screen/DashboardHome";
import BranchList from "./screen/BranchList";
import CreateBranch from "./screen/CreateBranch";
import Products from "./screen/Products";
import AddProducts from "./screen/AddProducts";
import ProductEditForm from "./screen/ProductEditForm";
import ProductViewCard from "./screen/ProductViewCard";
import Employees from "./screen/Employees";
import AddEmployee from "./screen/AddEmployee";
import EditEmployee from "./screen/EditEmployee";
import EditBranch from "./screen/EditBranch";
import Banking from "./screen/Banking";
import AddBankAccount from "./screen/AddBankAccount";
import AddTransactionForm from "./screen/AddTransactionForm";
import BankAccountsSummary from "./screen/BankAccountsSummary";
import EditBankAccountForm from "./screen/EditBankAccountForm";
import InvoiceList from "./screen/InvoiceList";
import LoginForm from "./screen/LoginForm";
import SignupForm from "./screen/SignupForm";
import ForgetPasswordForm from "./screen/ForgetPassword";
import ProtectedRoutes from "./screen/ProtectedRoutes";
import PublicWrapper from "./screen/PublicWrapper";
import EmployeesList from "./screen/EmployeesList";
import Branch from "./screen/Branch";
import AddStock from "./screen/AddStock";
import InvertoryList from "./screen/InvertoryList";
import Inventory from "./screen/Inventory";
import EditStock from "./screen/EditStock";
import CreateCategory from "./screen/createCategory";
import EditCategory from "./screen/EditCategory";
import CategoryList from "./screen/categoryList";
import ProductList from "./screen/ProductList";
import BankAccountsTable from "./screen/BankAccountsTable";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicWrapper />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgetpassword" element={<ForgetPasswordForm />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />

          {/* Branch */}
          <Route path="branch" element={<Branch />}>
            <Route index element={<BranchList />} />
            <Route path="createbranch" element={<CreateBranch />} />
            <Route path="editbranch/:id" element={<EditBranch />} />
          </Route>

          {/* Inventory & Category */}
          <Route path="inventory" element={<Inventory />}>
            <Route index element={<InvertoryList />} /> {/* Default list */}
            <Route path="inventorylist" element={<InvertoryList />}>
              <Route index element={<AddStock />} />
              <Route path="editstock" element={<EditStock />} />
            </Route>
            {/* Nested Category inside Inventory */}
            <Route path="createcategory" element={<CategoryList />}>
              <Route index element={<CreateCategory />} />
              <Route path="editcategory" element={<EditCategory />} />
            </Route>
          </Route>

          {/* Products */}
          <Route path="product" element={<Products />}>
            <Route index element={<ProductList />} />
            <Route path="addproduct" element={<AddProducts />} />
            <Route path="editproduct/:id" element={<ProductEditForm />} />
            <Route path="viewcardproduct" element={<ProductViewCard />} />
          </Route>

          {/* Employees */}
          <Route path="employees" element={<Employees />}>
            <Route index element={<EmployeesList />} />
            <Route path="addemployee" element={<AddEmployee />} />
            <Route path="editemployee/:id" element={<EditEmployee />} />
          </Route>

          {/* Banking */}
          <Route path="banking" element={<Banking />}>
            {/* <Route index element={<BankAccountsTable />} /> */}
            <Route path="addbankaccount" element={<AddBankAccount />} />
            <Route path="addtransaction" element={<AddTransactionForm />} />
            <Route path="bankaccountsummary" element={<BankAccountsSummary />}/>
            <Route path="editebankaccount/:id" element={<EditBankAccountForm />}/>
          </Route>

          {/* Invoice */}
          <Route path="invoice" element={<InvoiceList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
