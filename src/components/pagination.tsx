import Link from 'next/link'

// const Pagination = ({ page, totalPages, navigate }) => {
//   return (
//     <div className="btn btn-group">
//       <button className="btn">1</button>
//       <button className="btn btn-active">2</button>
//       <button className="btn">3</button>
//       <button className="btn">4</button>
//     </div>
//   )
// }

interface PostLinkProps {
  title: string
  href: string
}

interface PrevNext {
  prev?: PostLinkProps
  next?: PostLinkProps
}

export const PrevNextNav = ({ prev, next }: PrevNext) => {
  const placeholder = 'Some articles'
  return (
    <div className="btn-group flex flex-col">
      <Link className="self-start no-underline" href={prev ? prev.href : '#'}>
        <div className="flex flex-row">
          <div className="mr-3 flex items-center">{'<-'}</div>
          <div className="flex flex-col">
            <div>Prev</div>
            <div>{placeholder}</div>
          </div>
        </div>
      </Link>
      <Link className="self-end no-underline" href={next ? next.href : '#'}>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="self-end">Next</div>
            <div>{placeholder}</div>
          </div>
          <div className="ml-3 flex items-center">{'>'}</div>
        </div>
      </Link>
    </div>
  )
}
