export const ackReportApi = {
  list: (queryString: string) => `/reports/ack/?${queryString}`,
}
export const logReportApi = {
  list: (queryString: string) => `/reports/logs/?${queryString}`,
}
export const accessReportApi = {
  list: (queryString: string) => `/reports/access/?${queryString}`,
}
// export const smartReportApi = {
//   list: (queryString: string) => `/reports/logs/?${queryString}`,
// }
