import request from '../../utils/request'


// 获取广告列表数据接口
export function getAdvertisingListApi(current, size) {
    return request({
        url: `/article/advert/search`,
        method: 'POST',
        data: {
            current,
            size
        }
    })
}

// 删除广告接口
export function deleteAdvertisingApi(id) {
    return request({
        url: `/article/advert/:${id}`,
        method: 'DELETE',
        data: {
            id
        }
    })
}

// 添加广告接口
export function addAdvertisingApi(addAdvertisingform) {
    return request({
        url: `/article/category`,
        method: 'POST',
        data: {
            ...addAdvertisingform
        }
    })
}

// 查询广告接口
export function searchAdvertisingApi(id) {
    return request({
        url: `/article/category/:${id}`,
        method: 'GET',
        data: {
            id
        }
    })
}

// 修改广告接口
export function editAdvertisingApi(editClassifyform) {
    return request({
        url: `/article/category`,
        method: 'PUT',
        data: {
            ...editAdvertisingform
        }
    })
}