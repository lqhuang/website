import { twMerge } from 'tailwind-merge'

export function BlockSideTitle({
  title,
  children,
}: {
  title: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <figure>
      <span className="inline-block w-full">
        <span className="sidenote-content float-left w-full">{children}</span>
      </span>
      <span
        className={twMerge(
          'sidenote text-rurikon-400 relative mx-auto mt-3.5 mb-7 block w-[80%] text-left text-xs leading-5 text-pretty sm:text-sm sm:leading-6',
          'text:inline text:float-right text:clear-right text:w-[50%] text:-mr-[50%] text:mt-0 text:pl-7',
        )}
      >
        <span className="sr-only">Sidenote: </span>
        {title}
      </span>
    </figure>
  )
}
