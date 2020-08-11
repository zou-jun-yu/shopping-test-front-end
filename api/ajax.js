import axios from 'axios';

export default function ajax(url, params = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        if (method === 'GET') {
            axios.get(url, { params }).then(res => { resolve(res.data); }).catch(error => { console.log('请求失败：' + error); });
        }
        if (method === 'POST') {
            axios.post(url, params).then(res => { resolve(res.data); }).catch(error => { console.log('请求失败：' + error); });
        }
    })
}