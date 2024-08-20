import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import SetupDashboard from "./admin/layouts/SetupDashboard";
// import { Provider } from "react-redux";
// import store from "./admin/redux/store";

function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="admin/*" element={<AdminDashboard />} />
          <Route exact path="admin/setup/" element={<SetupDashboard />} />

          {/* <Route exact path="*" element={<TemplateHome />} /> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
      {/* </Provider> */}
    </div>
  );
}

export default App;
