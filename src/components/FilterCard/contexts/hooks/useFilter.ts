"use client";
import { GridColDef } from "@mui/x-data-grid";
import {} from "react";
import { useFilterFields } from "../FilterFieldsContext";
import flatObject from "../../../../utils/flatObject";
import { adjustedDate } from "../../../../utils/converters/date";

export default function useFilter<T extends object>(
  data: T[],
  model: GridColDef[]
) {
  const { fields, search } = useFilterFields();

  const filteredData = data.filter((item) => {
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
                fields?.map((el) => el.value).includes(key)
            );
          }
          return (
            `${value}`.toLowerCase().includes(sch.toLowerCase()) &&
            fields?.map((el) => el.value).includes(key)
          );
        });
      });
    }

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
  });

  return { filteredData };
}
