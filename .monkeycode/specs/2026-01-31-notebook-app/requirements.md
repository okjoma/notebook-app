# Requirements Document - Notebook App

## Introduction

本文档定义了笔记本应用（个人日记应用）的详细需求规格。该应用支持模板化记录、分类管理、数据安全备份，满足多场景记录需求，兼顾易用性与个性化。

## Glossary

| 术语 | 定义 |
|------|------|
| **系统 (System)** | 笔记本应用，一个支持模板化记录的个人日记 Web 应用 |
| **模板 (Template)** | 预定义的日记结构，包含一组可选字段，关联唯一分类 |
| **分类 (Category)** | 日记的组织维度，如"工作"、"旅行"、"生活"等 |
| **日记条目 (Diary Entry)** | 基于模板创建的单条日记记录 |
| **字段 (Field)** | 日记条目中可填写的具体数据项，如日期、时间、地点等 |
| **WebDAV** | 基于 Web 的分布式创作和版本控制协议，用于远程数据同步 |
| **AI 总结 (AI Summary)** | 自动生成的日记内容摘要 |

## Requirements

### Requirement 1: 模板管理

**User Story:** AS 用户, I want 创建和管理日记模板, so that 我可以为不同场景定制日记记录格式

#### Acceptance Criteria

1. WHEN 用户访问模板管理页面, 系统 SHALL 显示所有已创建的模板列表, 包含模板名称和关联的分类
2. WHEN 用户点击"创建模板", 系统 SHALL 显示模板配置表单
3. WHEN 用户在模板配置表单中填写模板名称并选择分类, 系统 SHALL 保存模板
4. WHEN 用户创建模板时, 系统 SHALL 默认提供包含"日期""正文内容"字段的通用模板
5. WHEN 用户编辑已存在的模板, 系统 SHALL 更新模板配置
6. WHEN 用户删除模板, 系统 SHALL 移除该模板并提示用户确认操作
7. IF 模板已关联日记条目, 系统 SHALL 不允许删除模板, 并显示提示信息

### Requirement 2: 模板字段配置

**User Story:** AS 用户, I want 配置模板包含的字段, so that 我可以根据需要选择日记要记录的信息

#### Acceptance Criteria

1. WHEN 用户创建或编辑模板, 系统 SHALL 显示可选字段列表供用户勾选
2. WHEN 用户勾选"日期"字段, 系统 SHALL 在使用该模板创建日记时自动生成当前日期
3. WHEN 用户勾选"日期"字段, 系统 SHALL 允许用户手动修改日期值
4. WHEN 用户勾选"时间"字段, 系统 SHALL 在使用该模板创建日记时自动记录当前时间
5. WHEN 用户勾选"时间"字段, 系统 SHALL 允许用户手动修改时间值
6. WHEN 用户勾选"地点"字段, 系统 SHALL 在使用该模板创建日记时自动获取地理位置
7. WHEN 用户勾选"地点"字段, 系统 SHALL 允许用户手动编辑地点信息
8. WHEN 用户勾选"天气"字段, 系统 SHALL 在联网状态下自动获取天气状况和温度
9. WHILE 用户离线且"天气"字段已启用, 系统 SHALL 暂存日记并在联网后自动补充天气数据
10. WHEN 用户勾选"心情"字段, 系统 SHALL 显示预设的表情选项供用户选择
11. WHEN 用户勾选"正文内容"字段, 系统 SHALL 提供多行文本输入框
12. WHEN 用户勾选"标签"字段, 系统 SHALL 允许用户添加多个关键词标签
13. WHEN 用户勾选"图片"字段, 系统 SHALL 支持用户上传或插入照片
14. WHEN 用户勾选"AI 总结"字段, 系统 SHALL 在保存日记时自动生成单篇摘要并显示在正文下方

### Requirement 3: 日记创建与编辑

**User Story:** AS 用户, I want 基于模板创建和编辑日记, so that 我可以按预设结构记录生活

#### Acceptance Criteria

1. WHEN 用户点击"新建日记", 系统 SHALL 显示模板选择界面
2. WHEN 用户选择一个模板, 系统 SHALL 根据模板配置显示对应的表单字段
3. WHEN 用户填写表单并点击"保存", 系统 SHALL 保存日记条目
4. WHEN 用户编辑已发布的日记, 系统 SHALL 加载原有数据到表单中
5. WHEN 用户编辑日记并保存, 系统 SHALL 更新日记条目内容
6. IF "AI 总结"字段已启用, 系统 SHALL 在保存时自动生成摘要
7. IF 用户未填写必填字段, 系统 SHALL 提示用户填写完整信息

### Requirement 4: 数据持久化存储

**User Story:** AS 用户, I want 数据持久化保存, so that 我的日记不会因浏览器关闭而丢失

#### Acceptance Criteria

1. WHEN 用户保存日记条目, 系统 SHALL 将数据存储到浏览器的本地存储中
2. WHEN 用户刷新页面, 系统 SHALL 从本地存储加载所有日记数据
3. WHEN 用户打开应用, 系统 SHALL 恢复上次的日记列表和模板配置
4. WHEN 用户关闭浏览器, 系统 SHALL 保持所有数据不丢失
5. WHILE 用户在同一浏览器中访问应用, 系统 SHALL 保持跨会话数据一致性

### Requirement 5: 数据导出功能

**User Story:** AS 用户, I want 导出日记数据为 JSON 文件, so that 我可以备份和迁移我的数据

#### Acceptance Criteria

1. WHEN 用户点击"导出数据", 系统 SHALL 生成包含所有日记条目和模板配置的 JSON 文件
2. WHEN 系统生成导出文件, 系统 SHALL 使用"我的日记_YYYY-MM-DD.json"格式的文件名
3. WHEN 文件名中的日期部分, 系统 SHALL 使用导出操作的当天日期
4. WHEN 用户下载导出文件, 系统 SHALL 确保文件包含完整的日记数据和模板配置
5. WHEN 导出的 JSON 文件, 系统 SHALL 包含以下数据结构: 日记条目列表、模板配置列表

### Requirement 6: 数据导入功能

**User Story:** AS 用户, I want 导入 JSON 文件恢复数据, so that 我可以迁移或恢复我的日记

#### Acceptance Criteria

1. WHEN 用户点击"导入数据", 系统 SHALL 显示文件选择对话框
2. WHEN 用户选择有效的 JSON 文件, 系统 SHALL 读取并解析文件内容
3. WHEN 用户选择导入模式为"合并模式", 系统 SHALL 保留现有数据并合并导入的数据
4. WHEN 用户选择导入模式为"覆盖模式", 系统 SHALL 替换所有现有数据为导入的数据
5. WHILE 用户选择导入模式, 系统 SHALL 显示模式说明和影响提示
6. WHEN 导入完成, 系统 SHALL 显示导入结果的统计信息
7. IF 导入的文件格式无效, 系统 SHALL 提示用户文件格式错误

### Requirement 7: WebDAV 备份支持

**User Story:** AS 用户, I want 通过 WebDAV 协议备份数据, so that 我可以远程同步我的日记

#### Acceptance Criteria

1. WHEN 用户配置 WebDAV 服务器信息, 系统 SHALL 保存 WebDAV 连接配置
2. WHEN 用户执行 WebDAV 备份, 系统 SHALL 将所有日记和模板数据上传到 WebDAV 服务器
3. WHEN 用户执行 WebDAV 恢复, 系统 SHALL 从 WebDAV 服务器下载数据
4. WHEN WebDAV 连接失败, 系统 SHALL 显示错误信息并记录失败原因
5. WHEN WebDAV 备份完成, 系统 SHALL 显示备份成功提示

### Requirement 8: 日记列表展示

**User Story:** AS 用户, I want 按时间倒序查看日记列表, so that 我可以快速浏览最新的记录

#### Acceptance Criteria

1. WHEN 用户访问日记列表页面, 系统 SHALL 按时间倒序显示所有日记条目
2. WHEN 列表项显示日记条目, 系统 SHALL 包含标题、日期、分类、摘要信息
3. WHEN 用户点击列表项, 系统 SHALL 导航到日记详情页面
4. WHEN 列表为空, 系统 SHALL 显示"暂无日记"的提示信息

### Requirement 9: 分类筛选功能

**User Story:** AS 用户, I want 按分类筛选日记, so that 我可以按场景查看相关日记

#### Acceptance Criteria

1. WHEN 用户访问日记列表页面, 系统 SHALL 显示分类筛选器
2. WHEN 用户点击分类筛选器, 系统 SHALL 显示所有可用分类选项
3. WHEN 用户选择一个分类, 系统 SHALL 只显示属于该分类的日记条目
4. WHEN 用户选择"全部"选项, 系统 SHALL 显示所有日记条目
5. WHEN 当前分类有日记, 系统 SHALL 在筛选器上显示该分类的日记数量

### Requirement 10: 搜索功能

**User Story:** AS 用户, I want 搜索日记内容, so that 我可以快速找到特定的日记

#### Acceptance Criteria

1. WHEN 用户在搜索框输入关键词, 系统 SHALL 实时显示匹配的日记条目
2. WHEN 用户搜索关键词, 系统 SHALL 匹配以下字段: 日期、地点、标签、正文内容
3. WHEN 搜索结果为空, 系统 SHALL 显示"未找到匹配的日记"提示
4. WHEN 用户清空搜索框, 系统 SHALL 显示完整的日记列表

### Requirement 11: 日记详情查看

**User Story:** AS 用户, I want 查看完整的日记内容, so that 我可以回顾详细的记录

#### Acceptance Criteria

1. WHEN 用户点击日记列表项, 系统 SHALL 显示日记详情页面
2. WHEN 详情页面显示日记, 系统 SHALL 包含所有已填写的字段内容
3. WHEN "AI 总结"字段已生成, 系统 SHALL 在正文内容下方显示摘要
4. WHEN 日记包含图片, 系统 SHALL 显示图片预览
5. WHEN 日记包含标签, 系统 SHALL 显示所有标签列表
6. WHEN 用户在详情页面, 系统 SHALL 提供"编辑"和"删除"操作按钮

### Requirement 12: 日记删除功能

**User Story:** AS 用户, I want 删除不需要的日记, so that 我可以管理我的日记内容

#### Acceptance Criteria

1. WHEN 用户点击日记的"删除"按钮, 系统 SHALL 显示确认对话框
2. WHEN 用户在确认对话框中确认删除, 系统 SHALL 移除该日记条目
3. WHEN 用户在确认对话框中取消, 系统 SHALL 保留日记条目并关闭对话框
4. WHEN 日记删除成功, 系统 SHALL 刷新列表并显示删除成功提示
5. WHEN 日记删除失败, 系统 SHALL 显示错误信息

### Requirement 13: 界面设计要求

**User Story:** AS 用户, I want 使用温馨现代的界面, so that 我可以享受愉快的记录体验

#### Acceptance Criteria

1. WHEN 用户使用应用, 系统 SHALL 展示温馨、现代的视觉设计风格
2. WHEN 用户使用应用, 系统 SHALL 保持界面简洁直观
3. WHEN 用户使用应用, 系统 SHALL 减少操作步骤以降低上手成本
4. WHEN 系统使用色彩, 系统 SHALL 使用柔和的配色方案降低视觉疲劳
5. WHEN 系统使用字体, 系统 SHALL 选择清晰易读的字体

### Requirement 14: 隐私与安全

**User Story:** AS 用户, I want 确保我的数据私密安全, so that 我可以放心记录个人内容

#### Acceptance Criteria

1. WHEN 用户存储日记数据, 系统 SHALL 使用浏览器本地私密存储
2. WHEN 数据存储在本地, 系统 SHALL 确保数据仅用户本人可访问
3. WHEN 用户执行导出操作, 系统 SHALL 仅由用户主动触发
4. WHEN 用户导入数据, 系统 SHALL 仅处理用户选择的文件
5. WHEN 用户使用 WebDAV, 系统 SHALL 仅连接用户配置的服务器

### Requirement 15: 备份提醒

**User Story:** AS 用户, I want 定期收到备份提醒, so that 我可以保障数据安全

#### Acceptance Criteria

1. WHEN 用户距离上次备份超过7天, 系统 SHALL 在启动时显示备份提醒
2. WHEN 备份提醒显示, 系统 SHALL 提供"立即备份"按钮跳转到导出功能
3. WHEN 用户执行备份操作, 系统 SHALL 更新最后备份时间
4. WHILE 用户关闭备份提醒, 系统 SHALL 在下次满足条件时继续提醒
