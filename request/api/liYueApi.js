import request from '@/request/index.js';

/**
 * login
 */
export const wechatLogin = (params) => {
	return request.post({
		url: '/method/liyue.api.wechat_login.wechat_login',
		data: params
	})
}

/**
 * register
 */
export const wechatRegister = (params) => {
	return request.post({
		url: '/resource/Ly User',
		data: params
	})
}

/**
 * item
 */
export const getItem = (params) => {
	return request.get({
		url: '/resource/Ly Item',
		params: params
	})
}

/**
 * create order
 */
export const createOrder = (params) => {
	return request.post({
		url: '/resource/Ly Sales Order',
		data: params
	})
}

/**
 * userinfo
 */
export const getUserInfo = (params) => {
	return request.get({
		url: '/method/frappe.desk.form.load.getdoc',
		params: params
	})
}

/**
 * userinfo2
 */
export const getUserInfo1 = (params) => {
	return request.get({
		url: '/method/frappe.desk.reportview.get',
		params: params
	})
}

/**
 * save docs
 */
export const saveDocs = (params) => {
	return request.post({
		url: '/method/frappe.desk.form.save.savedocs',
		data: params
	})
}

/**
 * getDocType
 */
export const getDocType = (DocType,params) => {
	return request.get({
		url: `/resource/${DocType}`,
		params: params
	})
}

/**
 * postDocType
 */
export const postDocType = (DocType,params) => {
	return request.post({
		url: `/resource/${DocType}`,
		data: params
	})
}

/**
 * putDocType
 */
export const putDocType = (DocType,id,params) => {
	return request.put({
		url: `/resource/${DocType}/${id}`,
		data: params
	})
}

/**
 * upload
 */
export const uploadFile = (params) => {
	return request.post({
		url: '/method/upload_file',
		data: params
	})
}
