# 包子铺 BZP 小程序设计规格

## 背景

包子铺（bzp）是第三个小程序业务。第一版目标是完成小程序前端、后端 API、运营后台的完整预约交易闭环，功能看齐馍好馍（mhm），但品牌和体验更贴近“热气腾腾的暖色包子铺”。

BZP 继续采用预约制，支持到店自提和预约配送。与 MHM 的主要差异是增加“早餐档 / 出炉批次”表达：商品和时段围绕“明早热乎档”“午间蒸笼档”“晚间加热档”等批次组织，让用户感知包子是按档出笼，而不是普通面点电商换皮。

## 设计原则

- `bzp` 是独立业务模块，不复用 `mhm` 数据表和 API 路径。
- 复用 MHM 已验证的工程组织、预约库存、订单状态机、后台运营模式。
- BZP 的差异集中在品牌视觉、商品品类、出炉批次、首页和结算的文案与信息架构。
- 后端业务逻辑放在 service 层，views 只做请求入口、鉴权、参数传递和响应。
- 所有后台创建、修改、删除操作必须记录 audit log。
- 第一版先交付可运营闭环，营销、会员、客服、评价等增强能力按 MHM 已有能力逐步补齐。

## 整体架构

### 小程序前端

在 `/Users/nourhr/dev/pycharm/projects/miniapp/bzp` 创建 Taro React 小程序，沿用 MHM 的分层：

- `src/api`：BZP API client 和接口封装。
- `src/store`：商品、购物车、结算、订单、用户、地址、档期、店铺配置状态。
- `src/pages`：首页、分类、商品详情、购物车、结算、订单列表、订单详情、个人中心。
- `src/components`：商品卡、订单卡、档期选择、价格、空状态、导航栏。
- `src/types`：商品、分类、批次、档期、订单、地址、店铺配置类型。

本地缓存、事件和 token 使用 `bzp_` 前缀，例如 `bzp_token`、`bzp_cart`、`bzp:login-required`。

### 后端 API

在 `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp` 创建 Django app，使用 `bzp_*` 数据表。模块参考 MHM：

- `product`：分类、商品、媒体、详情图、规格、口味、出炉批次标签。
- `slot`：门店、配送区域、档期模板、日期档期、容量占用。
- `cart`：购物车商品、规格/口味、选中状态、数量。
- `order`：订单预览、创建、支付、取消、完成、后台状态推进。
- `account`：微信登录、用户资料、地址。
- `finance`：支付流水、异常订单、对账与回填。
- `common`：首页、仪表盘、店铺设置、共享序列化和后台基础服务。
- `management`：BZP 演示数据初始化命令。

### 运营后台

在 `/Users/nourhr/dev/pycharm/projects/miniapp/admin` 增加 BZP 菜单、API 和页面：

- 分类管理。
- 商品管理。
- 门店管理。
- 配送区域。
- 档期模板。
- 预约档期。
- 订单管理。
- 资金管理。
- 店铺设置。

后台第一版不单独建设复杂首页装修系统。首页内容由商品推荐、新品、批次标签和店铺设置组合生成，保证开发节奏稳定。

## BZP 业务差异

### 商品品类

默认分类面向包子铺：

- 鲜肉包。
- 素菜包。
- 甜口包。
- 粥饮豆浆。
- 小菜卤味。
- 早餐套餐。

商品字段在 MHM 基础上增加展示型字段：

- `batch_label`：出炉批次标签，例如“明早热乎档”“午间蒸笼档”。
- `serve_window`：服务窗口文案，例如“07:00-09:00 出笼”。
- `steam_tag`：热卖氛围标签，例如“现包鲜蒸”“到店即取”“适合早餐”。

这些字段第一版不改变订单锁库存逻辑，只参与小程序展示、筛选和后台维护。

### 预约模型

BZP 复用 MHM 的“商品库存 + 时段容量”双约束：

1. 用户选择到店自提或预约配送。
2. 用户选择日期和档期。
3. 后端在事务中锁定商品和档期。
4. 创建待支付订单并占用商品库存和档期容量。
5. 支付、取消、超时、后台取消按订单状态释放或保留资源。

容量口径第一版仍按商品件数占用。后续如需要可给套餐或大份商品增加容量权重。

### 订单状态

BZP 沿用 MHM 状态：

- `pendingPay`：待支付。
- `preparing`：备货中。
- `readyForPickup`：待取货。
- `delivering`：配送中。
- `completed`：已完成。
- `cancelled`：已取消。
- `afterSale`：售后中。

小程序文案做 BZP 化，例如“蒸笼备货中”“热乎待取”“骑手配送中”。

## 视觉方向

BZP 视觉不沿用 MHM 的手工面点 / 烘焙感，改为更热、更明亮、更早餐铺：

- 主色：南瓜橙 `#F08A24`。
- 强调色：豆沙红 `#B93A2B`。
- 背景色：米白 `#FFF7EA`。
- 辅助色：蒸笼木色 `#B77A3A`、葱绿 `#3F8F52`。
- 深色文字：焦糖棕 `#3E2415`。

页面氛围使用暖色块、蒸汽弧线、竹蒸笼纹理感和圆润但不夸张的卡片。避免整页单一橙色，使用米白留白和绿色小标签平衡视觉。按钮和标签文案优先表达“热乎”“出笼”“早餐档”“现蒸”。

## 小程序页面

### 首页

首页展示品牌、搜索、今日热乎档、出炉批次入口、推荐商品、套餐和店铺服务信息。首页首屏要让用户立即看到“选择明早档期 / 今日可约档期”的入口。

### 分类

分类页保留顶部搜索和分类 tab。商品卡展示图片、商品名、价格、`batch_label`、`serve_window`、热卖标签和加购按钮。

### 商品详情

详情页展示大图、价格、规格、口味、出炉批次、配料说明、口感说明、购买须知。底部固定客服、加入购物车、立即预约。

### 购物车

购物车支持勾选、数量修改、删除、猜你喜欢、合计和结算。商品行展示批次标签，提醒用户最终以结算页选择的档期为准。

### 结算

结算页是 BZP 的核心差异页：

- 到店自提：选择门店、预约日期、出炉档期、取货人姓名电话。
- 预约配送：选择地址、预约日期、配送档期、配送费。
- 档期展示使用早餐铺语言，例如“07:00-09:00 明早热乎档，剩余 24 份”。
- 未选择档期不能提交订单。

### 订单列表与详情

订单卡突出预约类型、预约日期、档期、状态和取货码。订单详情展示门店或配送地址、预约档期、费用明细、商品列表、订单时间轴。

### 个人中心

保留登录资料、订单入口、地址、客服、店铺资质和协议入口。会员资产第一版可按 MHM 能力保留余额、优惠券、积分入口，但没有后台完成前可以展示空状态。

## API 设计

小程序 API 使用 `/api/bzp/`：

- `GET /bzp/home`
- `GET /bzp/categories`
- `GET /bzp/products`
- `GET /bzp/products/:id`
- `GET /bzp/slots?date=&fulfillmentType=&storeId=`
- `POST /bzp/orders/preview`
- `POST /bzp/orders`
- `POST /bzp/orders/:id/pay`
- `POST /bzp/orders/:id/cancel`
- `POST /bzp/orders/:id/confirm`
- `GET /bzp/orders`
- `GET /bzp/orders/:id`
- `GET /bzp/cart`
- `POST /bzp/cart/items`
- `POST /bzp/cart/items/:productId`
- `GET /bzp/addresses`
- `POST /bzp/addresses`
- `GET /bzp/service/shop-settings`
- `POST /bzp/auth/wechat-login`
- `GET /bzp/auth/profile`

运营端 API 使用 `/api/bzp-admin/`：

- `/bzp-admin/dashboard`
- `/bzp-admin/categories/*`
- `/bzp-admin/products/*`
- `/bzp-admin/stores/*`
- `/bzp-admin/delivery-areas/*`
- `/bzp-admin/slot-templates/*`
- `/bzp-admin/slots/*`
- `/bzp-admin/orders/*`
- `/bzp-admin/finance/*`
- `/bzp-admin/service/shop-settings/*`

响应格式沿用现有 `success/message/result` 或后台表格 `total/rows` 兼容模式。

## 数据模型

核心模型以 MHM 为蓝本并改名：

- `BzpCategory`
- `BzpProduct`
- `BzpProductMedia`
- `BzpProductDetailImage`
- `BzpStore`
- `BzpShopSettings`
- `BzpWechatIdentity`
- `BzpDeliveryArea`
- `BzpFulfillmentSlotTemplate`
- `BzpFulfillmentSlot`
- `BzpUserAddress`
- `BzpCoupon`
- `BzpCartItem`
- `BzpOrder`
- `BzpOrderItem`
- `BzpInventoryReservation`
- `BzpPaymentRecord`

`BzpProduct` 增加 `batch_label`、`serve_window`、`steam_tag`。`BzpFulfillmentSlotTemplate` 和 `BzpFulfillmentSlot` 增加 `batch_label`，用于后台生成和前端展示档期名称。

## 后台运营

### 商品与分类

商品后台支持图片、详情图、规格、口味、库存、价格、新品、推荐、出炉批次、服务窗口、热卖标签、上下架。

### 门店与配送

门店管理支持地址、电话、营业时间、自提开关。配送区域支持配送费、起送价、启用状态。

### 档期模板与日历

档期模板支持履约方式、门店、开始时间、结束时间、容量、星期、批次名称。档期日历支持未来 N 天生成、单日容量调整、停用临时时段。

### 订单与财务

订单列表支持状态、履约方式、日期、档期筛选。后台可推进订单状态，取消订单必须释放库存和容量并记录 audit log。资金管理沿用 MHM 的支付流水、异常订单、对账和回填能力。

### 店铺设置

店铺设置维护品牌名、标题、头像、地址、服务时间、联系电话、客服文案、资质图片。默认文案面向包子铺，例如“每天清晨现包现蒸，按预约档期出笼”。

## 演示数据

新增 `seed_bzp_demo_data` 命令，生成：

- 6 个默认分类。
- 12 个默认商品。
- 1 个默认门店。
- 2 个配送区域。
- 3 个档期模板：明早热乎档、午间蒸笼档、晚间加热档。
- 未来 7 天预约档期。
- 默认店铺设置。

## 测试策略

后端优先覆盖：

- 创建订单会占用商品库存和档期容量。
- 档期容量不足时下单失败。
- 商品库存不足时下单失败。
- 待支付订单取消会释放库存和容量。
- 后台取消订单会记录 audit log。
- BZP API 不读写 MHM 表。

前端和人工验证覆盖：

- 首页、分类、详情、购物车、结算、订单列表、订单详情核心路径。
- 结算页切换自提和配送时必填项、费用、可用档期正确变化。
- 出炉批次在首页、商品卡、详情和结算档期中展示一致。
- 移动端文本不溢出，底部固定操作栏不遮挡内容。

运营端验证覆盖：

- 商品、分类、门店、配送区域、档期模板、档期日历、订单、财务、店铺设置页面可打开并完成基础 CUD。
- 表格筛选和状态推进调用 `/bzp-admin/` API。
- 运营端 BZP 菜单不影响 RPG 和 MHM 菜单。

## 分阶段实施

### 阶段 1：BZP 小程序骨架与视觉差异

基于 MHM 小程序结构创建 BZP 工程，替换品牌、缓存 key、API 前缀、页面文案、暖色包子铺视觉，并加入出炉批次展示。

### 阶段 2：BZP 后端核心闭环

创建 `backend/www/bzp`，完成模型、迁移、API、订单预览、下单、支付模拟、取消、确认、店铺设置和 demo data。

### 阶段 3：BZP 运营后台

增加 BZP 菜单、API wrapper 和运营页面，覆盖商品、门店、配送、档期、订单、财务、店铺设置。

### 阶段 4：端到端联调与打磨

跑通 demo data、小程序构建、后端测试、运营端构建，修正视觉细节和预约交易边界。

## 已确认决策

- BZP 是第三个独立小程序业务。
- 功能看齐 MHM，首版包含小程序、后端、运营端。
- BZP 也采用预约制，支持自提和配送。
- BZP 增加“早餐档 / 出炉批次”差异层。
- 实现方式选择“复制 MHM 成熟闭环 + BZP 差异层”，不抽公共餐饮模块。
- 视觉采用更适合热气腾腾包子铺的暖色体系。
