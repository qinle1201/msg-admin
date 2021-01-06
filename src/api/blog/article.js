import request from '../../utils/request'

// 获取文章列表数据接口
export function getArticleListApi(current, size) {
    return request({
        url: `/article/article/search`,
        method: 'POST',
        data: {
            current,
            size
        }
    })
}

// 删除文章接口
export function deleteArticleApi(id) {
    return request({
        url: `/article/article/:${id}`,
        method: 'DELETE',
        data: {
            id
        }
    })
}

// 添加文章接口
export function addArticleApi(addArticleform) {
    return request({
        url: `/article/article`,
        method: 'POST',
        data:{
            ...addArticleform
        }
    })
}

// 查询文章接口
export function searchArticleApi(id) {
    return request({
        url: `/article/article/:${id}`,
        method: 'GET',
        data: {
            id
        }
    })
}

// 修改文章接口
export function editArticleApi(editArticleform) {
    return request({
        url: `/article/article`,
        method: 'PUT',
        data:{
            ...editArticleform
        }
    })
}