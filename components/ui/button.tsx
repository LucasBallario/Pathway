import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-[14px] font-normal transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-slate focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-void aria-invalid:ring-amber-glow/30 aria-invalid:border-amber-glow",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-[#3a3a3a] to-dark-carbon text-absolute-zero hover:opacity-90",
        destructive:
          "bg-amber-glow/20 text-amber-glow border border-amber-glow/40 hover:bg-amber-glow/30",
        outline:
          "border border-dark-carbon bg-transparent text-polar-white hover:border-slate hover:bg-midnight-void",
        secondary:
          "bg-midnight-void text-polar-white border border-dark-carbon hover:border-slate",
        ghost:
          "text-ash-gray hover:text-polar-white bg-transparent",
        link: "text-amber-glow underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 text-[13px] has-[>svg]:px-2.5",
        lg: "h-11 rounded-lg px-6 text-[16px] has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
