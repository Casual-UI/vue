import dayjs from 'dayjs'
const defaultFormatter = (d: Date | null, f: string) => {
  if (!d)
    return ''
  return dayjs(d).format(f)
}

export default defaultFormatter
