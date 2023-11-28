const capitalize = (str: string, lower: boolean = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase())
export default capitalize
