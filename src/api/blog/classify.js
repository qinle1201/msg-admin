import request from '../../utils/request'

// 获取分类列表数据接口
export function getClassifyListApi(current, size) {
    return request({
        url: `/article/category/search`,
        method: 'POST',
        data: {
            current,
            size
        }
    })
}

// 删除分类接口
export function deleteClassifyApi(id) {
    return request({
        url: `/article/category/:${id}`,
        method: 'DELETE',
        data: {
            id
        }
    })
}

// 添加分类接口
export function addClassifyApi(addClassifyform) {
    return request({
        url: `/article/category`,
        method: 'POST',
        data:{
            ...addClassifyform
        }
    })
}

// 查询分类接口
export function searchClassifyApi(id) {
    return request({
        url: `/article/category/:${id}`,
        method: 'GET',
        data: {
            id
        }
    })
}

// 修改分类接口
export function editClassifyApi(editClassifyform) {
    return request({
        url: `/article/category`,
        method: 'PUT',
        data:{
            ...editClassifyform
        }
    })
}