/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import Prism from '@theme-ui/prism'

const heading = (Tag) => (props) => {
  if (!props.id) {
    return <Tag {...props}>{props.children}</Tag>
  }
  return (
    <Tag {...props}>
      <a href={`#${props.id}`}>#</a>
      {props.children}
    </Tag>
  )
}

const components = {
  // h1: heading('h1'),
  // h2: heading('h2'),
  // h3: heading('h3'),
  // h4: heading('h4'),
  // a: (props) => <a>{props.children}</a>,
  code: Prism,
}

export default components
