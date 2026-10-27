import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary — deep navy
        default:
          'rounded-lg bg-navy-800 text-white hover:bg-navy-700 active:bg-navy-900 shadow-sm hover:shadow-md',
        // Navy alias (same as default, explicit for readability in admin CMS)
        navy:
          'rounded-lg bg-navy-800 text-white hover:bg-navy-700 active:bg-navy-900 shadow-sm hover:shadow-md',
        // Gold accent
        gold:
          'rounded-lg bg-gradient-to-br from-gold-300 to-gold-500 text-navy-800 font-semibold hover:from-gold-200 hover:to-gold-400 shadow-gold hover:shadow-gold-lg active:from-gold-400 active:to-gold-600',
        // Outlined navy
        outline:
          'rounded-lg border border-navy-800/25 text-navy-800 bg-transparent hover:bg-navy-800 hover:text-white hover:border-navy-800 transition-all',
        // Outlined gold
        'outline-gold':
          'rounded-lg border border-gold-400 text-gold-600 bg-transparent hover:bg-gold-50 active:bg-gold-100',
        // Ghost
        ghost:
          'rounded-lg text-charcoal bg-transparent hover:bg-ivory-200',
        // Destructive
        destructive:
          'rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-sm',
        // Link
        link:
          'text-navy-800 underline-offset-4 hover:underline hover:text-gold-600 bg-transparent p-0 h-auto',
        // Secondary (ivory)
        secondary:
          'rounded-lg bg-ivory-200 text-navy-800 hover:bg-ivory-300',
      },
      size: {
        xs:        'h-7 px-3 text-xs',
        sm:        'h-9 px-4 text-sm',
        default:   'h-10 px-5 text-sm',
        lg:        'h-12 px-7 text-[15px]',
        xl:        'h-14 px-9 text-base',
        icon:      'h-10 w-10 rounded-lg',
        'icon-sm': 'h-8 w-8 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
