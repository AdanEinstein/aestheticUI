"use client";
import {
  ReactNode,
  useEffect,
  useState
} from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  Chip,
  Collapse,
  Grid,
  Stack
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Card } from "../Layout/Card";
import Input from "../Forms/Input";
import { useFilterFields } from "./contexts/FilterFieldsContext";
import { tv } from "tailwind-variants";
import SearchIcon from "@mui/icons-material/Search";

export interface FilterCardRootProps<T extends object> {
  dataModel: GridColDef<T>[];
  
  title: string;
  action?: ReactNode;
  footer?: ReactNode;
  className: string;
}

const filterCardRoot = tv({
  base: "",
});

const FilterCardRoot = <T extends object>({
  dataModel,
  title,
  action,
  footer,
  className,
}: FilterCardRootProps<T>) => {
  const { fields, filterModalRef, removeField, setColumns, search, handleChangeSearch } = useFilterFields();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setColumns(dataModel);
  }, [setColumns, dataModel]);

  return (
    <Card.Root className={filterCardRoot({ className })}>
      <Card.Header className="flex justify-between">
        <div className="flex md:flex-row flex-col md:items-center items-start justify-start gap-3">
          <span className="font-light text-lg">
            Critérios de Pesquisa ({title}):{" "}
          </span>
          {fields?.map((field) => (
            <Chip
              style={{ backgroundColor: "#FFF" }}
              key={field.value}
              label={field.label}
              variant="filled"
              onDelete={() => removeField(field.value)}
            />
          ))}
        </div>
        <div
          className="hover:bg-blue-300 rounded-lg p-1"
          onClick={() => setShow((prev) => !prev)}
        >
          <SearchIcon />
        </div>
      </Card.Header>
      <Collapse in={show}>
        <Card.Body className="flex flex-col gap-3">
          <Grid container spacing={2}>
            <Grid item lg={10} sm={8} xs={12}>
              {fields?.length ? fields?.map((field, index) => (
                <Input
                  key={`pesquisa_${field.value}`}
                  className="w-full"
                  label={field.label || 'Filtro vazio'}
                  type="text"
                  id="pesquisa"
                  name={`pesquisa_${field.value}`}
                  placeholder="Termo de pesquisa"
                  value={search[index]}
                  onChange={(e) => handleChangeSearch(e, index)}
                />
              )) : (
                <Input
                  className="w-full"
                  label="Pesquisa"
                  type="text"
                  id="pesquisa"
                  name="pesquisa"
                  placeholder="Termo de pesquisa"
                  value={search[0]}
                  onChange={handleChangeSearch}
                />
              ) }
            </Grid>
            <Grid item lg={2} sm={4} xs={12}>
              <Stack>
                <Button
                  size="large"
                  type="button"
                  variant="outlined"
                  endIcon={<FilterAltIcon />}
                  onClick={() => filterModalRef.current?.openModal()}
                >
                  Filtrar
                </Button>
              </Stack>
            </Grid>
          </Grid>
          {action}
        </Card.Body>
        <Card.Footer>
          {footer}
        </Card.Footer>
      </Collapse>
    </Card.Root>
  );
};

export default FilterCardRoot;
