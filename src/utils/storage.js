export function setItem(k, v) {
    if (v) {
        localStorage.setItem(k, JSON.stringify(v))
    } else {
        localStorage.removeItem(k)
    }
}
export function getItem(k) {
    let v = localStorage.getItem(k);
    return v ? JSON.parse(v) : v
}