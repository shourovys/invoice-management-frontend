import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IActionsButton } from 'types/components/actionButtons'
import Icon, { homeIcon, menuIcon } from 'utils/icons'
import generateBreadcrumbs, { TPageRoutes } from 'utils/routeMaker'
import ActionButtons from '../common/ActionButtons'

interface IBreadcrumbsProps {
  pageRoutes?: TPageRoutes
  breadcrumbsActions?: IActionsButton[]
  children?: ReactNode
}
export default function Breadcrumbs({
  pageRoutes: propsPageRoutes,
  breadcrumbsActions,
  children,
}: IBreadcrumbsProps) {
  const location = useLocation()

  const { title: pageTitle, pageRoutes } = generateBreadcrumbs(location.pathname + location.search)

  return (
    <section className="flex flex-wrap items-center justify-between px-4 py-2 sm:flex-nowrap md:py-4 md:px-0 gap-y-1 gap-x-8">
      <nav
        className="flex flex-col gap-1.5 md:items-center md:flex-row md:gap-12 lg:min-h-[36px] flex-shrink-0"
        aria-label="Breadcrumb"
      >
        <h1 className="text-lg font-semibold text-black capitalize md:text-xl">{pageTitle}</h1>
        <ol className="flex items-center gap-2 md:gap-4">
          <li>
            <div>
              <Link to="/" className="customer_text_hover">
                <Icon
                  icon={homeIcon}
                  className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          {propsPageRoutes
            ? propsPageRoutes.map((page) => (
                <li key={page.text}>
                  <div className="flex items-center">
                    <Icon
                      icon={menuIcon}
                      className="flex-shrink-0 w-4 h-4 text-block"
                      aria-hidden="true"
                    />
                    <Link
                      to={page.href}
                      className="ml-2 text-xs font-medium capitalize md:text-sm md:ml-4 customer_text_hover"
                    >
                      {page.text}
                    </Link>
                  </div>
                </li>
              ))
            : pageRoutes.map((page) => (
                <li key={page.text}>
                  <div className="flex items-center">
                    <Icon
                      icon={menuIcon}
                      className="flex-shrink-0 w-4 h-4 text-block"
                      aria-hidden="true"
                    />
                    <Link
                      to={page.href}
                      className="ml-2 text-xs font-medium capitalize md:text-sm md:ml-4 customer_text_hover"
                    >
                      {page.text}
                    </Link>
                  </div>
                </li>
              ))}
        </ol>
      </nav>
      {children && <div className="flex-shrink hidden sm:block">{children}</div>}
      {/* action buttons */}
      {breadcrumbsActions ? <ActionButtons actionButtons={breadcrumbsActions} /> : null}
      {children && (
        <div className="flex items-center justify-end w-full sm:hidden">
          <div className="">{children}</div>
        </div>
      )}
    </section>
  )
}
