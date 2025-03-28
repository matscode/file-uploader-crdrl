import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label.tsx"
import readXlsxFile from "read-excel-file"
import { FILE_UPLOAD_VALIDATION_SCHEMA, INGESTION_SCHEMA } from "@/lib/const.ts"
import { ChangeEvent, useContext, useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { INGESTION, Worksheet } from "@/lib/types.ts"
import { AppContext, wait } from "@/lib/utils.ts"
import { toast } from "sonner"
import {
  Select,
  SelectContent, SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useFormik } from "formik"

const FileUploader = () => {
  const [ingestState, setIngestState] = useState<"idle" | "pending" | "done">(
      "idle")
  const [ingestedRecords, setIngestedRecords] = useState<Array<INGESTION>>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const {saveWorksheet} = useContext(AppContext)

  const handleIngest = async (values: Omit<Worksheet, "sheet" | "sheetName">) => {
    setIngestState("pending")
    await wait(1000)
    try {

      // The beautiful loader must show 😁
      // I just want to represent heavy file ingestion experience at the simplest form
      const reader = new FileReader()
      reader.onload = async () => {
        // count file
        const {rows} = await readXlsxFile(selectedFile!,
            {
              schema: INGESTION_SCHEMA
            })

        // save worksheet
        const originalFileName = selectedFile?.name.split(".")[0]?.replace(/\s/,
            "_")
        // I could write an algorithm to detect the proper file extension for when
        // the user select a file without an extension. Rare but possible. Fortunately
        // this is a test. so, I am defaulting it to "xlsx"
        const fileExt = selectedFile?.name.split(".")?.[1] ?? "xlsx"
        saveWorksheet?.({
          ...values,
          sheetName: `${originalFileName}_${new Date().getTime()}.${fileExt}`,
          sheet: reader.result as string
        })

        // update UI
        setIngestedRecords(rows as Array<INGESTION>)
        setSelectedFile(null)
        setIngestState("done")
      }

      reader.onerror = (e) => {
        throw new Error(e.toString())
      }

      reader.readAsDataURL(selectedFile!)
    }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (e) {
      toast.error("Something went wrong")
      setIngestState("idle")
    }
  }

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
      dateType: ""
    },
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: FILE_UPLOAD_VALIDATION_SCHEMA,
    onSubmit: handleIngest
  })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      toast.error("You must specify the file to upload")
      return
    }

    if (file.size < 4028) {
      toast.error("Invalid excel document")
      return
    }

    if (file.size > 4999999) {
      toast.error("Max file size is too large")
      return
    }

    setSelectedFile(file ?? null)

    formik.handleBlur(event)
  }

  return <section className={"max-w-lg py-8 space-y-4 w-full"}>
    {ingestState === "idle" &&
      <form className={"flex flex-col gap-6 items-start"}
            onSubmit={formik.handleSubmit}>
        <section className={"flex flex-col gap-3 w-full"}>
          <Label htmlFor="worksheet" className={"text-base"}>
            Select worksheet
          </Label>
          <Input id="worksheet"
                 type="file"
                 className={"pt-3 pb-2 px-5 flex items-center h-auto"}
                 onChange={handleFileChange}
                 accept={".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}/>
        </section>

        <section className={"flex flex-col gap-6 w-full px-8"}>
          <section className={"flex flex-col gap-3 w-full"}>
            <Label htmlFor="dateType">Date type</Label>
            <Select name="dateType"
                    onValueChange={(v) => formik.setFieldValue("dateType", v)}
                    value={formik.values.dateType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Month duration"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 month</SelectItem>
                <SelectItem value="2">2 months</SelectItem>
                <SelectItem value="6">6 months</SelectItem>
              </SelectContent>
            </Select>
          </section>

          <section className={"flex gap-6 w-full flex-wrap"}>
            <section className={"flex flex-col gap-3 w-full"}>
              <Label htmlFor="startDate">Start date</Label>
              <Input type={"date"} id={"startDate"} name={"startDate"}
                     onChange={formik.handleChange}
                     value={formik.values.startDate}/>
            </section>

            <section className={"flex flex-col gap-3 w-full"}>
              <Label htmlFor="endDate">End date</Label>
              <Input type={"date"} id={"endDate"} name={"endDate"}
                     onChange={formik.handleChange}
                     value={formik.values.endDate}/>
            </section>
          </section>

          <footer className={"self-end"}>
            <Button type={"submit"} disabled={formik.isSubmitting ||
                !!Object.keys(formik.errors).length || !selectedFile}>
              Ingest records
            </Button>
          </footer>
        </section>

        <footer className={"flex flex-col gap-2 justify-center items-center w-full pt-16"}>
          <h5 className={"leading-none font-medium text-gray-500"}>
            Sample worksheet
          </h5>
          <section
            className={"flex flex-col gap-1 justify-center items-center w-full grow text-sm *:text-blue-500"}>
            <a
              href="/sample/financial_transactions_january.xlsx"
              download={true}>financial_transactions_january.xlsx</a>
            <a
              href="/sample/financial_transactions_february.xlsx"
              download={true}>financial_transactions_february.xlsx</a>
            <a
              href="/sample/financial_transactions_march.xlsx"
              download={true}>financial_transactions_march.xlsx</a>
          </section>
        </footer>
      </form>}

    {ingestState === "pending" &&
      <section className={"animate-pulse w-full flex flex-col gap-4"}>
        <section className={"w-full h-5 bg-gray-300 rounded-lg"}/>
        <section className={"w-1/2 h-5 bg-gray-300 rounded-lg"}/>
        <section className={"w-3/4 h-5 bg-gray-300 rounded-lg"}/>
        <section className={"w-1/3 h-5 bg-gray-300 rounded-lg"}/>
        <section className={"w-4/5 h-5 bg-gray-300 rounded-lg"}/>
      </section>}

    {ingestState === "done" &&
      <section className={"flex gap-4 items-center"}>
        <p className={"grow text-xl font-medium text-gray-800"}>
          {ingestedRecords.length} records ingested
        </p>

        <Button onClick={() => setIngestState("idle")} type="button">
          Done
        </Button>
      </section>
    }
  </section>
}

export default FileUploader