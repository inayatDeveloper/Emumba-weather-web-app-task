import axios from "axios"
export const callApi = (endpoint, method) => {
    const configaxios = {
        method,
        url: endpoint,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }
    return new Promise((resolve, reject) => {
        axios(configaxios).then((res) => {
            resolve(res?.data);
        }).catch((error) => {
            reject(error?.response?.data?.message);
        })
    })
}