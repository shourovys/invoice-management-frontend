interface IProps {
  children: JSX.Element | JSX.Element[]
}

function FormColumn({ children }: IProps) {
  return <div className="flex flex-col gap-5 xl:w-[calc(50%-10px)]">{children}</div>
}

export default FormColumn
