import TableData from 'components/HOC/style/table/TableData'
import { IDefinedFieldResult } from 'types/pages/definedField'
import { IPersonResult } from 'types/pages/person'

interface IProps {
  definedField: IDefinedFieldResult
  row: IPersonResult
}

function DefinedFieldsRows({ definedField, row }: IProps) {
  const { id, listable } = definedField
  if (listable) {
    switch (id) {
      case 1:
        return <TableData>{row.field1}</TableData>
      case 2:
        return <TableData>{row.field2}</TableData>
      case 3:
        return <TableData>{row.field3}</TableData>
      case 4:
        return <TableData>{row.field4}</TableData>
      case 5:
        return <TableData>{row.field5}</TableData>
      case 6:
        return <TableData>{row.field6}</TableData>
      case 7:
        return <TableData>{row.field7}</TableData>
      case 8:
        return <TableData>{row.field8}</TableData>
      case 9:
        return <TableData>{row.field9}</TableData>
      case 10:
        return <TableData>{row.field10}</TableData>
      case 11:
        return <TableData>{row.field11}</TableData>
      case 12:
        return <TableData>{row.field12}</TableData>
      case 13:
        return <TableData>{row.field13}</TableData>
      case 14:
        return <TableData>{row.field14}</TableData>
      case 15:
        return <TableData>{row.field15}</TableData>
      default:
        return null
    }
  }

  return null
}

export default DefinedFieldsRows
