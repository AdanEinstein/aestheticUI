"use client"
import { Button, Grid } from "@mui/material";
import { JSXElementConstructor, PropsWithChildren, ReactNode } from "react";
import { tv } from "tailwind-variants";

export interface IFilterCardActionProps {
  href: string
  label: string
  icon?: ReactNode
  className?: string
  variant?: 'text' | 'outlined' | 'contained'
  linkWrapper: JSXElementConstructor<PropsWithChildren<{ href: string; }>>;
}

const filtercardaction = tv({
  base: ''
})

export default function FilterCardAction({href, icon, label, className, variant = 'text', linkWrapper: Link}: IFilterCardActionProps) {
  return (
    <Grid container>
      <Grid item md={3} sm={4} xs={12}>
        <Link href={href}>
          <Button fullWidth type="button" endIcon={icon} className={filtercardaction({className})} variant={variant}>
            {label}
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
