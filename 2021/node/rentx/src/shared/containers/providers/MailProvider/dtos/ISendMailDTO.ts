interface IVariables {
  [key: string]: string | number
}

export default interface ISendMailDTO {
  to: string
  subject: string
  variables: IVariables
  path: string
}
