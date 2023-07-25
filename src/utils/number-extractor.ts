export default function numberExtractor(number: string) {

    const a = number
        .replace("-", "")
        .replace(" ", "")
        .replace(" ", "")

    return a.slice(a.length - 10, a.length)
}
