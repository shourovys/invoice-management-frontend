import { THandleFilterInputChange } from 'types/components/common'
import { IDefinedFieldResult } from 'types/pages/definedField'
import { IPersonFilters } from 'types/pages/person'
import Input from '../../atomic/Input'

interface IProps {
  definedField: IDefinedFieldResult
  filterState: IPersonFilters
  handleInputChange: THandleFilterInputChange
}

function DefinedFieldsInputs({ definedField, filterState, handleInputChange }: IProps) {
  const { id, filterable, name } = definedField
  if (filterable) {
    switch (id) {
      case 1:
        return (
          <Input
            name="field1"
            placeholder={name}
            value={filterState.field1}
            onChange={handleInputChange}
          />
        )
      case 2:
        return (
          <Input
            name="field2"
            placeholder={name}
            value={filterState.field2}
            onChange={handleInputChange}
          />
        )
      case 3:
        return (
          <Input
            name="field3"
            placeholder={name}
            value={filterState.field3}
            onChange={handleInputChange}
          />
        )
      case 4:
        return (
          <Input
            name="field4"
            placeholder={name}
            value={filterState.field4}
            onChange={handleInputChange}
          />
        )
      case 5:
        return (
          <Input
            name="field5"
            placeholder={name}
            value={filterState.field5}
            onChange={handleInputChange}
          />
        )
      case 6:
        return (
          <Input
            name="field6"
            placeholder={name}
            value={filterState.field6}
            onChange={handleInputChange}
          />
        )
      case 7:
        return (
          <Input
            name="field7"
            placeholder={name}
            value={filterState.field7}
            onChange={handleInputChange}
          />
        )
      case 8:
        return (
          <Input
            name="field8"
            placeholder={name}
            value={filterState.field8}
            onChange={handleInputChange}
          />
        )
      case 9:
        return (
          <Input
            name="field9"
            placeholder={name}
            value={filterState.field9}
            onChange={handleInputChange}
          />
        )
      case 10:
        return (
          <Input
            name="field10"
            placeholder={name}
            value={filterState.field10}
            onChange={handleInputChange}
          />
        )
      case 11:
        return (
          <Input
            name="field11"
            placeholder={name}
            value={filterState.field11}
            onChange={handleInputChange}
          />
        )
      case 12:
        return (
          <Input
            name="field12"
            placeholder={name}
            value={filterState.field12}
            onChange={handleInputChange}
          />
        )
      case 13:
        return (
          <Input
            name="field13"
            placeholder={name}
            value={filterState.field13}
            onChange={handleInputChange}
          />
        )
      case 14:
        return (
          <Input
            name="field14"
            placeholder={name}
            value={filterState.field14}
            onChange={handleInputChange}
          />
        )
      case 15:
        return (
          <Input
            name="field15"
            placeholder={name}
            value={filterState.field15}
            onChange={handleInputChange}
          />
        )
      default:
        return null
    }
  }

  return null
}

export default DefinedFieldsInputs
