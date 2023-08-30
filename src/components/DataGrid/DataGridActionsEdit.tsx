import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren, ReactNode, useCallback} from "react";
import { tv } from "tailwind-variants";
import EditIcon from '@mui/icons-material/Edit';
import { useDataGrid } from "./contexts/DataGridContext";

export interface IDataGridActionsEditProps extends ButtonProps {
  label: string;
  className?: string;
  variant?: "text" | "contained" | "outlined";
  color?: "error" | "inherit" | "primary" | "secondary" | "success" | "info" | "warning";
  endIcon?: ReactNode;
}

const dataGridActionsEdit = tv({
  base: 'bg-blue-500'
})

export default function DataGridActionsEdit({ className, color = 'info', endIcon = <EditIcon/>, label, variant = 'contained', children, ...rest }: PropsWithChildren<IDataGridActionsEditProps>) {
  const {modalEditRef, setComponentEdit} = useDataGrid()

  const openModal = useCallback(() => {
    setComponentEdit(children)
    modalEditRef.current?.openModal()
  }, [setComponentEdit, modalEditRef, children])

  return (
    <Button
      className={dataGridActionsEdit({className})}
      variant={variant}
      color={color}
      endIcon={endIcon}
      onClick={openModal}
      {...rest}
    >
      {label}
    </Button>
  );
}
