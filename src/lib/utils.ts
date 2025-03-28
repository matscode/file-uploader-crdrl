import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Worksheet } from "@/lib/types.ts"
import { LOCAL_WORKSHEET_KEY } from "@/lib/const.ts"
import { createContext } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getWorksheets() {
  return localStorage.getItem(LOCAL_WORKSHEET_KEY) ?? {}
}

export function syncWorksheets() {
  const worksheets = localStorage.getItem(LOCAL_WORKSHEET_KEY)
  return worksheets ? JSON.parse(worksheets) : []
}

export function saveWorksheet(worksheet: Worksheet) {
  const worksheets = localStorage.getItem(LOCAL_WORKSHEET_KEY)

  if (worksheets) {
    saveWorksheets([...JSON.parse(worksheets), worksheet])
  }
  else {
    saveWorksheets([worksheet])
  }
}

export function saveWorksheets(worksheets: Worksheet[]) {
  localStorage.setItem(LOCAL_WORKSHEET_KEY, JSON.stringify(worksheets))
}

export function clearWorksheets() {
  localStorage.removeItem(LOCAL_WORKSHEET_KEY)
}

export const AppContext = createContext<{
  worksheets: Worksheet[]
  saveWorksheet?: typeof saveWorksheet
  deleteWorksheet?: (sheetName: string) => void
  deleteAllWorksheets?: typeof clearWorksheets
}>({worksheets: []})

export const capitalizeFirstLetter = (str: string) => str.charAt(0).
    toUpperCase() + str.slice(1).toLowerCase()