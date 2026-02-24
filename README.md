# payment-scenario
Ссылка на развернутое приложение: **https://alexeyershov999.github.io/payment-scenario/**
Важно: для перехода на корневую страницу необходимо не забыть добавить в путь base (/payment-scenario/)

## Опцинально реализованные фичи:
- При активации чекбокса сохранения данных карты, номер карты сохраняется в localStorage (только номер в целях безопасности), и при следующем заказе подставляется в форму оплаты.
- Защита роутов от преждевременного перехода, нельзя перейти на страницу оплаты не сделав заказ, нельзя увидеть результат оплаты не оплатив заказ.
- Данные заказа и ошибок валидации хранятся в сторе приложения (Pinia).
- Каждая страница результата оплаты (Успех, Ошибка, Сломался сервис) появляется случайно, это сделано для того, чтобы все 3 страницы можно было просмотреть.

## Vue 3 / Vite-приложение, моделирующее сценарий оплаты: создание заказа, ввод данных карты и экран результата платежа.

## Структура проекта

Основные файлы и директории:

- **`index.html`** – точка входа Vite.
- **`vite.config.ts`** – конфигурация Vite (включая `base` для GitHub Pages).
- **`package.json`** – зависимости и npm-скрипты (`dev`, `build`, `preview`, `lint`, `format`, `deploy`).
- **`tsconfig*.json`** – настройка TypeScript.

### `src/`

- **`main.ts`** – инициализация приложения Vue, подключение роутера и глобальных стилей.
- **`App.vue`** – корневой компонент приложения.
- **`router/`**
  - `index.ts` – маршруты:
    - `/order` – страница создания заказа (`OrderForm.vue`)
    - `/payment` – страница оплаты (`OrderPayment.vue`)
    - `/payment-result` – экран результата оплаты (`PaymentResult.vue`), защита по наличию заказа и флага успешного прохождения оплаты.

### Страницы (`src/views/`)

- **`OrderForm.vue`**
  - Форма создания заказа (сумма, email, описание).
  - Валидация через `validationRules.ts`, сохранение в `orderStore`, редирект на `/payment`.

- **`OrderPayment.vue`**
  - Форма ввода данных карты: номер, срок действия, CVV.
  - Переключаемая подсказка CVV (`HelpTooltip`).
  - Кнопка «Оплатить {сумма}»; при сабмите:
    - опциональное сохранение номера карты в `localStorage`,
    - генерация псевдослучайного статуса оплаты (`success` / `failed` / `service_error`) через `utils/payment/paymentStatus.ts`,
    - установка статуса в `orderStore` и редирект на `/payment-result`.
  - Футер с логотипами платёжных систем и номером заказа на всю ширину экрана.

- **`PaymentResult.vue`**
  - Отображение результата оплаты:
    - текст из `PAYMENT_RESULT_MESSAGES` в `validation/messages.ts`,
    - соответствующая картинка (`success.png`, `failed.png`, `service_error.png`).

### Компоненты (`src/components/`)

- **`base/`**
  - `PageContainer.vue` – центрирование страниц, учёт высоты в мобильных браузерах (`100dvh`), ограничение ширины контента.
  - `FormCard.vue` – карточка с тенью, заголовком и слотом под логотип банка.
  - `FormInput.vue` – универсальный текстовый инпут / textarea с:
    - поддержкой форматтеров/парсеров,
    - интеграцией со `validationErrorsStore`,
    - иконкой внутри поля.
  - `SubmitButton.vue` – кнопка отправки с лоадером и адаптивными размерами.
  - `FormCheckbox.vue`, `FormText.vue`, `ErrorMessage.vue` – базовые элементы интерфейса.
  - `HelpTooltip.vue` – иконка-подсказка (иконки `help.svg` / `help_active.svg`, всплывающий тултип).

- **`inputs/`**
  - `PriceInput.vue` – поле суммы с форматированием, валидацией диапазона (1–1 000 000₽) и поддержкой копеек.
  - `CardNumberInput.vue` – поле номера карты (форматирование, валидация по Луну).
  - `ExpireDateInput.vue` – поле срока действия карты (ММ/ГГ, парсинг и валидация).
  - `CvvInput.vue` – поле CVV/CVC с подсказкой.

- **`payment/`**
  - `PaymentFooter.vue` – футер с логотипами платёжных систем, текстом о безопасности и номером заказа.
  - `PaymentSystemsLogos.vue` – набор иконок платёжных систем (Visa, МИР, Mastercard и т.п.).

### Состояние (`src/stores/`)

Pinia-сторы:

- **`orderStore.ts`**
  - `orderData` – данные заказа (сумма, email, описание, номер заказа, дата создания).
  - `paymentStatus` – статус оплаты (`success` | `failed` | `service_error`).
  - `isPaymentPassed` – флаг прохождения шага оплаты.
  - Методы:
    - `setOrderData`, `clearOrderData`, `loadOrderDataFromStorage`,
    - `setPaymentStatus`, `getPaymentStatus`,
    - `setPaymentPassed`, `getPaymentPassed`.

- **`validationErrorsStore.ts`**
  - Хранит ошибки валидации по именам полей.
  - Методы: добавление/очистка ошибок, флаг наличия ошибок.

- **`cardDataStore.ts`**
  - Состояние, связанное с картой (например, флаг `loading` для кнопки оплаты).

### Утилиты (`src/utils/`)

- **`format/`**
  - `price.ts` – форматирование / парсинг цен с копейками (через запятую), работа с числами.
  - `cardNumber.ts`, `cvv.ts`, `expireDate.ts` – форматирование и парсинг полей карты.

- **`validation/`**
  - `validators.ts` – низкоуровневые валидаторы (карта, цена, срок действия, CVV, email).
  - `validationRules.ts` – Vue-правила (`amountRules`, `emailRules`, `descriptionRules`, `createPriceRules`, `validateOrderFormData`).
  - `messages.ts` – тексты сообщений валидации и статусов платежа.

- **`payment/`**
  - `paymentStatus.ts` – утилита `getRandomPaymentStatus` для равновероятного выбора статуса оплаты.

### Стили и ассеты

- **`styles/`**
  - `main.scss` – глобальные стили приложения.
  - `reset.scss` – сброс базовых стилей браузера.
  - `variables/` – SCSS-переменные (цвета, отступы, типографика, бордеры).
  - `mixins/responsive.scss` – миксины.

- **`assets/`**
  - `icons/` – svg-иконки (банк, платёжные системы, подсказка, замок).
  - `images/` – растровые изображения для экрана результата оплаты и логотипа банка.

## Запуск и сборка

- Установка зависимостей:

```bash
npm install
```

- Локальная разработка:

```bash
npm run dev
```

- Сборка:

```bash
npm run build
```

- Просмотр собранной версии:

```bash
npm run preview
```

- Деплой на GitHub Pages:

```bash
npm run build
npm run deploy
```

