interface Props{
  tag: string;
  content: string;
}

export const CellText:React.FC<Props> = ({tag, content}) => {

  return(<>{content}</>)
}