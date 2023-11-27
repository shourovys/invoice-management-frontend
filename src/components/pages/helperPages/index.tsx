import Button from 'components/atomic/Button'
import MainLayout from 'components/layout/MainLayout'
import { Link } from 'react-router-dom'
import routeProperty from 'routes/routeProperty'

interface IProps {
  statusCode?: string
  title?: string
  message?: string
  buttonText?: string
  buttonLink?: string
}
function HelperPages({
  statusCode = '404',
  title = "Sorry, we couldn't find this page.",
  message = "But don't worry, you can find plenty of other things on our dashboard.",
  buttonText = 'Back to Dashboard',
  buttonLink = routeProperty.dashboard.path(),
}: IProps) {
  return (
    <MainLayout>
      <section className="flex items-center h-full p-16 bg-coolGray-900 text-coolGray-100">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl text-coolGray-600">
              <span className="sr-only">Error</span>
              {statusCode}
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">{title}</p>
            <p className="mt-4 mb-8 text-coolGray-400">{message}</p>
            <Link to={buttonLink}>
              <Button>{buttonText}</Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default HelperPages
