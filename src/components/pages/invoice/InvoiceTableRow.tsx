import routeProperty from '../../../routes/routeProperty'
import { IInvoice } from '../../../types/pages/invoice'
import TableData from '../../HOC/style/table/TableData'
import TableRow from '../../HOC/style/table/TableRow'

type IProps = {
  row: IInvoice
  selected: string[]
  handleSelectRow: (_selectedId: string) => void
}

function InvoiceTableRow({ row, selected, handleSelectRow }: IProps) {
  return (
    <TableRow
      key={row._id}
      link={routeProperty.invoiceInfo.path(row._id)}
      selected={selected.indexOf(row._id.toString()) !== -1}
    >
      <TableData>{row.agent.name}</TableData>
      <TableData>{row.sellerInfo.name}</TableData>
      <TableData>
        {row.product.reduce((acc, pd) => (acc = acc + pd.price * pd.quantity), 0)}
      </TableData>
      {/* <TableDataAction selected={selected.indexOf(row._id.toString()) !== -1}>
        <Checkbox
          value={`select-row-${row._id}`}
          checked={selected.indexOf(row._id.toString()) !== -1}
          onChange={() => {
            handleSelectRow(row._id.toString())
          }}
        />
      </TableDataAction> */}
    </TableRow>
  )
}

export default InvoiceTableRow
