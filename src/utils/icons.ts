/* eslint-disable prettier/prettier */
import {
  faChessPawn,
  faCircleCheck,
  faCircleDot,
  faClock,
  faCompass,
  faEdit,
  faEnvelope,
  faFolderClosed,
  faHourglass,
  faMap,
  faPaperPlane,
  faRectangleXmark,
  faSquare,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons'
import {
  IconDefinition,
  faAdd,
  faAnchorLock,
  faAngleLeft,
  faAngleRight,
  faArrowDown,
  faArrowDownLong,
  faArrowRightArrowLeft,
  faArrowRightToBracket,
  faArrowUpFromBracket,
  faArrowUpLong,
  faArrowsRotate,
  faArrowsSpin,
  faBackward,
  faBan,
  faBars,
  faBarsProgress,
  faBarsStaggered,
  faBell,
  faBookOpenReader,
  faBrain,
  faBriefcase,
  faBullseye,
  faBusinessTime,
  faCalendarCheck,
  faCalendarDay,
  faCalendarDays,
  faCalendarMinus,
  faCalendarWeek,
  faCamera,
  faChalkboard,
  faChartLine,
  faChartSimple,
  faChessBoard,
  faCircleInfo,
  faCircleNodes,
  faClockRotateLeft,
  faClone,
  faCloud,
  faCloudArrowDown,
  faCompactDisc,
  faCookie,
  faCookieBite,
  faCropSimple,
  faDatabase,
  faDisease,
  faDna,
  faDoorOpen,
  faDungeon,
  faElevator,
  faEllipsisVertical,
  faExpand,
  faEye,
  faFaceMeh,
  faFile,
  faFileImport,
  faFileLines,
  faFolderOpen,
  faGear,
  faGears,
  faHandcuffs,
  faHillRockslide,
  faHome,
  faHouse,
  faHouseFloodWater,
  faHouseLaptop,
  faHouseLock,
  faHurricane,
  faIdBadge,
  faIdCardClip,
  faJar,
  faKey,
  faLaptopFile,
  faList,
  faListCheck,
  faLocation,
  faLocationDot,
  faLock,
  faLockOpen,
  faMicrochip,
  faMobile,
  faMobileScreen,
  faPen,
  faPenToSquare,
  faPersonArrowDownToLine,
  faPersonArrowUpFromLine,
  faPowerOff,
  faRetweet,
  faRobot,
  faRotateRight,
  faSdCard,
  faShareNodes,
  faShekelSign,
  faShopLock,
  faShuttleSpace,
  faSoap,
  faSpinner,
  faSquarePen,
  faStar,
  faStopwatch,
  faTableCellsLarge,
  faTableColumns,
  faToggleOff,
  faTowerBroadcast,
  faTowerCell,
  faTurnDown,
  faUnlockKeyhole,
  faUpDownLeftRight,
  faUser,
  faUserLock,
  faUserTie,
  faUsers,
  faWifi,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// pages icons
export const addIcon = faAdd
export const importIcon = faFileImport
export const bulkLoadIcon = faArrowRightToBracket
export const groupEditIcon = faEdit
export const sendInvitationEmailIcon = faPaperPlane
export const deleteIcon = faTrashCan
export const csvIcon = faCloudArrowDown
export const applyIcon = faCircleCheck
export const cancelIcon = faXmark
export const resetIcon = faArrowsRotate
export const passthruIcon = faCompass
export const probeIcon = faCircleDot
export const setTimerIcon = faClock
export const swSyncIcon = faHourglass
export const listIcon = faList
export const scanIcon = faExpand
export const accessDeviceIcon = faMobile
export const inactiveIcon = faPersonArrowDownToLine
export const activeIcon = faPersonArrowUpFromLine
export const autoIcon = faRobot
export const lockDownIcon = faRectangleXmark
export const lockDownWithRexIcon = faHillRockslide
export const lockIcon = faLock
export const unlockIcon = faLockOpen
export const mUnlockIcon = faAnchorLock
export const provIcon = faHandcuffs
export const bdUpdateIcon = faClockRotateLeft
export const bdInitializeIcon = faArrowsSpin
export const serveIcon = faBarsStaggered
export const elevatedIcon = faElevator
export const guardedIcon = faDisease
export const lowIcon = faTurnDown
export const disableIcon = faBan
export const dbSyncIcon = faDatabase
export const reloadIcon = faRotateRight
export const bookReader = faBookOpenReader
export const shekelSign = faShekelSign
export const idCard = faIdCardClip
export const houseLock = faHouseLock
export const cookie = faCookie
export const dungeon = faDungeon
export const allArrowSign = faUpDownLeftRight
export const notification = faBell
export const shuttleSpace = faShuttleSpace
export const stopwatch = faStopwatch
export const shareIcon = faShareNodes
export const loadImage = faSpinner
export const editIcon = faPenToSquare
export const toggleFloorIcon = faToggleOff
export const fourBoxIcon = faTableCellsLarge
export const twoBoxIcon = faTableColumns
export const oneBoxIcon = faSquare
export const imageLoadIcon = faList // need to change with icon!!!!!!!
export const editLayoutIcon = faList // need to change with icon!!!!!!!
export const recordOffIcon = faList // need to change with icon!!!!!!!
export const recordOnIcon = faList // need to change with icon!!!!!!!
export const instantRecordIcon = faList // need to change with icon!!!!!!!

// only icon button (no title/name)
export const threeDotsIcon = faEllipsisVertical // for mobile dropdown menu
export const rightArrowIcon = faAngleRight // right angle for access form
export const leftArrowIcon = faAngleLeft // for mobile dropdown menu
export const downArrowIcon = faArrowDownLong // for table header sort desc
export const upArrowIcon = faArrowUpLong // for table header sort asc

// route icons
// home
export const dashboardIcon = faHouse
export const floorDashboardIcon = faHouseFloodWater
export const ackIcon = faChartLine
export const liveIcon = faTowerBroadcast
export const playbackIcon = faBackward
// report
export const logReportIcon = faCircleInfo
export const accessReportIcon = faLaptopFile
export const ackReportIcon = faHouseLaptop
export const smartReportIcon = faList // need to change with icon!!!!!!!
export const copyLogFromDatabaseIcon = faList // need to change with icon!!!!!!!
export const getbackLogFromArchiveIcon = faList // need to change with icon!!!!!!!
export const saveIcon = faList // need to change with icon!!!!!!!
// user
export const partitionIcon = faClone
export const userIcon = faUser
export const userRoleIcon = faUserLock
// person
export const personIcon = faUserTie
export const definedFieldIcon = faSquarePen
export const credentialIcon = faKey
export const credentialAccessIcon = faList // need to change with icon!!!!!!!
export const formatIcon = faJar
export const accessIcon = faUnlockKeyhole
// device
export const nodeIcon = faCompactDisc
export const nodeScanIcon = faHurricane
export const doorIcon = faDoorOpen
export const antiPassbackRuleIcon = faList // need to change with icon!!!!!!!
export const antiTailgateRuleIcon = faList // need to change with icon!!!!!!!
export const occupancyRuleIcon = faList // need to change with icon!!!!!!!
export const deadmanRuleIcon = faList // need to change with icon!!!!!!!
export const regionStatusIcon = faList // need to change with icon!!!!!!!
export const hazmatRuleIcon = faList // need to change with icon!!!!!!!
export const nvrIcon = faList // need to change with icon!!!!!!!
export const channelIcon = faList // need to change with icon!!!!!!!
export const gatewayIcon = faList // need to change with icon!!!!!!!
export const LogIcon = faList // need to change with icon!!!!!!!
export const doorRuleIcon = faDungeon
export const regionIcon = faMap
export const inputIcon = faArrowUpFromBracket
export const outputIcon = faArrowDown
export const elevatorIcon = faElevator
export const relayIcon = faBullseye
export const cameraIcon = faCamera
export const locksetIcon = faShopLock
export const facegateIcon = faFaceMeh
export const serialIcon = faChartSimple
export const subnodeIcon = faCircleNodes
export const triggerIcon = faList
export const threatIcon = faCookieBite
// work
export const taskIcon = faListCheck
export const eventActionIcon = faCalendarCheck
export const eventCodeIcon = faCalendarMinus
export const scheduleIcon = faCalendarDays
export const holidayIcon = faCalendarDay
export const groupIcon = faUsers
// service
export const emailIcon = faEnvelope
export const ftpIcon = faFile
export const restAPIIcon = faGear
export const logAPIIcon = faFileLines
export const geminiIcon = faDna
// monitoring
export const floorIcon = faCropSimple
export const viewIcon = faEye
// maintenance
export const updateIcon = faPen
export const backupIcon = faDatabase
export const backupScheduleIcon = faCalendarWeek
export const restoreIcon = faRetweet
export const archiveIcon = faFolderClosed
export const archiveScheduleIcon = faFolderOpen
export const getBackIcon = faArrowRightArrowLeft
export const defaultIcon = faArrowsRotate
export const databaseIcon = faDatabase
export const rebootIcon = faPowerOff
export const miscellaneousIcon = faChessPawn
export const capacityIcon = faList // need to change with icon!!!!!!!
export const factoryDefaultIcon = faList // need to change with icon!!!!!!!
export const logResetIcon = faList // need to change with icon!!!!!!!
export const loadDatabaseFromStorage = faList // need to change with icon!!!!!!!
export const saveDatabaseToStorage = faList // need to change with icon!!!!!!!
export const saveDataAndRebootIcon = faList // need to change with icon!!!!!!!
export const rebootWithoutSavingDataIcon = faList // need to change with icon!!!!!!!
// system
export const licenseIcon = faIdBadge
export const systemIcon = faGears
export const networkIcon = faTowerCell
export const timeIcon = faBusinessTime
export const locationIcon = faLocation
export const addressIcon = faLocationDot
export const sdCardIcon = faSdCard
export const usbIcon = faMicrochip
export const macIcon = faChalkboard
export const soapIcon = faSoap
export const boardIcon = faChessBoard
export const certificateIcon = faFileLines
export const masterIcon = faBrain
export const cloudIcon = faCloud
export const wifiIcon = faWifi

// menu header icons
export const homeIcon = faHome
export const reportIcon = faBarsProgress
// export const userIcon = faList; // need to change with icon!!!!!!!
// export const personIcon = faList; // need to change with icon!!!!!!!
export const deviceIcon = faMobileScreen
export const workIcon = faBriefcase
export const serviceIcon = faChartLine
export const monitoringIcon = faLaptopFile
export const maintenanceIcon = faChartSimple
// export const systemIcon = faList; // need to change with icon!!!!!!!
export const favoriteIcon = faStar // need to change with icon!!!!!!!
export const menuIcon = faBars // need to change with icon!!!!!!!

// icon component and type
const Icon = FontAwesomeIcon
export type TIcon = IconDefinition

export default Icon
