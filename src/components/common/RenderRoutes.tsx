import NotFoundPage from 'pages/NotFound'
import { Route, Routes } from 'react-router-dom'
import { IRoute } from 'types/routes'

// function RenderRouteWithSubRoutes({ route }: { route: IRoute }) {
//   return (
//     <Route
//       path={route.routePath}
//       element={<route.component />}
//       // render={props => <route.component {...props} />}
//     />
//   )
// }
// export { RenderRouteWithSubRoutes }

export function RenderRoutes({ routes }: { routes: IRoute[] }) {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.routePath}
          path={route.routePath}
          element={<route.component />}
          // render={props => <route.component {...props} />}
        />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
