import { Link, NavLink } from "react-router"

const NavBar = () => {
  return <header className={"py-4 flex justify-between items-center"}>
    <Link to="/">
      <h1 className={"border border-b-4 border-gray-700 py-1 px-2.5 rounded-t-2xl tracking-wide inline-block font-black text-lg text-gray-500"}>FileUp</h1>
    </Link>

    <nav className={"flex items-center gap-4"}>
      <NavLink to="/">
        Upload file
      </NavLink>

      <NavLink to="/details">
        Details
      </NavLink>
    </nav>
  </header>
}

export default NavBar