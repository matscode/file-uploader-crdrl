import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import FileUploader from "./pages/FileUploader.tsx"
import { Toaster } from "@/components/ui/sonner.tsx"
import { BrowserRouter, Route, Routes } from "react-router"
import Details from "@/pages/Details.tsx"
import Layout from "@/components/Layout.tsx"
import AppProvider from "@/components/context/AppProvider.tsx"
import WorksheetDetail from "@/pages/WorksheetDetail.tsx"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout/>}>
              <Route index element={<FileUploader/>}/>
              <Route path="details">
                <Route index element={<Details/>}/>
                <Route path=":sheet" element={<WorksheetDetail/>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>

        <Toaster position={"bottom-center"} richColors/>
      </AppProvider>
    </StrictMode>
)
