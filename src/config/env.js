// 集中管理 .env 环境变量到代码的映射，避免组件内散落硬编码
export const project = process.env.VUE_APP_PROJECT

export const configScriptBackend = process.env.VUE_APP_CONFIG_UPLOAD_BACKEND + '/api.php'

export const remoteConfigSample = process.env.VUE_APP_SUBCONVERTER_REMOTE_CONFIG

export const scriptConfigSample = process.env.VUE_APP_SCRIPT_CONFIG

export const filterConfigSample = process.env.VUE_APP_FILTER_CONFIG

export const defaultBackend = process.env.VUE_APP_SUBCONVERTER_DEFAULT_BACKEND

export const shortUrlBackend = process.env.VUE_APP_MYURLS_DEFAULT_BACKEND + '/short'

export const configUploadBackend = process.env.VUE_APP_CONFIG_UPLOAD_BACKEND + '/sub.php'

// 下载页为本站静态页面，使用相对路径即可（避免硬编码 http/https）
export const downld = '/download.html'
