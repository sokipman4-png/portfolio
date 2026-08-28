import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-[90] bg-black/55 backdrop-blur-[3px]" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn("ui-dialog fixed left-1/2 top-1/2 z-[100] max-h-[88vh] w-[min(820px,calc(100%-24px))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto p-6 outline-none md:p-8", className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="ui-icon-button absolute right-5 top-5 grid h-9 w-9 place-items-center">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = "DialogContent"

export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
