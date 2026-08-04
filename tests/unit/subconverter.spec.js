import { buildSubPostData, buildSubUrl } from '@/utils/subconverter'

const defaultForm = {
  sourceSubUrl: '',
  clientType: '',
  customBackend: '',
  shortType: 'https://v1.mk/short',
  remoteConfig: '',
  excludeRemarks: '',
  includeRemarks: '',
  filename: '',
  rename: '',
  devid: '',
  interval: '',
  diyua: '',
  emoji: true,
  nodeList: false,
  extraset: false,
  tls13: false,
  udp: false,
  xudp: false,
  tfo: false,
  sort: false,
  expand: true,
  scv: false,
  fdn: false,
  appendType: false,
  insert: false,
  new_name: true,
  tpl: {
    surge: { doh: false },
    clash: { doh: false },
    singbox: { ipv6: false }
  }
}

describe('buildSubUrl', () => {
  it('订阅链接为空时返回错误', () => {
    const result = buildSubUrl({ ...defaultForm }, { defaultBackend: 'https://url.v1.mk' })
    expect(result.ok).toBe(false)
  })

  it('生成基础订阅链接并将换行替换为 |', () => {
    const form = {
      ...defaultForm,
      sourceSubUrl: 'ss://abc\nss://def',
      clientType: 'clash',
      customBackend: 'https://api.v1.mk'
    }
    const { ok, url } = buildSubUrl(form, { defaultBackend: 'https://url.v1.mk' })
    expect(ok).toBe(true)
    expect(url).toContain('https://api.v1.mk/sub?target=clash')
    expect(url).toContain('url=' + encodeURIComponent('ss://abc|ss://def'))
  })

  it('未选择后端时使用默认后端', () => {
    const form = {
      ...defaultForm,
      sourceSubUrl: 'ss://abc',
      clientType: 'clash'
    }
    const { url } = buildSubUrl(form, { defaultBackend: 'https://url.v1.mk' })
    expect(url.startsWith('https://url.v1.mk/sub?')).toBe(true)
  })

  it('附加可选参数与 surge/clash/singbox 专属参数', () => {
    const form = {
      ...defaultForm,
      sourceSubUrl: 'ss://abc',
      clientType: 'surge&ver=4',
      customBackend: 'https://api.v1.mk',
      remoteConfig: 'https://example.com/x.ini',
      excludeRemarks: 'a',
      includeRemarks: 'b',
      filename: 'my',
      rename: 'x@y',
      interval: '7',
      devid: 'd1',
      diyua: 'ua',
      tpl: {
        surge: { doh: true },
        clash: { doh: false },
        singbox: { ipv6: false }
      }
    }
    const { url } = buildSubUrl(form, { defaultBackend: 'https://url.v1.mk' })
    expect(url).toContain('&config=' + encodeURIComponent('https://example.com/x.ini'))
    expect(url).toContain('&exclude=' + encodeURIComponent('a'))
    expect(url).toContain('&interval=' + encodeURIComponent(7 * 86400))
    expect(url).toContain('&surge.doh=true')
  })
})

describe('buildSubPostData', () => {
  it('追加全部表单字段', () => {
    const form = {
      ...defaultForm,
      sourceSubUrl: 'ss://abc',
      clientType: 'clash'
    }
    const data = buildSubPostData(form)
    expect(data.get('target')).toBe('clash')
    expect(data.get('url')).toBe(encodeURIComponent('ss://abc'))
    expect(data.get('sdoh')).toBe('false')
    expect(data.get('newname')).toBe('true')
  })
})
