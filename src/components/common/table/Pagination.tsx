import classNames from 'classnames'
import useUpdateRouteQuery from '../../../hooks/useUpdateRouteQuery'
import Icon, { leftArrowIcon, rightArrowIcon } from '../../../utils/icons'
import RowsPerPageSelector from './RowsPerPageSelector'
import t from '../../../utils/translator'

type TDirection = 1 | -1

interface IPaginationProps {
  totalRows: number
  currentPage: number
  rowsPerPage: number
  currentPath: string
  onPageChange: (_page: number) => void
  onRowsPerPageChange?: (_rowsPerPage: number) => void
  rowsPerPageDisabled?: boolean
}

export default function Pagination({
  totalRows,
  currentPage,
  rowsPerPage,
  currentPath,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageDisabled,
}: IPaginationProps) {
  const updateRouteQuery = useUpdateRouteQuery()
  const totalPages = Math.ceil(totalRows / rowsPerPage)
  const pageNumbers = Array.from(Array(totalPages).keys(), (x) => x + 1)

  let startIndex: number, endIndex: number
  if (totalPages <= 5) {
    startIndex = 0
    endIndex = totalPages - 1
  } else if (currentPage <= 3) {
    startIndex = 0
    endIndex = 4
  } else if (currentPage >= totalPages - 2) {
    startIndex = totalPages - 5
    endIndex = totalPages - 1
  } else {
    startIndex = currentPage - 3
    endIndex = currentPage + 1
  }

  const displayedPages = pageNumbers.slice(startIndex, endIndex + 1)

  // handling pagination
  const isPrevDisabled = (): boolean => currentPage <= 1
  const isNextDisabled = (): boolean => currentPage >= totalPages

  const handlePrevNextPaginate = (direction: TDirection) => {
    if (direction === -1 && isPrevDisabled()) {
      return
    }
    if (direction === 1 && isNextDisabled()) {
      return
    }
    updateRouteQuery({
      query: { page: currentPage + direction },
      pathName: currentPath,
    })
    onPageChange(currentPage + direction)
  }

  const handleNumberPaginate = (clickedPage: number) => {
    updateRouteQuery({
      query: { page: clickedPage },
      pathName: currentPath,
    })
    onPageChange(clickedPage)
  }

  const from = totalRows ? (currentPage - 1) * rowsPerPage + 1 : 0
  const to =
    (currentPage - 1) * rowsPerPage + rowsPerPage < totalRows
      ? (currentPage - 1) * rowsPerPage + rowsPerPage
      : totalRows

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={() => handlePrevNextPaginate(-1)}
          className={classNames(
            'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50',
            isPrevDisabled() ? 'opacity-50 cursor-not-allowed' : '',
            currentPage === 1 ? 'bg-gray-100 hover:bg-gray-100' : 'bg-white hover:bg-gray-50'
          )}
        >
          Previous
        </button>
        <button
          onClick={() => handlePrevNextPaginate(1)}
          className={classNames(
            'relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50',
            isNextDisabled() ? 'opacity-50 cursor-not-allowed' : '',
            currentPage === totalPages
              ? 'bg-gray-100 hover:bg-gray-100'
              : 'bg-white hover:bg-gray-50'
          )}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            {/*{t(`Showing ${from} to ${to} of ${totalRows} results`)}*/}
            {t`Showing`}
            <span className="font-medium">&nbsp;{to}&nbsp;</span>
            {t`to`}&nbsp;
            <span className="font-medium">{from}</span>
            &nbsp;{t`of`}&nbsp;
            <span className="font-medium">{totalRows}</span>
            &nbsp;{t`results`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {onRowsPerPageChange && (
            <RowsPerPageSelector
              totalRows={totalRows}
              rowsPerPage={rowsPerPage}
              currentPath={currentPath}
              onRowsPerPageChange={onRowsPerPageChange}
              disabled={rowsPerPageDisabled}
            />
          )}
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label={t`Pagination`}
          >
            <button
              onClick={() => handlePrevNextPaginate(-1)}
              className={classNames(
                'relative inline-flex items-center px-2 py-2 text-sm font-medium border border-gray-300 rounded-l-md',
                isPrevDisabled() ? 'opacity-50 cursor-not-allowed' : '',
                currentPage === 1
                  ? 'bg-gray-100 hover:bg-gray-100'
                  : 'bg-white hover:text-paginationHoverText hover:bg-paginationHoverBg hover:border-paginationHoverBg'
              )}
              disabled={isPrevDisabled()}
            >
              <span className="sr-only">{t`Previous`}</span>
              <Icon icon={leftArrowIcon} className="w-5 h-5" aria-hidden="true" />
            </button>
            {totalPages > 5 && currentPage > 3 && (
              <>
                <button
                  onClick={() => handleNumberPaginate(1)}
                  className={classNames(
                    'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300',
                    currentPage === 1
                      ? 'text-paginationActivePageText bg-paginationActivePageBg hover:bg-paginationHoveBg'
                      : 'bg-white hover:text-paginationHoverText hover:bg-paginationHoverBg border border-gray-300 hover:border-paginationHoverBg'
                  )}
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300">
                    ...
                  </span>
                )}
              </>
            )}
            {displayedPages.map((page) => (
              <button
                key={page}
                onClick={() => handleNumberPaginate(page)}
                className={classNames(
                  'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 ',
                  currentPage === page
                    ? 'text-paginationActivePageText bg-paginationActivePageBg hover:bg-paginationHoveBg'
                    : 'bg-white hover:text-paginationHoverText hover:bg-paginationHoverBg border border-gray-300 hover:border-paginationHoverBg'
                )}
              >
                {page}
              </button>
            ))}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="relative inline-flex items-center px-4 py-2 -mr-px text-sm font-medium text-gray-700 bg-white border border-gray-300">
                    ...
                  </span>
                )}
                <button
                  onClick={() => handleNumberPaginate(totalPages)}
                  className={classNames(
                    'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300',
                    currentPage === totalPages
                      ? 'text-paginationActivePageText bg-paginationActivePageBg hover:bg-paginationHoveBg'
                      : 'bg-white hover:text-paginationHoverText hover:bg-paginationHoverBg border border-gray-300 hover:border-paginationHoverBg'
                  )}
                >
                  {totalPages}
                </button>
              </>
            )}
            <button
              onClick={() => handlePrevNextPaginate(1)}
              className={classNames(
                'relative inline-flex items-center px-2 py-2 text-sm font-medium border border-gray-300 rounded-r-md',
                isNextDisabled() ? 'opacity-50 cursor-not-allowed' : '',
                currentPage === totalPages
                  ? 'bg-gray-100 hover:bg-gray-100'
                  : 'bg-white hover:text-paginationHoverText hover:bg-paginationHoverBg hover:border-paginationHoverBg'
              )}
              disabled={isNextDisabled()}
            >
              <span className="sr-only">{t`Next`}</span>
              <Icon icon={rightArrowIcon} className="w-5 h-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
