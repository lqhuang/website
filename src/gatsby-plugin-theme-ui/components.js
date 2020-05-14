/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import Prism from '@theme-ui/prism'

const heading = (Tag) => (props) => {
  if (!props.id) {
    return <Tag {...props}>{props.children}</Tag>
  }
  return (
    <Tag {...props}>
      Still Not work???
      <Styled.a href={`#${props.id}`}>#{props.children}</Styled.a>
    </Tag>
  )
}

const components = {
  h1: heading('h1'),
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  a: (props) => <a>not work either?{props.children}</a>,
  code: Prism,
}

export default components