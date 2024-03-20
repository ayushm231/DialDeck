import { observer } from "mobx-react"
import { ToastContainer } from "react-toastify"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import Header from "./components/header"
import ContactsList from "./components/ContactsList"
import ContactView from "./components/ContactView"
import View from "./components/ContactView/view"
import Edit from "./components/ContactView/edit"
import Add from "./components/add"

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={2500} theme="dark" />
      <Header />
      <div className="pt-20 md:pt-20 max-w-full m-auto">
      
        <Routes>
          <Route path="/" element={<ContactsList />} />
          <Route path="/contact/:id" element={<ContactView />}>
            <Route path="/contact/:id" element={<View />} />
            <Route path="/contact/:id/edit" element={<Edit />} />
          </Route>
          <Route path="/add" element={<Add />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default observer(App)
