import { Font, StyleSheet } from '@react-pdf/renderer'

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
})

const styles = StyleSheet.create({
  col4: { width: '25%' },
  col5: { width: '30%' },
  col40: { width: '45%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb40: { marginBottom: 40 },
  overline: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  h1: { fontSize: 18, fontWeight: 800 },
  h3: { fontSize: 16, fontWeight: 700 },
  h4: { fontSize: 13, fontWeight: 700 },
  body1: { fontSize: 10 },
  body2: { fontSize: 8 },
  subtitle2: { fontSize: 9, fontWeight: 700 },
  alignRight: { textAlign: 'right' },
  page: {
    padding: '40px 24px 0 24px',
    fontSize: 9,
    lineHeight: 1.6,
    backgroundColor: '#fff',
    textTransform: 'capitalize',
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: '14px 24px',
    margin: 'auto',
    // borderTopWidth: 1,
    // borderStyle: 'solid',
    position: 'absolute',
    // borderColor: '#DFE3E8',
  },
  sign: {
    textAlign: 'center',
    fontSize: 9,
    textTransform: 'capitalize',
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    paddingTop: '5px',
    width: '40%',
    margin: 'auto',
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  table: { display: 'flex', width: 'auto' },
  tableHeader: { padding: '0px 5px' },
  tableBody: { padding: '0px 5px' },
  tableRow: {
    padding: '8px 0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '5%', textAlign: 'center' },
  tableCell_2: { width: '50%', paddingRight: 16 },
  tableCell_3: { width: '15%', textAlign: 'center' },
})

export default styles
