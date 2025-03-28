import { useContext } from "react"
import { AppContext } from "@/lib/utils.ts"
import { Link } from "react-router"
import { Button } from "@/components/ui/button.tsx"

const Details = () => {
  const {worksheets, deleteWorksheet, deleteAllWorksheets} = useContext(AppContext)

  return <section className={"text-left self-start py-8 space-y-4 w-full"}>
    <header className={"flex items-center gap-4 flex-wrap"}>
      <section className={"grow"}>
        <h4 className={"text-xl font-bold text-gray-900"}>
          Worksheets
        </h4>
        <p className={"text-sm text-gray-500"}>
          Click on a worksheet to see the records within
        </p>
      </section>

      <aside className={"shrink-0 flex items-center gap-4"}>
        <Link to={`/details/all`}>
          <Button className={"cursor-pointer"}>
            See all records
          </Button>
        </Link>

        <Button onClick={() => deleteAllWorksheets?.()} variant={"destructive"} className={"cursor-pointer"}>
          Purge all sheets
        </Button>
      </aside>
    </header>

    <section className={"overflow-auto w-full"}>
      <table
          className={"table-auto border-collapse min-w-full whitespace-nowrap"}>
        <thead>
        <tr>
          <th className={"bg-gray-700 text-white py-2 px-4"}>
            File
          </th>
          <th className={"bg-gray-700 text-white py-2 px-4"}>
            Start Date
          </th>
          <th className={"bg-gray-700 text-white py-2 px-4"}>
            End Date
          </th>
          <th className={"bg-gray-700 text-white py-2 px-4"}>
            Date Type
          </th>
          <th className={"bg-gray-700 text-white py-2 px-4"}>
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        {worksheets.map(worksheet => (
            <tr className={"even:bg-gray-100 hover:bg-gray-200 transition ease-in-out"}>
              <td className={"border-b border-gray-300 px-4 py-2 font-bold"}>
                <Link to={`/details/${worksheet.sheetName}`}
                      className={"text-gray-700 hover:text-gray-900 transition ease-in-out"}
                >{worksheet.sheetName}</Link>
              </td>
              <td className={"border-b border-gray-300 px-4 py-2"}>{new Date(
                  worksheet.startDate).toUTCString()}</td>
              <td className={"border-b border-gray-300 px-4 py-2"}>{new Date(
                  worksheet.endDate).toUTCString()}</td>
              <td className={"border-b border-gray-300 px-4 py-2"}>{worksheet.dateType} months</td>
              <td className={"border-b border-gray-300 px-4 py-2"}>
                <Button variant={"destructive"} onClick={() => deleteWorksheet?.(worksheet.sheetName)} className={"cursor-pointer"}>Purge</Button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </section>
  </section>
}

export default Details