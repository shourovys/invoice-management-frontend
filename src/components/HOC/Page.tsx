import { PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import generateTitle from 'utils/routerTitle'

interface IPageProps {
  title?: string
  meta?: JSX.Element
}

function Page({ children, title = '', meta }: PropsWithChildren<IPageProps>) {
  const location = useLocation()
  const generatedTitle = generateTitle(location.pathname + location.search)
  return (
    <>
      <Helmet>
        <title>{`${title || generatedTitle} | Jupiter`}</title>
        {meta}
      </Helmet>

      {children}
    </>
  )
}

export default Page
