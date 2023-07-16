export default function numberExtractor(number: string) {

    const a = number
        .replace("-", "")
        .replace(" ", "")
        .replace(" ", "")

    return a.slice(a.length - 10, a.length)
}

console.log(
    new Date(1686313899 * 1000).toLocaleString("pt-br").replace(",", "-").replace(" ", "").trim()
)