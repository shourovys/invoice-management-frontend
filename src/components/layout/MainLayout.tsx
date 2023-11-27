import Navbar from './Navbar'
import Sidebar from './Sidebar'

interface IMainLayoutProps {
  children: JSX.Element | JSX.Element[]
}

function MainLayout({ children }: IMainLayoutProps): JSX.Element {
  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-bg">
      <Navbar />

      <div className="flex flex-col flex-grow md:flex-row">
        <Sidebar />
        <main className="relative flex-1 pb-6 overflow-y-auto md:pb-8 focus:outline-none">
          <div className="mx-auto md:px-5">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
