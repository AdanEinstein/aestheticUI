import { GridColDef } from "@mui/x-data-grid";
import { useFilterFields } from "../FilterFieldsContext";
import flatObject from "../../../../utils/flatObject";
import { adjustedDate } from "../../../../utils/converters/date";
import { useEffect, useState } from "react";

export default function useFilter<T extends object>({data, model}: {
  data: T[],
  model: GridColDef[]
}) {
  const { fields, search } = useFilterFields();
  const [filteredData, setFilteredData] = useState(data)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const newFilteredData = data.filter((item) => {
        if (!!fields.length) {
          return search.every((sch) => {
            return Object.entries(flatObject(item)).some(([key, value]) => {
              const columns = model.filter((col) => col.field == key);
              if (
                !!columns.length &&
                columns[0].type == "date" &&
                (typeof value == "string" || typeof value == "number")
              ) {
                return search.some(
                  (sch) =>
                    Intl.DateTimeFormat("pt-br", { dateStyle: "short" })
                      .format(adjustedDate(`${value}`))
                      .toLowerCase()
                      .includes(sch.toLowerCase()) &&
                    fields.map((el) => el.value).includes(key)
                );
              }
              return (
                `${value}`.toLowerCase().includes(sch.toLowerCase()) &&
                fields.map((el) => el.value).includes(key)
              );
            });
          });
        } else {
          return search.every((sch) => {
            return Object.entries(flatObject(item)).some(([key, value]) => {
              const columns = model.filter((col) => col.field == key);
              if (
                !!columns.length &&
                columns[0].type == "date" &&
                (typeof value == "string" || typeof value == "number")
              ) {
                return Intl.DateTimeFormat("pt-br", { dateStyle: "short" })
                  .format(adjustedDate(`${value}`))
                  .toLowerCase()
                  .includes(sch.toLowerCase());
              }
              return `${value}`.toLowerCase().includes(sch.toLowerCase());
            });
          });
        }
      });
    
      setFilteredData(newFilteredData)
      setLoading(false)
    }, 0)

  }, [search])

  return { filteredData, loading };
}
