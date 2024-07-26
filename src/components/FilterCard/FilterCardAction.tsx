import { tv } from "tailwind-variants";
import { Button } from "../ui/button";
import { ReactNode } from "react";

export interface IFilterCardActionProps {
  label: ReactNode,
  className?: string
}

const filtercardaction = tv({
  base: '',
})

export default function FilterCardAction({label, className}: IFilterCardActionProps) {
  return (
    <Button
      className={filtercardaction({ className })}
    >
      {label}
    </Button>
  )
}
