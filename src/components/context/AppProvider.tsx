import { ReactNode, useState } from "react"
import {
  AppContext,
  clearWorksheets,
  saveWorksheet, saveWorksheets,
  syncWorksheets
} from "@/lib/utils.ts"
import { Worksheet } from "@/lib/types.ts"

const AppProvider = ({children}: { children: ReactNode }) => {
  const [worksheets, setWorksheets] = useState(syncWorksheets)

  return <AppContext.Provider
      value={{
        worksheets,
        saveWorksheet: (worksheet) => {
          saveWorksheet(worksheet)
          setWorksheets(syncWorksheets())
        },
        deleteWorksheet: (sheetName: string) => {
          clearWorksheets()
          saveWorksheets(worksheets.filter((worksheet: Worksheet) => worksheet.sheetName !== sheetName))
          setWorksheets(syncWorksheets())
        },
        deleteAllWorksheets: () => {
          clearWorksheets()
          setWorksheets(syncWorksheets())
        }
      }}>
    {children}
  </AppContext.Provider>
}

export default AppProvider