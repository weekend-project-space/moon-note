export function get(url, config) {
    return request(url, 'GET', config)
}

export function post(url, data, config) {
    return request(url, 'POST', JSON.stringify(data), config)
}


function request(url, method, data, config) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true)
        initConfig(xhr, config)
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject(xhr)
                }
            }

        }
        xhr.send(data)
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