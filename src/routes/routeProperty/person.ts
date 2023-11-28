import { lazy } from 'react'
import PERMISSIONS from '../../routes/permissions'
import { IRouteProperty } from '../../types/routes'
import {
  accessIcon,
  credentialIcon,
  definedFieldIcon,
  formatIcon,
  personIcon,
} from '../../utils/icons'
import t from '../../utils/translator'

const Access = lazy(() => import('../../pages/access'))
const CreateAccess = lazy(() => import('../../pages/access/add'))
const EditAccess = lazy(() => import('../../pages/access/edit/[id]'))
const AccessInfo = lazy(() => import('../../pages/access/info/[id]'))

const Credential = lazy(() => import('../../pages/credential'))
const CreateCredential = lazy(() => import('../../pages/credential/add'))
const BulkLoadCredential = lazy(() => import('../../pages/credential/bulk-load'))
const EditCredential = lazy(() => import('../../pages/credential/edit/[id]'))
const CredentialGroupEdit = lazy(() => import('../../pages/credential/group-edit'))
const CredentialInfo = lazy(() => import('../../pages/credential/info/[id]'))

const DefinedField = lazy(() => import('../../pages/defined-field'))
const CreateDefinedField = lazy(() => import('../../pages/defined-field/add'))
const EditDefinedField = lazy(() => import('../../pages/defined-field/edit/[id]'))
const DefinedFieldInfo = lazy(() => import('../../pages/defined-field/info/[id]'))
const Format = lazy(() => import('../../pages/format'))
const CreateFormat = lazy(() => import('../../pages/format/add'))
const EditFormat = lazy(() => import('../../pages/format/edit/[id]'))
const FormatInfo = lazy(() => import('../../pages/format/info/[id]'))
const Person = lazy(() => import('../../pages/person'))
const CreatePerson = lazy(() => import('../../pages/person/add'))
const EditPerson = lazy(() => import('../../pages/person/edit/[id]'))
const PersonInfo = lazy(() => import('../../pages/person/info/[id]'))
const GroupEditPerson = lazy(() => import('../../pages/person/group-edit'))

const personRouteProperty: IRouteProperty = {
  // person
  person: {
    label: t`Person`,
    path: () => '/person',
    routePath: '/person',
    icon: personIcon,
    component: Person,
    permissions: PERMISSIONS.person,
    // ID of "Persons" from the original data: 10
    id: '10',
  },
  personCreate: {
    path: () => '/person/add',
    routePath: '/person/add',
    component: CreatePerson,
    permissions: PERMISSIONS.person,
  },
  personEdit: {
    path: (id?: number | string) => `/person/edit/${id}`,
    routePath: '/person/edit/:id',
    component: EditPerson,
    permissions: PERMISSIONS.person,
  },
  personGroupEdit: {
    path: (ids?: number | string) => `/person/group-edit?ids=${ids}`,
    routePath: '/person/group-edit',
    component: GroupEditPerson,
    permissions: PERMISSIONS.person,
  },
  personInfo: {
    path: (id?: number | string) => `/person/info/${id}`,
    routePath: '/person/info/:id',
    component: PersonInfo,
    permissions: PERMISSIONS.person,
  },

  // definedField
  definedField: {
    label: t`Defined Field`,
    path: () => '/defined-field',
    routePath: '/defined-field',
    icon: definedFieldIcon,
    component: DefinedField,
    permissions: PERMISSIONS.definedField,
    // ID of "Defined Field" from the original data: 11
    id: '11',
  },
  definedFieldCreate: {
    path: () => '/defined-field/add',
    routePath: '/defined-field/add',
    component: CreateDefinedField,
    permissions: PERMISSIONS.definedField,
  },
  definedFieldEdit: {
    path: (id?: number | string) => `/defined-field/edit/${id}`,
    routePath: '/defined-field/edit/:id',
    component: EditDefinedField,
    permissions: PERMISSIONS.definedField,
  },
  definedFieldInfo: {
    path: (id?: number | string) => `/defined-field/info/${id}`,
    routePath: '/defined-field/info/:id',
    component: DefinedFieldInfo,
    permissions: PERMISSIONS.definedField,
  },

  // credential
  credential: {
    label: t`Credential`,
    path: () => '/credential',
    routePath: '/credential',
    icon: credentialIcon,
    component: Credential,
    permissions: PERMISSIONS.credential,
    // ID of "Credential" from the original data: 12
    id: '12',
  },

  credentialCreate: {
    // pass person id if you need to hide person form in credential add
    path: (personId?: string | number) =>
      personId ? `/credential/add?personId=${personId}` : '/credential/add',
    routePath: '/credential/add',
    component: CreateCredential,
    permissions: PERMISSIONS.credential,
  },
  credentialBulkLoad: {
    path: () => '/credential/bulk-load',
    routePath: '/credential/bulk-load',
    component: BulkLoadCredential,
    permissions: PERMISSIONS.credential,
  },
  credentialEdit: {
    path: (id?: number | string, personId?: string | number) =>
      personId ? `/credential/edit/${id}?personId=${personId}` : `/credential/edit/${id}`,
    routePath: '/credential/edit/:id',
    component: EditCredential,
    permissions: PERMISSIONS.credential,
  },
  credentialGroupEdit: {
    path: (ids?: number | string) => `/credential/group-edit?ids=${ids}`,
    routePath: '/credential/group-edit',
    component: CredentialGroupEdit,
    permissions: PERMISSIONS.credential,
  },
  credentialInfo: {
    path: (id?: number | string, personId?: string | number) =>
      personId ? `/credential/info/${id}?personId=${personId}` : `/credential/info/${id}`,
    routePath: '/credential/info/:id',
    component: CredentialInfo,
    permissions: PERMISSIONS.credential,
  },

  // format
  format: {
    id: '13', // ID of "Format"
    label: t`Format`,
    path: () => '/format',
    routePath: '/format',
    icon: formatIcon,
    component: Format,
    permissions: PERMISSIONS.format,
  },
  formatCreate: {
    path: () => '/format/add',
    routePath: '/format/add',
    component: CreateFormat,
    permissions: PERMISSIONS.format,
  },
  formatEdit: {
    path: (id?: number | string) => `/format/edit/${id}`,
    routePath: '/format/edit/:id',
    component: EditFormat,
    permissions: PERMISSIONS.format,
  },
  formatInfo: {
    path: (id?: number | string) => `/format/info/${id}`,
    routePath: '/format/info/:id',
    component: FormatInfo,
    permissions: PERMISSIONS.format,
  },

  // Access
  access: {
    id: '14', // ID of "Access"
    label: t`Access`,
    path: () => '/access',
    routePath: '/access',
    icon: accessIcon,
    component: Access,
    permissions: PERMISSIONS.access,
  },
  accessCreate: {
    path: () => '/access/add',
    routePath: '/access/add',
    component: CreateAccess,
    permissions: PERMISSIONS.access,
  },
  accessEdit: {
    path: (id?: number | string) => `/access/edit/${id}`,
    routePath: '/access/edit/:id',
    component: EditAccess,
    permissions: PERMISSIONS.access,
  },
  accessInfo: {
    path: (id?: number | string) => `/access/info/${id}`,
    routePath: '/access/info/:id',
    component: AccessInfo,
    permissions: PERMISSIONS.access,
  },
}
export default personRouteProperty
