import { Document, Image, Page, Text, View } from '@react-pdf/renderer'
import JsBarcode from 'jsbarcode'
import moment from 'moment'
import { IInvoiceResult } from '../../../../types/pages/invoice'
import styles from './InvoiceStyle'

const _getFormattedDate = (date: string | Date): string => {
  const givenDate = new Date(date)
  return moment(givenDate).format('D MMM YYYY')
}

interface IInvoicePDFProps {
  invoice: IInvoiceResult
}

const InvoicePDF: React.FC<IInvoicePDFProps> = ({ invoice }) => {
  const { agent } = invoice
  const { createdAt, _id, sellerInfo, product } = invoice.invoice

  const totalProductPrice = product.reduce((acc, pd) => (acc = acc + pd.price * pd.quantity), 0)

  const canvas = document.createElement('canvas')

  // For Barcode
  JsBarcode(canvas, _id, { displayValue: false })
  const barcode = canvas.toDataURL()

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* header with logo and bar code  */}
        <View style={[styles.gridContainer, styles.mb40]}>
          {/* <Image source="/logo/png/small_logo.png" style={{ height: 80 }} /> */}
          <Text style={[styles.h1, styles.mb12]}>INVOICE</Text>
          <View style={{ flexDirection: 'column', width: '45%' }}>
            {/* <Text style={[styles.overline]}>SNEHO E-COMMERCE</Text>
            <Text>www.sneho.com.bd</Text>
            <Text>111, Bir Uttom C. R. Dutta Road</Text>
            <Text>Sonagaon Road,</Text>
            <Text>Dhaka 1205</Text> */}
            <Image source={barcode} style={{ height: 42, width: '120' }} />
            <View style={(styles.table, styles.col40)}>
              {/* agent info  */}
              <View>
                <View style={[styles.tableRow, styles.noBorder]}>
                  <View style={{ width: '32%' }}>
                    <Text>Date:</Text>
                  </View>
                  <View style={[styles.alignRight]}>
                    <Text>{_getFormattedDate(createdAt)}</Text>
                  </View>
                </View>

                {/* <View style={[styles.tableRow, styles.noBorder]}>
                  <View style={{ width: '50%' }}>
                    <Text>Agent Name:</Text>
                  </View>
                  <View style={[styles.alignRight]}>
                    <Text>{agent.name}</Text>
                  </View>
                </View> */}
              </View>
            </View>
          </View>
        </View>

        {/* user Information */}
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            gap: 10,
            marginBottom: 40,
          }}
        >
          <View style={(styles.table, styles.col40)}>
            {/* order info  */}
            <View>
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={{ width: '32%' }}>
                  <Text>Agent Name:</Text>
                </View>
                <View style={[styles.alignRight]}>
                  <Text>{agent.name}</Text>
                </View>
              </View>
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={{ width: '32%' }}>
                  <Text>Agent Email:</Text>
                </View>
                <View style={[styles.alignRight]}>
                  <Text>{agent.email}</Text>
                </View>
              </View>
              {agent.contactNumber && (
                <View style={[styles.tableRow, styles.noBorder]}>
                  <View style={{ width: '32%' }}>
                    <Text>Agent Contact:</Text>
                  </View>
                  <View style={[styles.alignRight]}>
                    <Text>{agent.contactNumber}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={(styles.table, styles.col40)}>
            {/* order info  */}
            <View>
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={{ width: '32%' }}>
                  <Text>Seller Name:</Text>
                </View>
                <View style={[styles.alignRight]}>
                  <Text>{sellerInfo.name}</Text>
                </View>
              </View>
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={{ width: '32%' }}>
                  <Text>Seller Email:</Text>
                </View>
                <View style={[styles.alignRight]}>
                  <Text>{sellerInfo.email}</Text>
                </View>
              </View>
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={{ width: '32%' }}>
                  <Text>Seller Contact:</Text>
                </View>
                <View style={[styles.alignRight]}>
                  <Text>{sellerInfo.contactNumber}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text> */}

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Product</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Quantity</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Unit price</Text>
              </View>

              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
              </View>
            </View>
          </View>

          {/* error  */}

          <View style={styles.tableBody}>
            {product?.map((product, index) => (
              <View style={styles.tableRow} key={product.id}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{product.name}</Text>
                  {/* <Text>{item.description}</Text> */}
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{product.quantity}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>
                    {/* <Image source="/images/icons/taka.jpg" style={{ height: 8 }} /> */}$
                    {product.price}
                  </Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>
                    {/* <Image source="/images/icons/taka.jpg" style={{ height: 8 }} /> */}$
                    {product.price * product.quantity}
                  </Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Subtotal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>
                  {/* <Image source="/images/icons/taka.jpg" style={{ height: 8 }} /> */}$
                  {totalProductPrice}
                </Text>
              </View>
            </View>

            {/* <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Shipping Cost</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>
                  <Image source="/images/icons/taka.jpg" style={{ height: 8 }} />
                  {shippingCost}
                </Text>
              </View>
            </View> */}

            {/* <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Discount</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                                <Text>
                                    <Image source="/images/icons/taka.jpg" style={{ height: 8 }} />
                                    {discount ? -discount : 0}
                                </Text>
                            </View>
            </View> */}

            {/* <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Taxes</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>
                  <Image source="/images/icons/taka.jpg" style={{ height: 8 }} />
                  {tax}
                </Text>
              </View>
            </View> */}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>
                  {/* <Image source="/images/icons/taka.jpg" style={{ height: 10 }} /> */}$
                  {totalProductPrice}
                </Text>
              </View>
            </View>
          </View>
          {/* error  */}
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <Text style={styles.sign}>Seller Signature</Text>
          <Text style={styles.sign}>Agent Signature</Text>
        </View>
        {/* <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={{ fontSize: 9, textTransform: 'capitalize' }}>RETURN POLICY</Text>
            <Text style={styles.body2}>
              -Within 7 days from delivery, immediately for COD subject to the proper reason.
            </Text>
            <Text style={styles.body2}>
              -If you receive a damaged/broken/used/tempered/unhealthy items.
            </Text>
            <Text style={styles.body2}>
              -If you find out that the product is different from the website/incorrect product has
              shipped to you.
            </Text>
          </View>
        </View> */}
      </Page>
    </Document>
  )
}

export default InvoicePDF
