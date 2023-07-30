import { ReactNode } from 'react'

import { Pagination } from './components/pagination'

export const ListLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col flex-1">{children}</div>
      {children}
      <Pagination />
    </div>
  )
}
