type DoDontProps = {
  dos: React.ReactNode[]
  donts: React.ReactNode[]
}

export function DoDont({ dos, donts }: DoDontProps) {
  return (
    <div className="do-dont">
      <div className="do-dont__col do-dont__col--do">
        <p className="do-dont__label">Do</p>
        <ul>{dos.map((item, i) => <li key={i}>{item}</li>)}</ul>
      </div>
      <div className="do-dont__col do-dont__col--dont">
        <p className="do-dont__label">Don’t</p>
        <ul>{donts.map((item, i) => <li key={i}>{item}</li>)}</ul>
      </div>
    </div>
  )
}
