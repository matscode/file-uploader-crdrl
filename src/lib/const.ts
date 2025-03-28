import { object, string } from "yup"

export const INGESTION_SCHEMA = {
  'Account holder': {
    prop: 'accountHolder',
    type: String,
  },
  "Transaction type" :{
    prop: 'transactionType',
    type: String,
  },
  "Amount": {
    prop: 'amount',
    type: Number,
  },
  "transaction datetime":{
    prop: 'transactionDateTime',
    type: String,
  },
  "Transaction reference":{
    prop: 'transactionReference',
    type: String,
  }
}

export const LOCAL_WORKSHEET_KEY = "ingested_worksheet"

export const FILE_UPLOAD_VALIDATION_SCHEMA = object({
  startDate: string().required().label("Start date"),
  endDate: string().required().label("End date"),
  dateType: string().required().label("Date type"),
})