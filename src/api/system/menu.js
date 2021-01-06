import request from '../../utils/request'

// 获取菜单列表接口
export function getMenuListApi(query, current, size) {
    return request({
        url: '/system/menu/search',
        method: 'POST',
        data: {
            ...query,
            current,
            size
        }
    })
}


// 添加菜单接口
export function addMenuApi(addMenuForm) {
    return request({
        url: '/system/menu',
        method: "POST",
        data: {
            addMenuForm
        }
    })
}

// 删除菜单接口
export function deleteMenuApi(id) {
    return request({
        url: `/system/menu/${id}`,
        method: "DELETE",
        data: { id }
    })
}

// 根据id查询菜单信息
export function getMenuIdApi(id) {
    return request({
        url: `/system/menu/${id}`,
        method: "GET",
        data: { id }
    })
}

// 修改菜单接口
export function editMenuApi(editMenuForm) {
    return request({
        url: '/system/menu',
        method: "PUT",
        data: {
            editMenuForm
        }
    })
}