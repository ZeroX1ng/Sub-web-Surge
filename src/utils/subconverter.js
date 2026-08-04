// 订阅转换相关的纯函数：不依赖 Vue 实例，便于单元测试与复用

/**
 * 根据表单配置生成订阅转换链接
 * @param {Object} form 表单数据（与组件 data().form 结构一致）
 * @param {Object} [opts]
 * @param {string} [opts.defaultBackend] 未选择后端时使用的默认后端地址
 * @returns {{ok: boolean, url?: string, reason?: string}}
 */
export function buildSubUrl(form, { defaultBackend = '' } = {}) {
  if (!form || form.sourceSubUrl === '' || form.clientType === '') {
    return { ok: false, reason: 'EMPTY' }
  }
  const backend = form.customBackend === '' ? defaultBackend : form.customBackend
  const sourceSub = form.sourceSubUrl.replace(/(\n|\r|\n\r)/g, '|')

  let url =
    backend + '/sub?target=' + form.clientType + '&url=' + encodeURIComponent(sourceSub) + '&insert=' + form.insert

  if (form.remoteConfig !== '') {
    url += '&config=' + encodeURIComponent(form.remoteConfig)
  }
  if (form.excludeRemarks !== '') {
    url += '&exclude=' + encodeURIComponent(form.excludeRemarks)
  }
  if (form.includeRemarks !== '') {
    url += '&include=' + encodeURIComponent(form.includeRemarks)
  }
  if (form.filename !== '') {
    url += '&filename=' + encodeURIComponent(form.filename)
  }
  if (form.rename !== '') {
    url += '&rename=' + encodeURIComponent(form.rename)
  }
  if (form.interval !== '') {
    url += '&interval=' + encodeURIComponent(form.interval * 86400)
  }
  if (form.devid !== '') {
    url += '&dev_id=' + encodeURIComponent(form.devid)
  }
  if (form.appendType) {
    url += '&append_type=' + form.appendType.toString()
  }
  if (form.tls13) {
    url += '&tls13=' + form.tls13.toString()
  }
  if (form.sort) {
    url += '&sort=' + form.sort.toString()
  }
  url +=
    '&emoji=' +
    form.emoji.toString() +
    '&list=' +
    form.nodeList.toString() +
    '&xudp=' +
    form.xudp.toString() +
    '&udp=' +
    form.udp.toString() +
    '&tfo=' +
    form.tfo.toString() +
    '&expand=' +
    form.expand.toString() +
    '&scv=' +
    form.scv.toString() +
    '&fdn=' +
    form.fdn.toString()

  if (form.clientType.includes('surge')) {
    if (form.tpl.surge.doh === true) {
      url += '&surge.doh=true'
    }
  }
  if (form.clientType === 'clash') {
    if (form.tpl.clash.doh === true) {
      url += '&clash.doh=true'
    }
    url += '&new_name=' + form.new_name.toString()
  }
  if (form.clientType === 'singbox') {
    if (form.tpl.singbox.ipv6 === true) {
      url += '&singbox.ipv6=1'
    }
  }
  if (form.diyua && form.diyua.trim() !== '') {
    url += '&diyua=' + encodeURIComponent(form.diyua)
  }

  return { ok: true, url }
}

/**
 * 根据表单配置生成 SubConverter 转换接口所需的 FormData
 * @param {Object} form 表单数据（与组件 data().form 结构一致）
 * @returns {FormData}
 */
export function buildSubPostData(form) {
  const data = new FormData()
  data.append('target', encodeURIComponent(form.clientType))
  data.append('url', encodeURIComponent(form.sourceSubUrl))
  data.append('config', encodeURIComponent(form.remoteConfig))
  data.append('exclude', encodeURIComponent(form.excludeRemarks))
  data.append('include', encodeURIComponent(form.includeRemarks))
  data.append('rename', encodeURIComponent(form.rename))
  data.append('tls13', encodeURIComponent(form.tls13.toString()))
  data.append('xudp', encodeURIComponent(form.xudp.toString()))
  data.append('emoji', encodeURIComponent(form.emoji.toString()))
  data.append('list', encodeURIComponent(form.nodeList.toString()))
  data.append('udp', encodeURIComponent(form.udp.toString()))
  data.append('tfo', encodeURIComponent(form.tfo.toString()))
  data.append('expand', encodeURIComponent(form.expand.toString()))
  data.append('scv', encodeURIComponent(form.scv.toString()))
  data.append('fdn', encodeURIComponent(form.fdn.toString()))
  data.append('sdoh', encodeURIComponent(form.tpl.surge.doh.toString()))
  data.append('cdoh', encodeURIComponent(form.tpl.clash.doh.toString()))
  data.append('newname', encodeURIComponent(form.new_name.toString()))
  data.append('diyua', encodeURIComponent(form.diyua.toString()))
  return data
}
