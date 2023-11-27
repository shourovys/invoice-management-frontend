import classNames from 'classnames'
import useUpdateRouteQuery from 'hooks/useUpdateRouteQuery'
import Icon, { leftArrowIcon, rightArrowIcon } from 'utils/icons'
import PageButton from './PageButton'

type TDirection = 1 | -1
interface IPaginationProps {
  totalRows: number
  currentPage: number
  rowsPerPage: number
  currentPath: string
  onPageChange: (_page: number) => void
}

export default function Pagination({
  totalRows,
  currentPage,
  rowsPerPage,
  currentPath,
  onPageChange,
}: IPaginationProps) {
  const updateRouteQuery = useUpdateRouteQuery()
  const totalPages = Math.ceil(totalRows / rowsPerPage)
  const pageNumbers = Array.from(Array(totalPages).keys(), (x) => x + 1)
  let startIndex = currentPage - 2 < 1 ? 0 : currentPage - 2
  let endIndex = currentPage + 1 < pageNumbers.length ? currentPage + 2 : pageNumbers.length

  if (totalPages <= 4) {
    startIndex = 0
    endIndex = totalPages
  } else if (currentPage === 1 || currentPage === 2) {
    startIndex = 0
    endIndex = 4
  } else if (currentPage === totalPages || currentPage === totalPages - 1) {
    startIndex = totalPages - 4
    endIndex = totalPages
  } else {
    startIndex = currentPage - 2
    endIndex = currentPage + 1
  }
  const displayedPages = pageNumbers.slice(startIndex, endIndex)

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

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={() => handlePrevNextPaginate(-1)}
          className={classNames(
            'relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50',
            isPrevDisabled() ? 'opacity-50 cursor-not-allowed' : ''
          )}
        >
          Previous
        </button>
        <button
          onClick={() => handlePrevNextPaginate(1)}
          className={classNames(
            'relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50',
            isNextDisabled() ? 'opacity-50 cursor-not-allowed' : ''
          )}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {totalRows ? (currentPage - 1) * rowsPerPage + 1 : 0}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {(currentPage - 1) * rowsPerPage + rowsPerPage < totalRows
                ? (currentPage - 1) * rowsPerPage + rowsPerPage
                : totalRows}
            </span>{' '}
            of <span className="font-medium">{totalRows}</span> results
          </p>
        </div>
        <div>
          <nav className="inline-flex gap-2 -space-x-px rounded-md isolate" aria-label="Pagination">
            <button
              onClick={() => handlePrevNextPaginate(-1)}
              className={classNames(
                'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:z-20',
                isPrevDisabled() ? 'opacity-50 cursor-not-allowed' : ''
              )}
            >
              <span className="sr-only">Previous</span>
              <Icon icon={leftArrowIcon} className="w-5 h-5" />
            </button>
            {startIndex >= 1 && (
              <PageButton
                pageNumber="..."
                currentPage={currentPage}
                handleNumberPaginate={() => {
                  return null
                }}
              />
            )}
            {displayedPages.map((pageNumber) => (
              <PageButton
                key={pageNumber}
                pageNumber={pageNumber}
                currentPage={currentPage}
                handleNumberPaginate={handleNumberPaginate}
              />
            ))}
            {endIndex < pageNumbers.length && (
              <PageButton
                pageNumber="..."
                currentPage={currentPage}
                handleNumberPaginate={() => {
                  return null
                }}
              />
            )}
            {/* </div> */}
            <button
              onClick={() => handlePrevNextPaginate(1)}
              className={classNames(
                'relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus:z-20',
                isNextDisabled() ? 'opacity-50 cursor-not-allowed' : ''
              )}
            >
              <span className="sr-only">Next</span>

              <Icon icon={rightArrowIcon} className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
