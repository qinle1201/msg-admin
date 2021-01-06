import request from '../../utils/request'

// 获取用户列表接口
export function getUserListApi(query, current, size) {
    return request({
        url: '/system/user/search',
        method: 'POST',
        data: {
            ...query,
            current,
            size
        }
    })
}

// 添加用户接口
export function addUserApi(addUserForm) {
    return request({
        url: '/system/user',
        method: "POST",
        data: {
            addUserForm
        }
    })
}

// 删除用户接口
export function deleteUserApi(id) {
    return request({
        url: `/system/user/${id}`,
        method: "DELETE",
        data: { id }
    })
}

// 根据id查询用户信息
export function getUserIdApi(id) {
    return request({
        url: `/system/user/${id}`,
        method: "GET",
        data: { id }
    })
}

// 添加用户接口
export function editUserApi(editUserForm) {
    return request({
        url: '/system/user',
        method: "PUT",
        data: {
            editUserForm
        }
    })
}