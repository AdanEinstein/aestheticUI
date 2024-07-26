import {
  ForwardRefRenderFunction,
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react'
import { Dialog, DialogContent } from '../ui/dialog'

export interface IBasicModalProps extends PropsWithChildren {
  className?: string
}

export interface IModalAttributes {
  handleOpen: (open?: boolean) => void
}

const BasicModal: ForwardRefRenderFunction<IModalAttributes, IBasicModalProps> = (
  { children },
  ref,
) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = (_open: boolean = true) => setOpen(_open)

  useImperativeHandle(ref, () => {
    return {
      handleOpen,
    }
  })

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

export default forwardRef(BasicModal)
