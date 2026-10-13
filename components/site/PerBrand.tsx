import { DEMO_BRANDS, type DemoBrand } from '@/lib/demo-brands'

/**
 * Renders a value once per demo brand; CSS shows the one matching
 * <html data-brand>. Server-rendered, so the right value is there from first
 * paint and follows the brand switch without React.
 */
export function PerBrand({ children }: { children: (brand: DemoBrand) => React.ReactNode }) {
  return (
    <>
      {DEMO_BRANDS.map(b => (
        <span key={b} data-for={b} className="per-brand">{children(b)}</span>
      ))}
    </>
  )
}
