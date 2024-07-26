
export default function flatObject(obj: any, prevKey?: string): any {
    return Object.entries(obj)
        .map(([key, value]) => {
            if (value instanceof Object) {
                return flatObject(value, key)
            }
            const newKey = prevKey ? `${prevKey}_${key}` : key
            return { [newKey]: value }
        })
        .flatMap((item) => item)
        .reduce((acc, curr) => {
            const entries = Object.entries(curr)
            if (entries.length) {
                entries.forEach((item) => {
                    const [key, value] = item
                    Object.defineProperty(acc, key, {
                        value: value,
                        enumerable: true,
                        writable: true,
                    })
                })
            }
            return acc
        }, {})
}
