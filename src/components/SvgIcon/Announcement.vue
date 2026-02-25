<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="50%"
    center
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="announcement-dialog"
  >
    <div class="announcement-content" v-html="content"></div>
    
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialog" style="width: 120px;">我知道了</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "Announcement",
  data() {
    return {
      visible: false,
      title: "项目公告",
      content: `
        <div style="text-align:center;font-size:15px;line-height: 1.8;">
          <p><strong>欢迎使用开源版在线订阅转换工具！</strong></p>
          <p>本项目基于开源协议构建，致力于为社区提供纯粹、高效的订阅转换服务。</p>
          <p style="color: #888; font-size: 13px; margin-top: 15px;">
            提示：您可以通过修改系统配置自定义此公告内容。
          </p>
        </div>
      `
    };
  },
  mounted() {
    this.checkAnnouncementStatus();
  },
  methods: {
    checkAnnouncementStatus() {
      // 检查本地存储，如果今天没有弹过则显示
      const lastShowDate = window.localStorage.getItem('announcement_last_show');
      const today = new Date().toDateString();
      if (lastShowDate !== today) {
        this.visible = true;
      }
    },
    closeDialog() {
      this.visible = false;
      // 记录今天已展示
      const today = new Date().toDateString();
      window.localStorage.setItem('announcement_last_show', today);
    }
  }
};
</script>

<style scoped>
.announcement-content {
  padding: 10px 20px;
}
</style>