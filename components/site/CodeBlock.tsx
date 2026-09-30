import { CopyButton } from './CopyButton'

type CodeBlockProps = {
  code: string
  language?: string
  /** Shown above the code, e.g. a file name. */
  title?: string
}

// Prose to paste (a prompt, an instruction) wraps; code keeps its lines.

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  return (
    <figure className="code-block">
      <div className="code-block__bar">
        <figcaption className="code-block__title">{title ?? language ?? 'code'}</figcaption>
        <CopyButton text={code} label={title ? `Copy ${title}` : 'Copy code'} />
      </div>
      <pre className={language === 'text' ? 'code-block__pre code-block__pre--wrap' : 'code-block__pre'} tabIndex={0}>
        <code>{code}</code>
      </pre>
    </figure>
  )
}
