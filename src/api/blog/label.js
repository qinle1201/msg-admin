import request from '../../utils/request'

// 获取标签列表数据接口
export function getLabelListApi(current, size) {
    return request({
        url: `/article/label/search`,
        method: 'POST',
        data: {
            current,
            size
        }
    })
}

// 删除标签接口
export function deleteLabelApi(id) {
    return request({
        url: `/article/label/:${id}`,
        method: 'DELETE',
        data: {
            id
        }
    })
}

// 添加标签接口
export function addLabelApi(addLabelform) {
    return request({
        url: `/article/label`,
        method: 'POST',
        data:{
            ...addLabelform
        }
    })
}

// 查询标签接口
export function searchLabelApi(id) {
    return request({
        url: `/article/label/:${id}`,
        method: 'GET',
        data: {
            id
        }
    })
}

// 修改标签接口
export function editLabelApi(editLabelform) {
    return request({
        url: `/article/label`,
        method: 'PUT',
        data:{
            ...editLabelform
        }
    })
}