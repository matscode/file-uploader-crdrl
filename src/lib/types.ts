export type INGESTION = {
  "accountHolder": string
  "transactionType": string
  "amount": number
  "transactionDateTime": string
  "transactionReference": string
  [index: string]: string | number
}

export type Worksheet = {
  startDate: string
  endDate: string
  dateType: string
  sheetName: string
  sheet: string
}