/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import Prism from '@theme-ui/prism'
import type { ImageProps, HeadingProps } from 'theme-ui'

const heading = (Tag: string) => (props: HeadingProps) => {
  if (!props.id) {
    return <Tag {...props} />
  }
  const { id, children, ...leftProps } = props
  return (
    <Tag {...leftProps}>
      {children}
      <a href={`#${id}`}>#</a>
    </Tag>
  )
}

const components = {
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  // a: (props) => <a>{props.children}</a>,
  code: Prism,
  img: (props: ImageProps) => <img style={{ maxWidth: '90%' }} {...props} />,
}

export default components
