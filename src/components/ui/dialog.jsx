import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger

export const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px] data-[state=open]:animate-in" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[min(720px,calc(100%-24px))] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[28px] border border-line bg-paper p-6 shadow-2xl outline-none md:p-8",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-line hover:bg-panel">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = "DialogContent"

export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
