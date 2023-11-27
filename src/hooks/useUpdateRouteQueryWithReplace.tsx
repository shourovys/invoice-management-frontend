import QueryString from 'qs'
import { useNavigate } from 'react-router-dom'

interface IProps {
  query: object
  pathName: string
}
const useUpdateRouteQueryWithReplace = () => {
  const navigate = useNavigate()

  const prevQuery: Record<string, string> = decodeURI(window.location.search)
    .replace('?', '')
    .split('&')
    .map((param) => param.split('='))
    .reduce((values, [key, value]) => {
      return { ...values, [key]: value }
    }, {})

  return ({ query, pathName }: IProps): void => {
    const queryStringValue = QueryString.stringify({
      ...prevQuery,
      ...query,
    })

    navigate(`${pathName}?${queryStringValue}`, { replace: true })

    // navigate(
    //     {
    //         pathname: pathName,
    //         query: queryStringValue,
    //     },
    //     undefined,
    //     { scroll: false },
    // );
  }
}

export default useUpdateRouteQueryWithReplace
