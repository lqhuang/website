declare module '*.md' {
  const MDXComponent: (props) => JSX.Element
  export default MDXComponent
}

declare module '*.mdx' {
  const MDXComponent: (props) => JSX.Element
  export default MDXComponent
}
