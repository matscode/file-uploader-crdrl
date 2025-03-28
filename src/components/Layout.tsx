import { Outlet } from "react-router"
import NavBar from "@/components/NavBar.tsx"

const Layout = () => {
  return <section className={"px-4 flex flex-col w-full min-h-screen"}>
    <NavBar/>
    <main className={"py-4 grow flex justify-center items-center"}>
      <Outlet/>
    </main>
  </section>
}

export default Layout