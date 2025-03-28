import { useContext, useEffect, useMemo, useState } from "react"
import { AppContext, capitalizeFirstLetter, cn } from "@/lib/utils.ts"
import { useParams } from "react-router"
import { INGESTION } from "@/lib/types.ts"
import readXlsxFile from "read-excel-file"
import { INGESTION_SCHEMA } from "@/lib/const.ts"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import dataURLtoBlob from "dataurl-to-blob"
import { Input } from "@/components/ui/input.tsx"

const WorksheetDetail = () => {
  const {worksheets} = useContext(AppContext)
  const {sheet: sheetName} = useParams()
  const [ingestedRecords, setIngestedRecords] = useState<Array<INGESTION>>([])
  const [q, setQ] = useState("")
  const isASingleSheetView = sheetName !== "all"
  const searchFunction = (row: INGESTION) => !q ||
      (q && row.accountHolder.toLowerCase().includes(q.toLowerCase()))

  const worksheet = useMemo(() => worksheets.find(
          worksheet => !isASingleSheetView || isASingleSheetView &&
              worksheet.sheetName === sheetName),
      [sheetName, worksheets])

  useEffect(() => {
    if (isASingleSheetView && !worksheet) return

    (async () => {
      const ingestionAcrossSheets = []

      if (isASingleSheetView) {
        ingestionAcrossSheets.push(readXlsxFile(dataURLtoBlob(worksheet!.sheet),
            {
              schema: INGESTION_SCHEMA
            }))
      }
      else {
        worksheets.forEach((worksheet) => {
          ingestionAcrossSheets.push(
              readXlsxFile(dataURLtoBlob(worksheet!.sheet),
                  {
                    schema: INGESTION_SCHEMA
                  }))
        })
      }

      // idx helps to keep records unique across multiple sheets
      const rows = (await Promise.all(ingestionAcrossSheets)).reduce(
          (aggregateRows, {rows}, idx) => ([
            ...aggregateRows,
            ...rows.map(row => ({
              ...row,
              _x: isASingleSheetView ? undefined : idx
            }))] as INGESTION[]),
          [] as INGESTION[])

      setIngestedRecords(rows as INGESTION[])
    })()
  }, [worksheet, worksheets])

  return <section className={"text-left self-start py-8 space-y-4 w-full"}>
    <header className={"flex items-center gap-4 flex-wrap"}>
      <section className={"grow"}>
        <h4 className={"text-xl font-bold text-gray-900"}>
          {ingestedRecords.filter(
              searchFunction).length} records {isASingleSheetView
            ? "in"
            : "across"} <span
            className={"text-blue-700 hyphens-auto"}>{sheetName}</span> sheet
        </h4>
        <p className={"text-sm text-gray-500"}>
          These are the records rows inside the sheet you selected
        </p>
      </section>

      <aside className={"shrink-0"}>
        <Input value={q} onChange={e => setQ(e.target.value)}
               placeholder="Search name"/>
      </aside>
    </header>

    <section className={"overflow-auto w-full"}>
      <table
          className={"table-auto border-collapse min-w-full whitespace-nowrap"}>
        <thead>
        <tr>
          <th className={"bg-gray-700 text-white py-2 px-4"}>
            First Name
          </th>
          <th className={"bg-gray-700 text-white py-2 px-4"}>
            Last Name
          </th>
          <th className={"bg-gray-700 text-white py-2 px-4 text-right"}>
            Amount
          </th>
          <th className={"bg-gray-700 text-white py-2 px-4"}>
            Date
          </th>
          <th className={"bg-gray-700 text-white py-2 px-4"}>
            Type
          </th>
          <th className={"bg-gray-700 text-white py-2 px-4"}>
            Reference
          </th>
          <th className={cn("bg-gray-700 text-white py-2 px-4 text-right", {
            hidden: ingestedRecords[0]?._x === undefined
          })}>
            Worksheet
          </th>
        </tr>
        </thead>
        <tbody>
        {ingestedRecords.filter(searchFunction).map(row => {
          const names = row.accountHolder.split(/\s/)
          const firstName = capitalizeFirstLetter(names[0])
          const lastName = capitalizeFirstLetter(names?.[1] ?? "")

          return (
              <tr className={"even:bg-gray-100 hover:bg-gray-200 transition ease-in-out"}
                  key={row.transactionReference + (row?._x?.toString() ?? "")}>
                <td className={"border-b border-gray-300 px-4 py-2 font-medium"}>
                  {firstName}
                </td>
                <td className={"border-b border-gray-300 px-4 py-2 font-medium"}>
                  {lastName}
                </td>
                <td className={"border-b border-gray-300 px-4 py-2 text-right tracking-wide font-mono font-medium text-blue-700"}>{
                  new Intl.NumberFormat("ng-US", {
                    style: "currency",
                    currency: "NGN"
                  }).format(row.amount)
                }</td>
                <td className={"border-b border-gray-300 px-4 py-2"}>{new Date(
                    row.transactionDateTime).toUTCString()}</td>
                <td className={"border-b border-gray-300 px-4 py-2"}>{row.transactionType}</td>
                <td className={"border-b border-gray-300 px-4 py-2"}>{row.transactionReference}</td>
                <td className={cn(
                    "border-b border-gray-300 px-4 py-2 text-right tracking-wide font-mono font-medium text-blue-700",
                    {
                      hidden: row?._x === undefined
                    })}>
                  {Number(row?._x) + 1}
                </td>
              </tr>
          )
        })}
        </tbody>
      </table>
    </section>
  </section>
}

export default WorksheetDetail