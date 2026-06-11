# 包子铺 BZP 小程序 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first operational BZP package with an independent Taro miniapp, Django API module, and admin operations surface.

**Architecture:** BZP is a separate business line from MHM and RPG: miniapp files live in `/Users/nourhr/dev/pycharm/projects/miniapp/bzp`, backend code lives in `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp`, and admin code lives under `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src`. The implementation should fork MHM's proven reservation-commerce flow, replace all names/cache/API/table prefixes with BZP, and add the BZP-specific batch fields (`batch_label`, `serve_window`, `steam_tag`) for warm breakfast-slot presentation.

**Tech Stack:** Taro 4 + React 18 + TypeScript + Sass for the miniapp, Django 3.2 + DRF-style class views + MySQL models for backend APIs, Vue 3 + Naive UI + Alova for admin.

---

## File Structure

### BZP Miniapp Repository

- Modify: `/Users/nourhr/dev/pycharm/projects/miniapp/bzp/README.md` - replace the placeholder with package commands and product description.
- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/bzp/.gitignore`.
- Create from MHM pattern: `package.json`, `package-lock.json`, `project.config.json`, `tsconfig.json`, `babel.config.js`, `config/index.ts`, `config/dev.ts`, `config/prod.ts`.
- Create from MHM pattern: `src/app.tsx`, `src/app.config.ts`, `src/app.scss`, `src/env.d.ts`.
- Create from MHM pattern: `src/types/index.ts`.
- Create from MHM pattern: `src/api/client.ts`, `src/api/bzp.ts`.
- Create from MHM pattern: `src/store/catalog.ts`, `src/store/cart.ts`, `src/store/checkout.ts`, `src/store/order.ts`, `src/store/user.ts`, `src/store/slot.ts`, `src/store/address.ts`, `src/store/shop.ts`, `src/store/demo.ts`.
- Create from MHM pattern: `src/components/ui/AppNavBar.tsx`, `src/components/ui/AppNavBar.scss`, `src/components/ui/EmptyState.tsx`, `src/components/ui/EmptyState.scss`, `src/components/ui/PriceText.tsx`, `src/components/ui/PriceText.scss`.
- Create from MHM pattern: `src/components/product/ProductCard.tsx`, `src/components/product/ProductCard.scss`.
- Create from MHM pattern: `src/components/order/SlotPicker.tsx`, `src/components/order/SlotPicker.scss`, `src/components/order/OrderCard.tsx`, `src/components/order/OrderCard.scss`.
- Create from MHM pattern: `src/pages/home/index.tsx`, `src/pages/home/index.scss`, `src/pages/category/index.tsx`, `src/pages/category/index.scss`, `src/pages/product/detail/index.tsx`, `src/pages/product/detail/index.scss`, `src/pages/cart/index.tsx`, `src/pages/cart/index.scss`, `src/pages/checkout/index.tsx`, `src/pages/checkout/index.scss`, `src/pages/order/list/index.tsx`, `src/pages/order/list/index.scss`, `src/pages/order/detail/index.tsx`, `src/pages/order/detail/index.scss`, `src/pages/mine/index.tsx`, `src/pages/mine/index.scss`.
- Create from MHM pattern: `src/utils/orderActions.ts`, `src/utils/service.ts`.

### Backend Repository

- Modify: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/www/conf/base.py` - add `bzp.apps.BzpConfig` to installed apps.
- Modify: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/www/urls.py` or `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/miniapp/urls.py` where MHM is mounted - add `/api/bzp/` and `/api/bzp-admin/`.
- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/apps.py`, `__init__.py`, `models.py`, `urls.py`, `admin_urls.py`, `tests.py`.
- Create from MHM pattern: `common`, `product`, `slot`, `cart`, `order`, `account`, `address`, `finance`, `customer_service`, `marketing`, `upload`, `wallet` package folders with serializers/services/views/admin services matching MHM's current shape.
- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/management/commands/seed_bzp_demo_data.py`.
- Create migrations with `python manage.py makemigrations bzp`.

### Admin Repository

- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/router/modules/bzp.ts`.
- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/api/bzp/operation.ts`.
- Create from MHM pattern: `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/bzp/category/category.vue`, `product/product.vue`, `store/store.vue`, `delivery-area/delivery-area.vue`, `slot-template/slot-template.vue`, `slot-calendar/slot-calendar.vue`, `order/order.vue`, `finance/finance.vue`, `shop-settings/shop-settings.vue`.
- Modify: `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/dashboard/console/console.vue` - add BZP dashboard tab after BZP admin APIs pass build verification.

## Task 1: Commit Approved BZP Plan

**Files:**
- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/bzp/docs/superpowers/plans/2026-06-11-bzp-miniapp-implementation.md`
- Already created: `/Users/nourhr/dev/pycharm/projects/miniapp/bzp/docs/superpowers/specs/2026-06-11-bzp-miniapp-design.md`

- [ ] **Step 1: Verify repository state**

Run:

```bash
git -C /Users/nourhr/dev/pycharm/projects/miniapp/bzp status --short
```

Expected: only `docs/superpowers/plans/2026-06-11-bzp-miniapp-implementation.md` is untracked or modified.

- [ ] **Step 2: Scan plan for placeholders**

Run:

```bash
rg -n -e 'TB[D]' -e 'TO[D]O' -e '待[定]' -e 'implement late[r]' -e 'Similar t[o]' -e '适[当]' -e '后续补[充]' /Users/nourhr/dev/pycharm/projects/miniapp/bzp/docs/superpowers/plans/2026-06-11-bzp-miniapp-implementation.md
```

Expected: no matches.

- [ ] **Step 3: Commit and push the plan**

Run:

```bash
git -C /Users/nourhr/dev/pycharm/projects/miniapp/bzp add docs/superpowers/plans/2026-06-11-bzp-miniapp-implementation.md
git -C /Users/nourhr/dev/pycharm/projects/miniapp/bzp commit -m "docs: add bzp implementation plan"
git -C /Users/nourhr/dev/pycharm/projects/miniapp/bzp push origin main
```

Expected: a commit is created and pushed to `origin/main`.

## Task 2: Scaffold BZP Miniapp From MHM

**Files:**
- Create and modify all BZP miniapp files listed in “BZP Miniapp Repository”.
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/mhm/package.json`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/mhm/src/api/client.ts`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/mhm/src/api/mhm.ts`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/mhm/src/types/index.ts`

- [ ] **Step 1: Copy the MHM miniapp source into BZP**

Run:

```bash
rsync -a --exclude='.git' --exclude='docs' --exclude='stitch' /Users/nourhr/dev/pycharm/projects/miniapp/mhm/ /Users/nourhr/dev/pycharm/projects/miniapp/bzp/
```

Expected: BZP now contains Taro config, `src`, package files, and MHM implementation files. Existing BZP `docs/` remains.

- [ ] **Step 2: Rename API module and textual prefixes**

Run:

```bash
mv /Users/nourhr/dev/pycharm/projects/miniapp/bzp/src/api/mhm.ts /Users/nourhr/dev/pycharm/projects/miniapp/bzp/src/api/bzp.ts
perl -pi -e 's/mhmApi/bzpApi/g; s/Mhm/Bzp/g; s/MHM/BZP/g; s/mhm/bzp/g; s/馍好馍/包子铺/g' $(rg -l "mhmApi|Mhm|MHM|mhm|馍好馍" /Users/nourhr/dev/pycharm/projects/miniapp/bzp --glob '!docs/**' --glob '!node_modules/**')
```

Expected: no `mhmApi`, `Mhm`, `MHM`, `mhm_`, `/mhm`, or `馍好馍` references remain outside docs.

- [ ] **Step 3: Verify no old MHM references remain in runtime files**

Run:

```bash
rg -n "mhmApi|Mhm|MHM|mhm_|/mhm|馍好馍" /Users/nourhr/dev/pycharm/projects/miniapp/bzp --glob '!docs/**' --glob '!node_modules/**'
```

Expected: no matches. If matches appear in generated lock metadata only, inspect and either update package metadata or leave integrity hashes unchanged.

- [ ] **Step 4: Update package metadata**

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/bzp/package.json` so the top fields are:

```json
{
  "name": "bzp-miniapp",
  "version": "1.0.0",
  "description": "包子铺预约小程序"
}
```

Keep the scripts and dependencies from MHM unchanged.

- [ ] **Step 5: Update BZP type fields**

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/bzp/src/types/index.ts` and ensure `BzpProduct` includes:

```ts
export interface BzpProduct {
  id: string
  categoryId: string
  categoryName?: string
  name: string
  subtitle?: string
  description?: string
  price: number
  originalPrice?: number
  stock: number
  sales: number
  points: number
  cover: string
  flavors: BzpProductOption[]
  specs: BzpProductOption[]
  tags: string[]
  batchLabel?: string
  serveWindow?: string
  steamTag?: string
  ingredients?: string
  nutrition?: BzpNutritionItem[]
  media?: BzpProductMedia[]
  detailImages?: string[]
  isRecommended?: boolean
  isNew?: boolean
}
```

Expected: later page code can display BZP batch metadata without `any` casts.

- [ ] **Step 6: Update BZP API client endpoints**

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/bzp/src/api/client.ts` and `/Users/nourhr/dev/pycharm/projects/miniapp/bzp/src/api/bzp.ts` so:

```ts
const token = Taro.getStorageSync('bzp_token')
const refreshToken = Taro.getStorageSync('bzp_refresh_token')
const baseURL = process.env.TARO_APP_BZP_API_BASE_URL || process.env.BZP_API_BASE_URL || 'http://localhost:8000/api'
```

and endpoint calls use the `/bzp/` endpoint family, including `/bzp/service/shop-settings`, `/bzp/auth/wechat-login`, and `/bzp/auth/profile`.

- [ ] **Step 7: Apply BZP visual tokens**

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/bzp/src/app.scss` and define:

```scss
$bzp-bg: #fff7ea;
$bzp-primary: #f08a24;
$bzp-accent: #b93a2b;
$bzp-wood: #b77a3a;
$bzp-green: #3f8f52;
$bzp-text: #3e2415;

page {
  background: $bzp-bg;
  color: $bzp-text;
}

.bzp-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #fff1d8 0%, #fff7ea 38%, #fffaf2 100%);
}

.bzp-card {
  border-radius: 28px;
  background: #fffaf2;
  box-shadow: 0 16px 36px rgba(177, 96, 32, 0.12);
}
```

Then update page SCSS class names from `.mhm-*` to `.bzp-*`.

- [ ] **Step 8: Add BZP demo copy**

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/bzp/src/store/demo.ts` and seed categories/products with:

```ts
export const bzpDemoCategories = [
  { id: 'meat', name: '鲜肉包' },
  { id: 'veg', name: '素菜包' },
  { id: 'sweet', name: '甜口包' },
  { id: 'drink', name: '粥饮豆浆' },
  { id: 'side', name: '小菜卤味' },
  { id: 'set', name: '早餐套餐' },
]
```

Products must include `batchLabel`, `serveWindow`, and `steamTag` values such as `明早热乎档`, `07:00-09:00 出笼`, and `现包鲜蒸`.

- [ ] **Step 9: Show batch fields on product surfaces**

Edit `ProductCard.tsx`, product detail, checkout, and order card files so cards render:

```tsx
{product.batchLabel && <Text className='bzp-product-card__batch'>{product.batchLabel}</Text>}
{product.serveWindow && <Text className='bzp-product-card__window'>{product.serveWindow}</Text>}
{product.steamTag && <Text className='bzp-product-card__steam'>{product.steamTag}</Text>}
```

Expected: BZP pages visibly differ from MHM and expose the breakfast-slot concept.

- [ ] **Step 10: Build the BZP miniapp**

Run:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/bzp && npm install && npm run build:weapp
```

Expected: Taro completes without TypeScript or Sass errors and outputs the WeChat build directory.

- [ ] **Step 11: Commit and push miniapp scaffold**

Run:

```bash
git -C /Users/nourhr/dev/pycharm/projects/miniapp/bzp add .
git -C /Users/nourhr/dev/pycharm/projects/miniapp/bzp commit -m "feat: scaffold bzp miniapp"
git -C /Users/nourhr/dev/pycharm/projects/miniapp/bzp push origin main
```

Expected: BZP miniapp source is committed without `node_modules` or build artifacts.

## Task 3: Add Backend BZP Models With Reservation Tests

**Files:**
- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/models.py`
- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/tests.py`
- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/apps.py`
- Modify: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/www/conf/base.py`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/models.py`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/tests.py`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/order/services.py`

- [ ] **Step 1: Create the BZP Django app shell**

Run:

```bash
mkdir -p /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp
touch /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/__init__.py
```

Create `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/apps.py`:

```python
# -*- coding: utf-8 -*-
from django.apps import AppConfig


class BzpConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'bzp'
    verbose_name = 'BZP包子铺小程序'
```

- [ ] **Step 2: Register the app**

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/www/conf/base.py` and add:

```python
'bzp.apps.BzpConfig',
```

to `INSTALLED_APPS` next to `mhm.apps.MhmConfig`.

- [ ] **Step 3: Write reservation tests first**

Create `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/tests.py` with tests adapted from MHM and using BZP names:

```python
# -*- coding: utf-8 -*-
from decimal import Decimal
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone

from bzp.models import BzpCategory, BzpFulfillmentSlot, BzpProduct, BzpStore
from bzp.order.services import OrderApi


class BzpReservationTests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(username='bzp-user', password='test123456')
        self.category = BzpCategory.objects.create(id='meat', name='鲜肉包', sort=1)
        self.product = BzpProduct.objects.create(
            id='pork-bun',
            category=self.category,
            name='鲜肉大包',
            subtitle='清晨现包现蒸',
            price=Decimal('3.50'),
            stock=10,
            batch_label='明早热乎档',
            serve_window='07:00-09:00 出笼',
            steam_tag='现包鲜蒸',
            cover='https://example.test/pork-bun.jpg',
        )
        self.store = BzpStore.objects.create(id='main', name='包子铺总店', address='早餐街 1 号')
        tomorrow = timezone.localdate() + timezone.timedelta(days=1)
        self.slot = BzpFulfillmentSlot.objects.create(
            id='slot-morning',
            date=tomorrow,
            start_time='07:00',
            end_time='09:00',
            fulfillment_type=BzpFulfillmentSlot.TYPE_PICKUP,
            store=self.store,
            capacity=3,
            reserved_capacity=0,
            batch_label='明早热乎档',
        )

    def test_create_order_reserves_stock_and_slot_capacity(self):
        result = OrderApi(user=self.user).create({
            'fulfillmentType': 'pickup',
            'storeId': self.store.id,
            'slotId': self.slot.id,
            'pickupContactName': '张三',
            'pickupContactPhone': '13800000000',
            'items': [{'productId': self.product.id, 'quantity': 2}],
        })

        self.assertTrue(result['success'])
        self.product.refresh_from_db()
        self.slot.refresh_from_db()
        self.assertEqual(self.product.stock, 8)
        self.assertEqual(self.slot.reserved_capacity, 2)

    def test_create_order_fails_when_slot_capacity_is_exceeded(self):
        result = OrderApi(user=self.user).create({
            'fulfillmentType': 'pickup',
            'storeId': self.store.id,
            'slotId': self.slot.id,
            'pickupContactName': '张三',
            'pickupContactPhone': '13800000000',
            'items': [{'productId': self.product.id, 'quantity': 4}],
        })

        self.assertFalse(result['success'])
        self.assertIn('档期容量不足', result['message'])

    def test_cancel_pending_order_releases_stock_and_slot_capacity(self):
        api = OrderApi(user=self.user)
        created = api.create({
            'fulfillmentType': 'pickup',
            'storeId': self.store.id,
            'slotId': self.slot.id,
            'pickupContactName': '张三',
            'pickupContactPhone': '13800000000',
            'items': [{'productId': self.product.id, 'quantity': 2}],
        })
        order_id = created['result']['id']

        cancelled = api.cancel(order_id)

        self.assertTrue(cancelled['success'])
        self.product.refresh_from_db()
        self.slot.refresh_from_db()
        self.assertEqual(self.product.stock, 10)
        self.assertEqual(self.slot.reserved_capacity, 0)
```

- [ ] **Step 4: Run the failing tests**

Run:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/backend/www && python manage.py test bzp.tests
```

Expected: tests fail because `bzp.models` or `bzp.order.services` is not implemented yet.

- [ ] **Step 5: Create BZP models**

Copy `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/models.py` to `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/models.py`, then replace class/table/relationship prefixes:

```bash
cp /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/models.py /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/models.py
perl -pi -e 's/Mhm/Bzp/g; s/mhm_/bzp_/g; s/mhm/bzp/g; s/MHM/BZP/g; s/馍好馍/包子铺/g' /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/models.py
```

Add these fields to `BzpProduct`:

```python
batch_label = models.CharField(max_length=64, blank=True, default='')
serve_window = models.CharField(max_length=64, blank=True, default='')
steam_tag = models.CharField(max_length=64, blank=True, default='')
```

Add this field to `BzpFulfillmentSlot` and `BzpFulfillmentSlotTemplate`:

```python
batch_label = models.CharField(max_length=64, blank=True, default='')
```

- [ ] **Step 6: Create order service by adapting MHM**

Create the `order` package:

```bash
mkdir -p /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/order
touch /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/order/__init__.py
cp /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/order/services.py /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/order/services.py
cp /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/order/serializers.py /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/order/serializers.py
perl -pi -e 's/Mhm/Bzp/g; s/mhm/bzp/g; s/MHM/BZP/g; s/馍好馍/包子铺/g' /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/order/services.py /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/order/serializers.py
```

Expected: `OrderApi.create()` and `OrderApi.cancel()` use BZP models and return the same result contract as MHM.

- [ ] **Step 7: Create migrations**

Run:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/backend/www && python manage.py makemigrations bzp
```

Expected: Django creates `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/migrations/0001_initial.py`.

- [ ] **Step 8: Run backend reservation tests**

Run:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/backend/www && python manage.py test bzp.tests
```

Expected: all three reservation tests pass.

- [ ] **Step 9: Commit backend model foundation**

Run:

```bash
git -C /Users/nourhr/dev/pycharm/projects/miniapp/backend add www/bzp www/www/conf/base.py
git -C /Users/nourhr/dev/pycharm/projects/miniapp/backend commit -m "feat: add bzp backend reservation models"
git -C /Users/nourhr/dev/pycharm/projects/miniapp/backend push origin main
```

Expected: backend foundation is committed and pushed.

## Task 4: Add Backend BZP APIs, Admin APIs, And Demo Data

**Files:**
- Create BZP backend packages listed in “Backend Repository”.
- Modify URL mounting files discovered from existing MHM routes.
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/urls.py`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/admin_urls.py`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/common/services.py`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/product/services.py`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/management/commands/seed_mhm_demo_data.py`

- [ ] **Step 1: Copy remaining MHM backend modules**

Run:

```bash
for d in account address cart common customer_service finance marketing product slot upload wallet; do
  rsync -a /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/$d/ /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/$d/
done
cp /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/urls.py /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/urls.py
cp /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/mhm/admin_urls.py /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/admin_urls.py
perl -pi -e 's/Mhm/Bzp/g; s/mhm/bzp/g; s/MHM/BZP/g; s/馍好馍/包子铺/g' $(rg -l "Mhm|mhm|MHM|馍好馍" /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp)
```

Expected: BZP modules import `bzp.*` and use `Bzp*` models only.

- [ ] **Step 2: Add serializer fields for BZP batch metadata**

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/product/serializers.py` so `product_to_dict` includes:

```python
'batchLabel': product.batch_label,
'serveWindow': product.serve_window,
'steamTag': product.steam_tag,
```

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/slot/serializers.py` so slot dictionaries include:

```python
'batchLabel': slot.batch_label,
```

Expected: miniapp receives batch metadata without extra calls.

- [ ] **Step 3: Mount BZP URLs**

Find where MHM URLs are mounted:

```bash
rg -n "mhm|mhm-admin" /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/www /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/miniapp
```

Add equivalent routes:

```python
path('api/bzp/', include('bzp.urls')),
path('api/bzp-admin/', include('bzp.admin_urls')),
```

Expected: `/api/bzp/` and `/api/bzp-admin/` route to BZP code.

- [ ] **Step 4: Add BZP demo data command**

Create `/Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp/management/commands/seed_bzp_demo_data.py` by adapting MHM's seed command. The seed data must include these category names:

```python
['鲜肉包', '素菜包', '甜口包', '粥饮豆浆', '小菜卤味', '早餐套餐']
```

and these slot template batch labels:

```python
['明早热乎档', '午间蒸笼档', '晚间加热档']
```

Expected: running the command creates categories, products, one default store, delivery areas, slot templates, future slots, and shop settings.

- [ ] **Step 5: Verify no MHM references remain in BZP backend**

Run:

```bash
rg -n "Mhm|mhm_|mhm\\.|/mhm|馍好馍" /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp
```

Expected: no matches.

- [ ] **Step 6: Run backend tests and migration check**

Run:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/backend/www && python manage.py makemigrations bzp --check --dry-run
cd /Users/nourhr/dev/pycharm/projects/miniapp/backend/www && python manage.py test bzp.tests
```

Expected: dry-run reports no model changes after committed migrations, and tests pass.

- [ ] **Step 7: Run demo seed command**

Run:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/backend/www && python manage.py seed_bzp_demo_data
```

Expected: command completes and reports created or updated BZP records.

- [ ] **Step 8: Commit and push backend APIs**

Run:

```bash
git -C /Users/nourhr/dev/pycharm/projects/miniapp/backend add www/bzp www/www www/miniapp
git -C /Users/nourhr/dev/pycharm/projects/miniapp/backend commit -m "feat: add bzp backend APIs"
git -C /Users/nourhr/dev/pycharm/projects/miniapp/backend push origin main
```

Expected: backend API work is committed and pushed.

## Task 5: Add BZP Admin Operations Surface

**Files:**
- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/router/modules/bzp.ts`
- Create: `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/api/bzp/operation.ts`
- Create views under `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/bzp/`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/router/modules/mhm.ts`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/api/mhm/operation.ts`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/mhm/product/product.vue`
- Reference: `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/mhm/slot-template/slot-template.vue`

- [ ] **Step 1: Copy MHM admin API and views**

Run:

```bash
mkdir -p /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/api/bzp
cp /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/api/mhm/operation.ts /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/api/bzp/operation.ts
rsync -a /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/mhm/ /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/bzp/
cp /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/router/modules/mhm.ts /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/router/modules/bzp.ts
perl -pi -e 's/Mhm/Bzp/g; s/mhm/bzp/g; s/MHM/BZP/g; s/馍好馍/包子铺/g' $(rg -l "Mhm|mhm|MHM|馍好馍" /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/api/bzp /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/bzp /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/router/modules/bzp.ts)
```

Expected: BZP admin files exist and use `/bzp-admin/` endpoints.

- [ ] **Step 2: Update BZP router menu**

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/router/modules/bzp.ts` so the root meta is:

```ts
meta: {
  title: '包子铺运营',
  icon: renderIcon(ShopOutlined),
  sort: 4,
}
```

and route names use `bzp_` prefixes.

- [ ] **Step 3: Add BZP product batch fields to API types**

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/api/bzp/operation.ts` so `BzpProductRow` includes:

```ts
batch_label?: string;
serve_window?: string;
steam_tag?: string;
```

and `BzpSlotRow` plus `BzpSlotTemplateRow` include:

```ts
batch_label?: string;
```

- [ ] **Step 4: Add batch fields to product form**

Edit `/Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/bzp/product/product.vue` and add form fields:

```vue
<n-form-item label="出炉批次" path="batch_label">
  <n-input v-model:value="formModel.batch_label" placeholder="例如：明早热乎档" />
</n-form-item>
<n-form-item label="服务窗口" path="serve_window">
  <n-input v-model:value="formModel.serve_window" placeholder="例如：07:00-09:00 出笼" />
</n-form-item>
<n-form-item label="热卖标签" path="steam_tag">
  <n-input v-model:value="formModel.steam_tag" placeholder="例如：现包鲜蒸" />
</n-form-item>
```

Expected: operators can maintain package-specific display fields.

- [ ] **Step 5: Add batch label to slot template and slot calendar forms**

Edit BZP slot template and slot calendar pages and add:

```vue
<n-form-item label="批次名称" path="batch_label">
  <n-input v-model:value="formModel.batch_label" placeholder="例如：午间蒸笼档" />
</n-form-item>
```

Expected: generated slots can carry a breakfast-slot label.

- [ ] **Step 6: Verify no MHM references remain in BZP admin files**

Run:

```bash
rg -n "Mhm|mhm_|mhm-|/mhm|馍好馍" /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/api/bzp /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/bzp /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/router/modules/bzp.ts
```

Expected: no matches.

- [ ] **Step 7: Build admin**

Run:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/admin && pnpm install && pnpm build
```

Expected: Vite build completes without TypeScript or Vue template errors.

- [ ] **Step 8: Commit and push admin surface**

Run:

```bash
git -C /Users/nourhr/dev/pycharm/projects/miniapp/admin add src/api/bzp src/views/bzp src/router/modules/bzp.ts
git -C /Users/nourhr/dev/pycharm/projects/miniapp/admin commit -m "feat: add bzp admin operations"
git -C /Users/nourhr/dev/pycharm/projects/miniapp/admin push origin main
```

Expected: BZP admin operation surface is committed and pushed.

## Task 6: End-To-End Verification And Polish

**Files:**
- Verify BZP miniapp, backend, and admin files created in Tasks 2-5.
- Modify only files directly required to fix verification failures.

- [ ] **Step 1: Run BZP backend tests**

Run:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/backend/www && python manage.py test bzp.tests
```

Expected: all BZP backend tests pass.

- [ ] **Step 2: Run backend URL smoke checks**

Run the backend:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/backend/www && python manage.py runserver localhost:8000
```

In another terminal, run:

```bash
curl -s http://localhost:8000/api/bzp/home
curl -s http://localhost:8000/api/bzp/categories
```

Expected: both endpoints return JSON with `success` or the same response shape used by MHM. Stop the runserver after checking.

- [ ] **Step 3: Build BZP miniapp**

Run:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/bzp && npm run build:weapp
```

Expected: build passes.

- [ ] **Step 4: Build admin**

Run:

```bash
cd /Users/nourhr/dev/pycharm/projects/miniapp/admin && pnpm build
```

Expected: build passes.

- [ ] **Step 5: Cross-repository reference scan**

Run:

```bash
rg -n "mhm_token|mhm_refresh_token|mhm:login|required|/mhm|mhm-admin|馍好馍|Mhm" /Users/nourhr/dev/pycharm/projects/miniapp/bzp /Users/nourhr/dev/pycharm/projects/miniapp/backend/www/bzp /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/api/bzp /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/views/bzp /Users/nourhr/dev/pycharm/projects/miniapp/admin/src/router/modules/bzp.ts
```

Expected: no runtime references to MHM remain. Mentions inside `docs/` are acceptable only when describing the design source.

- [ ] **Step 6: Final git status check**

Run:

```bash
git -C /Users/nourhr/dev/pycharm/projects/miniapp/bzp status --short
git -C /Users/nourhr/dev/pycharm/projects/miniapp/backend status --short
git -C /Users/nourhr/dev/pycharm/projects/miniapp/admin status --short
```

Expected: all three repositories are clean, or only expected local environment files are present and ignored.

- [ ] **Step 7: Report completion**

Report:

```text
BZP miniapp build: PASS/FAIL
BZP backend tests: PASS/FAIL
Admin build: PASS/FAIL
Commits:
- bzp: <commit>
- backend: <commit>
- admin: <commit>
Manual steps:
- apply migrations in target environment
- configure BZP WeChat app credentials and API base URL
```

Expected: the user can see exactly what shipped and what must be configured outside code.
