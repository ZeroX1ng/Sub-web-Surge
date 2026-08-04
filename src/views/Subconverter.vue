<template>
  <div>
    <el-row style="margin-top: 10px">
      <el-col>
        <el-card>
          <div slot="header">
            <svg-icon class="gayhub" icon-class="github" style="float: left" @click="goToProject" />
            <div style="text-align: center; font-size: 15px">订 阅 转 换</div>
          </div>
          <el-container>
            <el-form :model="form" label-width="80px" label-position="left" style="width: 100%">
              <el-form-item label="订阅链接:">
                <el-input
                  v-model="form.sourceSubUrl"
                  type="textarea"
                  rows="3"
                  placeholder="支持各种订阅链接或单节点链接，多个链接每行一个或用 | 分隔"
                />
              </el-form-item>
              <el-form-item label="生成类型:">
                <el-select v-model="form.clientType" style="width: 100%">
                  <el-option v-for="(v, k) in options.clientTypes" :key="k" :label="k" :value="v"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="后端地址:">
                <el-select
                  v-model="form.customBackend"
                  allow-create
                  filterable
                  @change="selectChanged"
                  placeholder="可输入自己的后端"
                  style="width: 100%"
                >
                  <el-option v-for="(v, k) in options.customBackend" :key="k" :label="k" :value="v"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="短链选择:">
                <el-select
                  v-model="form.shortType"
                  allow-create
                  filterable
                  placeholder="可输入其他可用短链API"
                  style="width: 100%"
                >
                  <el-option v-for="(v, k) in options.shortTypes" :key="k" :label="k" :value="v"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="远程配置:">
                <el-select v-model="form.remoteConfig" allow-create filterable placeholder="请选择" style="width: 100%">
                  <el-option-group v-for="group in options.remoteConfig" :key="group.label" :label="group.label">
                    <el-option
                      v-for="item in group.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
              <el-form-item label-width="0px">
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <el-form-item label="高级功能:" style="width: 100%">
                        <el-button type="limr" style="width: 100%" icon="el-icon-more-outline"
                          >点击显示/隐藏
                        </el-button>
                      </el-form-item>
                    </template>
                    <el-form-item label="自定义UA:">
                      <el-input v-model="form.diyua" placeholder="设置后端获取订阅链接时所用的自定义User-Agent" />
                    </el-form-item>
                    <el-form-item label="包含节点:">
                      <el-input v-model="form.includeRemarks" placeholder="要保留的节点，支持正则" />
                    </el-form-item>
                    <el-form-item label="排除节点:">
                      <el-input v-model="form.excludeRemarks" placeholder="要排除的节点，支持正则" />
                    </el-form-item>
                    <el-form-item label="节点命名:">
                      <el-input v-model="form.rename" placeholder="举例：`a@b``1@2`，|符可用\转义" />
                    </el-form-item>
                    <el-form-item label="远程设备:">
                      <el-input v-model="form.devid" placeholder="用于设置QuantumultX的远程设备ID" />
                    </el-form-item>
                    <el-form-item label="更新间隔:">
                      <el-input v-model="form.interval" placeholder="返用于设置托管配置更新间隔，单位为天" />
                    </el-form-item>
                    <el-form-item label="订阅命名:">
                      <el-input
                        v-model="form.filename"
                        placeholder="返回的订阅文件名，可以在支持文件名的客户端中显示出来"
                      />
                    </el-form-item>
                    <el-form-item class="eldiy" label-width="0px">
                      <el-row type="flex">
                        <el-col>
                          <el-checkbox v-model="form.nodeList" label="仅输出节点信息" border></el-checkbox>
                        </el-col>
                        <el-popover placement="bottom" v-model="form.extraset">
                          <el-row :gutter="10">
                            <el-col :span="12">
                              <el-checkbox v-model="form.emoji" label="Emoji"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                              <el-checkbox v-model="form.insert" label="插入默认节点"></el-checkbox>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :span="12">
                              <el-checkbox v-model="form.udp" label="启用 UDP"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                              <el-checkbox v-model="form.xudp" label="启用 XUDP"></el-checkbox>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :span="12">
                              <el-checkbox v-model="form.tfo" label="启用 TFO"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                              <el-checkbox v-model="form.sort" label="基础节点排序"></el-checkbox>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :span="12">
                              <el-checkbox v-model="form.tpl.clash.doh" label="Clash.DoH"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                              <el-checkbox v-model="form.appendType" label="插入节点类型"></el-checkbox>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :span="12">
                              <el-checkbox v-model="form.tpl.surge.doh" label="Surge.DoH"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                              <el-checkbox v-model="form.tls13" label="开启TLS_1.3"></el-checkbox>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :span="12">
                              <el-checkbox v-model="form.expand" label="展开规则全文"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                              <el-checkbox v-model="form.new_name" label="Clash新字段名"></el-checkbox>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :span="12">
                              <el-checkbox v-model="form.scv" label="跳过证书验证"></el-checkbox>
                            </el-col>
                            <el-col :span="12">
                              <el-checkbox v-model="form.fdn" label="过滤不支持节点"></el-checkbox>
                            </el-col>
                          </el-row>
                          <el-row :gutter="10">
                            <el-col :span="12">
                              <div style="margin-left: 35%">
                                <el-checkbox v-model="form.tpl.singbox.ipv6" label="Sing-Box支持IPV6"></el-checkbox>
                              </div>
                            </el-col>
                          </el-row>
                          <el-button slot="reference">更多选项</el-button>
                        </el-popover>
                      </el-row>
                    </el-form-item>
                  </el-collapse-item>
                </el-collapse>
              </el-form-item>
              <div style="margin-top: 30px"></div>
              <el-divider content-position="center">
                <el-button type="zhuti" @click="change">
                  <i id="rijian" class="el-icon-sunny"></i>
                  <i id="yejian" class="el-icon-moon"></i>
                </el-button>
              </el-divider>
              <el-form-item label="定制订阅:">
                <el-input class="copy-content" disabled v-model="customSubUrl">
                  <el-button
                    slot="append"
                    v-clipboard:copy="customSubUrl"
                    v-clipboard:success="onCopy"
                    ref="copy-btn"
                    icon="el-icon-document-copy"
                    >复制
                  </el-button>
                </el-input>
              </el-form-item>
              <el-form-item label="订阅短链:">
                <el-input
                  class="copy-content"
                  v-model="customShortSubUrl"
                  placeholder="输入自定义短链接后缀，点击生成短链接可反复生成"
                >
                  <el-button
                    slot="append"
                    v-clipboard:copy="customShortSubUrl"
                    v-clipboard:success="onCopy"
                    ref="copy-btn"
                    icon="el-icon-document-copy"
                    >复制
                  </el-button>
                </el-input>
              </el-form-item>
              <el-form-item label-width="0px" style="margin-top: 40px; text-align: center">
                <el-button
                  style="width: 120px"
                  type="danger"
                  @click="makeUrl"
                  :disabled="form.sourceSubUrl.length === 0 || btnBoolean"
                  >生成订阅链接
                </el-button>
                <el-button
                  style="width: 120px"
                  type="danger"
                  @click="makeShortUrl"
                  :loading="loading1"
                  :disabled="customSubUrl.length === 0"
                  >生成短链接
                </el-button>
              </el-form-item>
              <el-form-item label-width="0px" style="text-align: center">
                <el-button
                  style="width: 120px"
                  type="primary"
                  @click="dialogUploadConfigVisible = true"
                  icon="el-icon-upload"
                  :loading="loading2"
                  >自定义配置
                </el-button>
                <el-button
                  style="width: 120px"
                  type="danger"
                  @click="resetConfig"
                  icon="el-icon-refresh"
                  :loading="loading2"
                  >重置配置
                </el-button>
                <el-button
                  style="width: 120px"
                  type="primary"
                  @click="dialogLoadConfigVisible = true"
                  icon="el-icon-copy-document"
                  :loading="loading3"
                  >从URL解析
                </el-button>
              </el-form-item>
              <el-form-item label-width="0px" style="text-align: center">
                <el-button
                  style="width: 250px"
                  type="success"
                  icon="el-icon-video-play"
                  @click="centerDialogVisible = true"
                  >视频教程
                </el-button>
              </el-form-item>
            </el-form>
          </el-container>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="请选择需要观看的视频教程"
      :visible.sync="centerDialogVisible"
      :show-close="false"
      width="40vh"
      top="30vh"
      center
    >
      <div label-width="0px" style="text-align: center">
        <el-button
          style="width: 200px"
          type="primary"
          icon="el-icon-video-play"
          @click="
            gotoBasicVideo()
            centerDialogVisible = false
          "
          >基础视频教程
        </el-button>
      </div>
      <div label-width="0px" style="text-align: center; margin: 3vh 0 2vh">
        <el-button
          style="width: 200px"
          type="danger"
          icon="el-icon-video-play"
          @click="
            gotoAdvancedVideo()
            centerDialogVisible = false
          "
          >进阶视频教程
        </el-button>
      </div>
      <div label-width="0px" style="text-align: center; margin: 3vh 0 2vh">
        <el-button style="width: 200px" type="warning" icon="el-icon-download" @click="toolsDown"
          >代理工具集合
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogUploadConfigVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="80%"
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="远程配置上传" name="first">
          <el-link type="danger" :href="sampleConfig" style="margin-bottom: 15px" target="_blank" icon="el-icon-info">
            参考案例
          </el-link>
          <el-form label-position="left">
            <el-form-item prop="uploadConfig">
              <el-input
                v-model="uploadConfig"
                type="textarea"
                :autosize="{ minRows: 15, maxRows: 15 }"
                maxlength="50000"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="float: right">
            <el-button
              type="primary"
              @click="
                uploadConfig = ''
                dialogUploadConfigVisible = false
              "
              >取 消</el-button
            >
            <el-button type="primary" @click="confirmUploadConfig" :disabled="uploadConfig.length === 0"
              >确 定
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="JS排序节点" name="second">
          <el-link type="success" :href="scriptConfig" style="margin-bottom: 15px" target="_blank" icon="el-icon-info">
            参考案例
          </el-link>
          <el-form label-position="left">
            <el-form-item prop="uploadScript">
              <el-input
                v-model="uploadScript"
                placeholder="本功能暂停使用，如有兴趣，自行去我的GitHub参考sub-web-api项目部署！"
                type="textarea"
                :autosize="{ minRows: 15, maxRows: 15 }"
                maxlength="50000"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="float: right">
            <el-button
              type="primary"
              @click="
                uploadScript = ''
                dialogUploadConfigVisible = false
              "
              >取 消</el-button
            >
            <el-button type="primary" @click="confirmUploadScript" :disabled="uploadScript.length === 0"
              >确 定
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="JS筛选节点" name="third">
          <el-link type="warning" :href="filterConfig" style="margin-bottom: 15px" target="_blank" icon="el-icon-info">
            参考案例
          </el-link>
          <el-form label-position="left">
            <el-form-item prop="uploadFilter">
              <el-input
                v-model="uploadFilter"
                placeholder="本功能暂停使用，如有兴趣，自行去我的GitHub参考sub-web-api项目部署！"
                type="textarea"
                :autosize="{ minRows: 15, maxRows: 15 }"
                maxlength="50000"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <div style="float: right">
            <el-button
              type="primary"
              @click="
                uploadFilter = ''
                dialogUploadConfigVisible = false
              "
              >取 消</el-button
            >
            <el-button type="primary" @click="confirmUploadScript" :disabled="uploadFilter.length === 0"
              >确 定
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogLoadConfigVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="80%"
    >
      <div slot="title">可以从生成的长/短链接中解析信息,填入页面中去</div>
      <el-form label-position="left">
        <el-form-item prop="uploadConfig">
          <el-input
            v-model="loadConfig"
            type="textarea"
            :autosize="{ minRows: 15, maxRows: 15 }"
            maxlength="5000"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            loadConfig = ''
            dialogLoadConfigVisible = false
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="confirmLoadConfig" :disabled="loadConfig.length === 0">确 定 </el-button>
      </div>
    </el-dialog>
    <Announcement />
  </div>
</template>
<script>
import Announcement from '@/components/SvgIcon/Announcement.vue'
import { options } from '@/config/options'
import {
  configScriptBackend,
  configUploadBackend,
  defaultBackend,
  downld,
  filterConfigSample,
  project,
  remoteConfigSample,
  scriptConfigSample,
  shortUrlBackend
} from '@/config/env'
import { buildSubPostData, buildSubUrl } from '@/utils/subconverter'
export default {
  components: {
    Announcement // 增加：注册组件
  },
  data() {
    return {
      backendVersion: '',
      activeName: 'first',
      // 是否为 PC 端
      isPC: true,
      btnBoolean: false,
      options,
      form: {
        sourceSubUrl: '',
        clientType: '',
        customBackend: process.env.VUE_APP_SUBCONVERTER_DEFAULT_BACKEND || 'https://url.v1.mk',
        shortType: 'https://v1.mk/short',
        remoteConfig:
          'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full_NoAuto.ini',
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
        insert: false, // 是否插入默认订阅的节点，对应配置项 insert_url
        new_name: true, // 是否使用 Clash 新字段
        tpl: {
          surge: {
            doh: false // dns 查询是否使用 DoH
          },
          clash: {
            doh: false
          },
          singbox: {
            ipv6: false
          }
        }
      },
      loading1: false,
      loading2: false,
      loading3: false,
      customSubUrl: '',
      customShortSubUrl: '',
      dialogUploadConfigVisible: false,
      loadConfig: '',
      dialogLoadConfigVisible: false,
      uploadFilter: '',
      uploadScript: '',
      uploadConfig: '',
      filterConfig: filterConfigSample,
      scriptConfig: scriptConfigSample,
      sampleConfig: remoteConfigSample
    }
  },
  watch: {
    form: {
      deep: true,
      handler(newValue) {
        if (this.saveTimer) {
          clearTimeout(this.saveTimer)
        }
        this.saveTimer = setTimeout(() => {
          window.localStorage.setItem('subconverter_form_config', JSON.stringify(newValue))
        }, 500) // 延迟 500 毫秒执行，避免高频 I/O 操作
      }
    }
  },
  created() {
    document.title = '在线订阅转换工具'
    this.isPC = this.$getOS().isPc
  },
  mounted() {
    this.loadLocalConfig() // 新增：挂载时第一时间加载本地配置
    this.form.clientType = this.form.clientType || 'clash' // 防止覆盖为空
    this.getBackendVersion()
    this.anhei()
    let lightMedia = window.matchMedia('(prefers-color-scheme: light)')
    let darkMedia = window.matchMedia('(prefers-color-scheme: dark)')
    this.themeCallback = (e) => {
      if (e.matches) {
        this.anhei()
      }
    }
    if (typeof darkMedia.addEventListener === 'function' || typeof lightMedia.addEventListener === 'function') {
      lightMedia.addEventListener('change', this.themeCallback)
      darkMedia.addEventListener('change', this.themeCallback)
    } //监听系统主题，自动切换
  },
  beforeDestroy() {
    let lightMedia = window.matchMedia('(prefers-color-scheme: light)')
    let darkMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (typeof darkMedia.removeEventListener === 'function' || typeof lightMedia.removeEventListener === 'function') {
      lightMedia.removeEventListener('change', this.themeCallback)
      darkMedia.removeEventListener('change', this.themeCallback)
    }
  },
  methods: {
    selectChanged() {
      this.getBackendVersion()
    },
    getUrlParam() {
      let query = window.location.search.substring(1)
      let vars = query.split('&')
      for (let i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == 'backend') {
          return decodeURIComponent(pair[1])
        }
      }
      return ''
    },
    resetConfig() {
      this.$confirm('确定要清除本地记忆的配置并恢复默认状态吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.localStorage.removeItem('subconverter_form_config')
          // 刷新页面重新加载默认 data
          window.location.reload()
        })
        .catch(() => {})
    },
    anhei() {
      const getLocalTheme = window.localStorage.getItem('localTheme')
      const lightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)')
      const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')

      if (getLocalTheme) {
        document.body.className = getLocalTheme
      } else {
        const currentHour = new Date().getHours()
        if (currentHour >= 19 || currentHour < 7) {
          document.body.className = 'dark-mode'
        } else {
          document.body.className = 'light-mode'
        }

        if (lightMode && lightMode.matches) {
          document.body.className = 'light-mode'
        }
        if (darkMode && darkMode.matches) {
          document.body.className = 'dark-mode'
        }
      }
    },
    change() {
      const currentTheme = document.body.className
      const newTheme = currentTheme === 'light-mode' ? 'dark-mode' : 'light-mode'
      document.body.className = newTheme
      window.localStorage.setItem('localTheme', newTheme)
    },
    onCopy() {
      this.$message.success('已复制')
    },
    goToProject() {
      window.open(project)
    },
    gotoBasicVideo() {
      const basicVideoLink = process.env.VUE_APP_BASIC_VIDEO
      if (basicVideoLink) {
        window.open(basicVideoLink)
      } else {
        this.$message.warning('基础视频教程链接未配置')
      }
    },
    gotoAdvancedVideo() {
      const advancedVideoLink = process.env.VUE_APP_ADVANCED_VIDEO
      if (advancedVideoLink) {
        window.open(advancedVideoLink)
      } else {
        this.$message.warning('进阶视频教程链接未配置')
      }
    },
    toolsDown() {
      window.open(downld)
    },
    makeUrl() {
      const result = buildSubUrl(this.form, { defaultBackend })
      if (!result.ok) {
        this.$message.error('订阅链接与客户端为必填项')
        return false
      }
      this.customSubUrl = result.url
      this.$copyText(this.customSubUrl)
      this.$message.success('定制订阅已复制到剪贴板')
    },
    makeShortUrl() {
      let duan = this.form.shortType === '' ? shortUrlBackend : this.form.shortType
      this.loading1 = true
      let data = new FormData()
      data.append('longUrl', this.$btoa(this.customSubUrl))
      if (this.customShortSubUrl.trim() != '') {
        data.append('shortKey', this.customShortSubUrl.trim().indexOf('http') < 0 ? this.customShortSubUrl.trim() : '')
      }
      this.$axios
        .post(duan, data)
        .then((res) => {
          if (res.data.Code === 1 && res.data.ShortUrl !== '') {
            this.customShortSubUrl = res.data.ShortUrl
            this.$copyText(res.data.ShortUrl)
            this.$message.success('短链接已复制到剪贴板（IOS设备和Safari浏览器不支持自动复制API，需手动点击复制按钮）')
          } else {
            this.$message.error('短链接获取失败：' + res.data.Message)
          }
        })
        .catch((error) => {
          this.$message.error(error.displayMessage || '短链接获取失败')
        })
        .finally(() => {
          this.loading1 = false
        })
    },
    confirmUploadConfig() {
      this.loading2 = true
      let data = new FormData()
      data.append('config', encodeURIComponent(this.uploadConfig))
      this.$axios
        .post(configUploadBackend, data)
        .then((res) => {
          if (res.data.code === 0 && res.data.data !== '') {
            this.$message.success('远程配置上传成功，配置链接已复制到剪贴板')
            this.form.remoteConfig = res.data.data
            this.$copyText(this.form.remoteConfig)
            this.dialogUploadConfigVisible = false
          } else {
            this.$message.error('远程配置上传失败: ' + res.data.msg)
          }
        })
        .catch((error) => {
          this.$message.error(error.displayMessage || '远程配置上传失败')
        })
        .finally(() => {
          this.loading2 = false
        })
    },
    analyzeUrl() {
      if (this.loadConfig.indexOf('target') !== -1) {
        return this.loadConfig
      } else {
        this.loading3 = true
        return (async () => {
          try {
            let response = await fetch(this.loadConfig, {
              method: 'GET',
              redirect: 'follow'
            })
            return response.url
          } catch (e) {
            this.$message.error('解析短链接失败，请检查短链接服务端是否配置跨域：' + e)
          } finally {
            this.loading3 = false
          }
        })()
      }
    },
    confirmLoadConfig() {
      if (this.loadConfig.trim() === '' || !this.loadConfig.trim().includes('http')) {
        this.$message.error('待解析的订阅链接不合法')
        return false
      }
      ;(async () => {
        let url
        try {
          url = new URL(await this.analyzeUrl())
        } catch (error) {
          this.$message.error('请输入正确的订阅地址!')
          return
        }
        this.form.customBackend = url.origin
        let param = new URLSearchParams(url.search)
        if (param.get('target')) {
          let target = param.get('target')
          if (target === 'surge' && param.get('ver')) {
            // 类型为surge,有ver
            this.form.clientType = target + '&ver=' + param.get('ver')
          } else if (target === 'surge') {
            //类型为surge,没有ver
            this.form.clientType = target + '&ver=4'
          } else {
            //类型为其他
            this.form.clientType = target
          }
        }
        if (param.get('url')) {
          this.form.sourceSubUrl = param.get('url')
        }
        if (param.get('insert')) {
          this.form.insert = param.get('insert') === 'true'
        }
        if (param.get('config')) {
          this.form.remoteConfig = param.get('config')
        }
        if (param.get('exclude')) {
          this.form.excludeRemarks = param.get('exclude')
        }
        if (param.get('include')) {
          this.form.includeRemarks = param.get('include')
        }
        if (param.get('filename')) {
          this.form.filename = param.get('filename')
        }
        if (param.get('rename')) {
          this.form.rename = param.get('rename')
        }
        if (param.get('interval')) {
          this.form.interval = Math.ceil(param.get('interval') / 86400)
        }
        if (param.get('dev_id')) {
          this.form.devid = param.get('dev_id')
        }
        if (param.get('append_type')) {
          this.form.appendType = param.get('append_type') === 'true'
        }
        if (param.get('tls13')) {
          this.form.tls13 = param.get('tls13')
        }
        if (param.get('xudp')) {
          this.form.xudp = param.get('xudp') === 'true'
        }
        if (param.get('sort')) {
          this.form.sort = param.get('sort') === 'true'
        }
        if (param.get('emoji')) {
          this.form.emoji = param.get('emoji') === 'true'
        }
        if (param.get('list')) {
          this.form.nodeList = param.get('list') === 'true'
        }
        if (param.get('udp')) {
          this.form.udp = param.get('udp') === 'true'
        }
        if (param.get('tfo')) {
          this.form.tfo = param.get('tfo') === 'true'
        }
        if (param.get('expand')) {
          this.form.expand = param.get('expand') === 'true'
        }
        if (param.get('scv')) {
          this.form.scv = param.get('scv') === 'true'
        }
        if (param.get('fdn')) {
          this.form.fdn = param.get('fdn') === 'true'
        }
        if (param.get('surge.doh')) {
          this.form.tpl.surge.doh = param.get('surge.doh') === 'true'
        }
        if (param.get('clash.doh')) {
          this.form.tpl.clash.doh = param.get('clash.doh') === 'true'
        }
        if (param.get('new_name')) {
          this.form.new_name = param.get('new_name') === 'true'
        }
        if (param.get('singbox.ipv6')) {
          this.form.tpl.singbox.ipv6 = param.get('singbox.ipv6') === '1'
        }
        if (param.get('diyua')) {
          this.form.diyua = param.get('diyua')
        }
        this.dialogLoadConfigVisible = false
        this.$message.success('长/短链接已成功解析为订阅信息')
      })()
    },
    renderPost() {
      return buildSubPostData(this.form)
    },
    confirmUploadScript() {
      if (this.form.sourceSubUrl.trim() === '') {
        this.$message.error('订阅链接不能为空')
        return false
      }
      this.loading2 = true
      let data = this.renderPost()
      data.append('sortscript', encodeURIComponent(this.uploadScript))
      data.append('filterscript', encodeURIComponent(this.uploadFilter))
      this.$axios
        .post(configScriptBackend, data)
        .then((res) => {
          if (res.data.code === 0 && res.data.data !== '') {
            this.$message.success(
              '自定义JS上传成功，订阅链接已复制到剪贴板（IOS设备和Safari浏览器不支持自动复制API，需手动点击复制按钮）'
            )
            this.customSubUrl = res.data.data
            this.$copyText(res.data.data)
            this.dialogUploadConfigVisible = false
            this.btnBoolean = true
          } else {
            this.$message.error('自定义JS上传失败: ' + res.data.msg)
          }
        })
        .catch((error) => {
          this.$message.error(error.displayMessage || '自定义JS上传失败')
        })
        .finally(() => {
          this.loading2 = false
        })
    },
    getBackendVersion() {
      this.$axios
        .get(this.form.customBackend + '/version')
        .then((res) => {
          this.backendVersion = res.data.replace(/backend\n$/gm, '')
          this.backendVersion = this.backendVersion.replace('subconverter', 'SubConverter')
          let a =
            this.form.customBackend.indexOf('api.v1.mk') !== -1 || this.form.customBackend.indexOf('url.v1.mk') !== -1
          let b = this.form.customBackend.indexOf('127.0.0.1') !== -1
          a
            ? this.$message.success(
                `${this.backendVersion}` +
                  '肥羊负载均衡增强版后端，已屏蔽免费节点池（会返回403），额外支持Vless Reality+AnyTLS+TUIC+Mieru订阅转换'
              )
            : b
            ? this.$message.success(`${this.backendVersion}` + '本地局域网自建版后端')
            : this.$message.success(`${this.backendVersion}` + '官方原版后端不支持vless/hysteria订阅转换')
        })
        .catch(() => {
          this.$message.error('请求SubConverter版本号返回数据失败，该后端不可用！')
        })
    },
    // 新增：加载本地存储的表单配置
    loadLocalConfig() {
      const localConfig = window.localStorage.getItem('subconverter_form_config')
      if (localConfig) {
        try {
          const parsed = JSON.parse(localConfig)

          // 对于简单的深层结构，可以手写合并，或者引入 lodash/merge
          // 这里给出一个轻量级的手动安全赋值方式：
          Object.keys(parsed).forEach((key) => {
            if (typeof parsed[key] === 'object' && parsed[key] !== null && !Array.isArray(parsed[key])) {
              this.form[key] = { ...this.form[key], ...parsed[key] }
            } else {
              this.form[key] = parsed[key]
            }
          })
          // 针对更深层的 tpl 进行二次兜底
          if (parsed.tpl) {
            this.form.tpl = {
              surge: { ...this.form.tpl.surge, ...(parsed.tpl.surge || {}) },
              clash: { ...this.form.tpl.clash, ...(parsed.tpl.clash || {}) },
              singbox: { ...this.form.tpl.singbox, ...(parsed.tpl.singbox || {}) }
            }
          }

          const urlBackend = this.getUrlParam()
          if (urlBackend !== '') {
            this.form.customBackend = urlBackend
          }
        } catch (e) {
          console.error('解析本地配置失败，已恢复默认值', e)
          window.localStorage.removeItem('subconverter_form_config')
        }
      }
    }
  }
}
</script>
