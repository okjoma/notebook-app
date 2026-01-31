/**
 * 平台服务适配器 - 根据运行环境选择合适的服务
 */
import MobilePlatformService from './MobilePlatformService'
import WebPlatformService from './WebPlatformService'

class PlatformService {
  static #instance = null

  /**
   * 获取平台服务实例
   */
  static getInstance() {
    if (!this.#instance) {
      // 简单检测是否为 Capacitor 环境
      this.#instance = window.Capacitor ? MobilePlatformService : WebPlatformService
    }
    return this.#instance
  }

  /**
   * 检查是否运行在移动端
   */
  static async isMobile() {
    return this.getInstance().isMobile()
  }

  /**
   * 获取当前平台
   */
  static async getPlatform() {
    return this.getInstance().getPlatform()
  }

  /**
   * 获取平台能力
   */
  static async getCapabilities() {
    return this.getInstance().getCapabilities()
  }

  /**
   * 调用相机拍照
   */
  static async takePhoto() {
    return this.getInstance().takePhoto()
  }

  /**
   * 从相册选择照片
   */
  static async pickPhoto() {
    return this.getInstance().pickPhoto()
  }

  /**
   * 获取当前位置
   */
  static async getCurrentPosition() {
    return this.getInstance().getCurrentPosition()
  }

  /**
   * 发送本地通知
   */
  static async scheduleNotification(options) {
    return this.getInstance().scheduleNotification(options)
  }

  /**
   * 取消通知
   */
  static async cancelNotification(id) {
    return this.getInstance().cancelNotification(id)
  }

  /**
   * 请求通知权限
   */
  static async requestNotificationPermission() {
    return this.getInstance().requestNotificationPermission()
  }

  /**
   * 触发震动反馈
   */
  static async hapticImpact(style) {
    return this.getInstance().hapticImpact(style)
  }

  /**
   * 触发成功反馈
   */
  static async hapticSuccess() {
    return this.getInstance().hapticSuccess()
  }

  /**
   * 触发错误反馈
   */
  static async hapticError() {
    return this.getInstance().hapticError()
  }

  /**
   * 保存到本地存储
   */
  static async setItem(key, value) {
    return this.getInstance().setItem(key, value)
  }

  /**
   * 从本地存储读取
   */
  static async getItem(key) {
    return this.getInstance().getItem(key)
  }

  /**
   * 保存草稿
   */
  static async saveDraft(entryId, data) {
    return this.getInstance().saveDraft(entryId, data)
  }

  /**
   * 获取草稿
   */
  static async getDraft(entryId) {
    return this.getInstance().getDraft(entryId)
  }

  /**
   * 删除草稿
   */
  static async deleteDraft(entryId) {
    return this.getInstance().deleteDraft(entryId)
  }

  /**
   * 设置状态栏样式
   */
  static async setStatusBarStyle(style) {
    return this.getInstance().setStatusBarStyle(style)
  }

  /**
   * 隐藏状态栏
   */
  static async hideStatusBar() {
    return this.getInstance().hideStatusBar()
  }

  /**
   * 显示状态栏
   */
  static async showStatusBar() {
    return this.getInstance().showStatusBar()
  }
}

export default PlatformService
