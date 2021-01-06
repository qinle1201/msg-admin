import request from '../../utils/request'

// 获取角色列表接口
export function getRoleListApi(query, current, size) {
    return request({
        url: '/system/Role/search',
        method: 'POST',
        data: {
            ...query,
            current,
            size
        }
    })
}

// 添加角色接口
export function addRoleApi(addRoleForm) {
    return request({
        url: '/system/Role',
        method: "POST",
        data: {
            addRoleForm
        }
    })
}

// 删除角色接口
export function deleteRoleApi(id) {
    return request({
        url: `/system/Role/${id}`,
        method: "DELETE",
        data: { id }
    })
}

// 根据id查询角色信息
export function getRoleIdApi(id) {
    return request({
        url: `/system/Role/${id}`,
        method: "GET",
        data: { id }
    })
}

// 修改角色接口
export function editRoleApi(editRoleForm) {
    return request({
        url: '/system/Role',
        method: "PUT",
        data: {
            editRoleForm
        }
    })
}