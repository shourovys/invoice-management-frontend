import { lazy } from 'react'
import PERMISSIONS from '../../routes/permissions'
import { IRouteProperty } from '../../types/routes'
import {
  emailIcon,
  faceIcon,
  ftpIcon,
  geminiIcon,
  logAPIIcon,
  restAPIIcon,
  sipIcon,
} from '../../utils/icons'
import t from '../../utils/translator'

const EditEmail = lazy(() => import('../../pages/email/edit'))
const EmailInfo = lazy(() => import('../../pages/email/info'))

const EditSip = lazy(() => import('../../pages/sip/edit'))
const SipInfo = lazy(() => import('../../pages/sip/info'))

const EditFace = lazy(() => import('../../pages/face/edit'))
const FaceInfo = lazy(() => import('../../pages/face/info'))

const EditFtp = lazy(() => import('../../pages/ftp/edit'))
const FtpInfo = lazy(() => import('../../pages/ftp/info'))
const EditGemini = lazy(() => import('../../pages/gemini/edit'))
const GeminiInfo = lazy(() => import('../../pages/gemini/info'))
const EditLogApi = lazy(() => import('../../pages/log-api/edit'))
const LogApiInfo = lazy(() => import('../../pages/log-api/info'))
const EditRestApi = lazy(() => import('../../pages/rest-api/edit'))
const RestApiInfo = lazy(() => import('../../pages/rest-api/info'))

const serviceRouteProperty: IRouteProperty = {
  // email
  emailEdit: {
    path: () => '/email/edit',
    routePath: '/email/edit',
    component: EditEmail,
    permissions: PERMISSIONS.email,
  },
  emailInfo: {
    id: '34',
    label: t`Email`,
    icon: emailIcon,
    path: () => '/email/info',
    routePath: '/email/info',
    component: EmailInfo,
    permissions: PERMISSIONS.email,
  },

  // ftp
  ftpEdit: {
    path: () => '/ftp/edit',
    routePath: '/ftp/edit',
    component: EditFtp,
    permissions: PERMISSIONS.ftp,
  },
  ftpInfo: {
    id: '35',
    label: t`FTP`,
    icon: ftpIcon,
    path: () => '/ftp/info',
    routePath: '/ftp/info',
    component: FtpInfo,
    permissions: PERMISSIONS.ftp,
  },

  // rest API
  restApiEdit: {
    path: () => '/rest-api/edit',
    routePath: '/rest-api/edit',
    component: EditRestApi,
    permissions: PERMISSIONS.restAPI,
  },
  restApiInfo: {
    id: '37',
    label: t`Rest API`,
    icon: restAPIIcon,
    path: () => '/rest-api/info',
    routePath: '/rest-api/info',
    component: RestApiInfo,
    permissions: PERMISSIONS.restAPI,
  },

  // log Api
  logApiEdit: {
    path: () => '/log-api/edit',
    routePath: '/log-api/edit',
    component: EditLogApi,
    permissions: PERMISSIONS.logAPI,
  },
  logApiInfo: {
    id: '36',
    label: t`Log API`,
    icon: logAPIIcon,
    path: () => '/log-api/info',
    routePath: '/log-api/info',
    component: LogApiInfo,
    permissions: PERMISSIONS.logAPI,
  },

  // gemini
  geminiEdit: {
    path: () => '/gemini/edit',
    routePath: '/gemini/edit',
    component: EditGemini,
    permissions: PERMISSIONS.gemini,
  },
  geminiInfo: {
    id: '61',
    label: t`Gemini`,
    icon: geminiIcon,
    path: () => '/gemini/info',
    routePath: '/gemini/info',
    component: GeminiInfo,
    permissions: PERMISSIONS.gemini,
  },

  // face
  faceEdit: {
    path: () => '/face/edit',
    routePath: '/face/edit',
    component: EditFace,
    permissions: PERMISSIONS.face,
  },
  faceInfo: {
    id: '67',
    label: t`Face`,
    icon: faceIcon,
    path: () => '/face/info',
    routePath: '/face/info',
    component: FaceInfo,
    permissions: PERMISSIONS.face,
  },

  // sip
  sipEdit: {
    path: () => '/sip/edit',
    routePath: '/sip/edit',
    component: EditSip,
    permissions: PERMISSIONS.sip,
  },
  sipInfo: {
    id: '68',
    label: t`Sip`,
    icon: sipIcon,
    path: () => '/sip/info',
    routePath: '/sip/info',
    component: SipInfo,
    permissions: PERMISSIONS.sip,
  },
}
export default serviceRouteProperty
