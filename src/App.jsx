import { Outlet, useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import Navbar from "./components/Navbar"
import { ProductContext } from "./context/ProductContext"
import { UserLoginContext } from "./context/UserLoginContext"

const App = () => {
  const { filterProducts } = useContext(ProductContext);
  const { category } = useParams();

  const { keycloak } = useContext(UserLoginContext)

  useEffect(() => {
    filterProducts(category)
  }, [category])

  return (
    <div className="h-auto bg-slate-200">
      {keycloak && keycloak.authenticated ? (
        <>
          <Navbar />
          <div className="w-[80%] m-auto my-4 bg-white p-4">
            <Outlet />
          </div>
        </>
      ) : (
        <div>Login</div>
      )}
    </div>
  )
}

export default App
