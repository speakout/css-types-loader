declare module '*.less' {
  interface Styles {
    [propName: string]: string
  }
  const styles: Styles
  export default styles
}