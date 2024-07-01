import Index from '@/pages/index'
import Customers from '@/pages/customers'
import CustomerNew from '@/pages/customers/new'
import Settings from '@/pages/settings'
import Invoices from '@/pages/invoices'
import TimeRegistration from '@/pages/time'
import UserIndexPage from '@/pages/users'
import TaskIndexPage from '@/pages/tasks'
import NewTaskPage from '@/pages/tasks/new'
import EditTaskPage from '@/pages/tasks/edit'
import NewInvoicePage from '@/pages/invoices/new'
import CustomerEdit from '@/pages/customers/edit'
import CustomerInfo from '@/pages/customers/info'

export interface RouteConfig {
  path: string
  element: JSX.Element
  auth?: boolean
  label?: string
}

const customerRoutes: RouteConfig[] = [
  {
    path: '/customers/',
    element: <Customers />,
  },
  {
    path: '/customers/new',
    element: <CustomerNew />,
    label: 'New Customer',
  },
  {
    path:'/customers/:id',
    element:<CustomerInfo/>,
    label:'Customer Info',
  },
  {
    path: `/customers/:id/edit/`,
    element: <CustomerEdit />,
    label: 'Edit Customer',
  },
]

const timeRoutes: RouteConfig[] = [
  {
    path: '/time-registration',
    element: <TimeRegistration />,
  },
]

const taskRoutes: RouteConfig[] = [
  { path: '/tasks', element: <TaskIndexPage /> },
  {
    path: '/tasks/:taskId/edit',
    element: <EditTaskPage />,
    label: 'Edit Task',
  },
  {
    path: '/tasks/new',
    element: <NewTaskPage />,
    label: 'New Task',
  },
]

const invoiceRoutes: RouteConfig[] = [
  {
    path: '/invoices',
    element: <Invoices />,
  },
  {
    path: '/invoices/new',
    element: <NewInvoicePage />,
    label: 'New Invoice',
  },
]

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: <Index />,
  },
  ...customerRoutes,
  ...timeRoutes,
  ...taskRoutes,
  ...invoiceRoutes,
  {
    path: '/admin/users',
    element: <UserIndexPage />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '*',
    element: <h1>Page not found.</h1>,
  },
]

export default routesConfig
