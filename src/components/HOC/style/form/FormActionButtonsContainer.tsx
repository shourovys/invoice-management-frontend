interface IProps {
  children: JSX.Element | JSX.Element[]
}

function FormActionButtonsContainer({ children }: IProps) {
  return <div className="flex items-center justify-center gap-4 py-4 md:py-6">{children}</div>
}

export default FormActionButtonsContainer
