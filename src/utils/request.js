export function get(url, config) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        initConfig(xhr, config)
        xhr.open('GET', url)
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(xhr)
                }
            }

        }
        xhr.send()
    })
}


function initConfig(xhr, config) {
    if (config) {
        if (config.headers) {
            for (let k in config.headers) {
                xhr.setRequestHeader(k, config.headers[k])
            }
        }
    }

}