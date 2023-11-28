import { PDFDownloadLink } from '@react-pdf/renderer'
import React from 'react'
import { IInvoiceResult } from '../../../../types/pages/invoice'
import Icon, { downloadIcon } from '../../../../utils/icons'
import Button from '../../../atomic/Button'
import InvoicePDF from './InvoicePDF'

interface IProps {
  invoice: IInvoiceResult
}

const InvoicePdfDownload: React.FC<IProps> = ({ invoice }) => {
  return (
    <div>
      <PDFDownloadLink
        document={<InvoicePDF invoice={invoice} />}
        fileName={invoice?._id}
        style={{ textDecoration: 'none' }}
      >
        {({ loading }: { loading: boolean }) => (
          <Button color="apply" size="base" isLoading={loading}>
            <Icon icon={downloadIcon} />
            {loading ? 'loading' : 'Download Invoice'}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  )
}

export default InvoicePdfDownload
