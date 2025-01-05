# ER図

:::mermaid
erDiagram
    users ||--o{ houseworks : creates
    users ||--o{ housework_histories : executes
    houseworks ||--o{ housework_schedules : has
    houseworks ||--o{ housework_images : has
    houseworks ||--o{ housework_histories : records

    users {
        uuid id PK
        varchar(255) email
        varchar(255) password_hash
        varchar(50) name
        varchar(255) google_id
        timestamp created_at
        timestamp updated_at
    }

    houseworks {
        uuid id PK
        uuid user_id FK
        varchar(100) title
        text description
        text steps
        interval estimated_time
        varchar(20) type
        timestamp created_at
        timestamp updated_at
    }

    housework_schedules {
        uuid id PK
        uuid housework_id FK
        varchar(20) repeat_type
        jsonb repeat_value
        time start_time
        timestamp last_executed_at
        timestamp next_execution_at
        timestamp created_at
        timestamp updated_at
    }

    housework_images {
        uuid id PK
        uuid housework_id FK
        varchar(255) image_url
        varchar(10) image_type
        smallint order_num
        varchar(255) description
        timestamp created_at
    }

    housework_histories {
        uuid id PK
        uuid housework_id FK
        uuid user_id FK
        timestamp completed_at
        varchar(20) status
        timestamp created_at
    }
:::

## エンティティ説明

1. users（ユーザー）
   - システムのユーザー情報を管理
   - メールアドレスとパスワード、またはGoogle認証でログイン可能
   - ユーザー名は任意設定

2. houseworks（家事）
   - 家事の基本情報を管理
   - タイトル、説明文、手順、予想実行時間を保持
   - 作成者（user_id）との関連を持つ

3. housework_schedules（家事スケジュール）
   - 定期的な家事の実行スケジュールを管理
   - 繰り返し設定はrepeat_typeとrepeat_valueで柔軟に対応
   - 開始時刻を指定可能

4. housework_images（家事画像）
   - 家事に関連する画像を管理
   - メイン画像と最大3枚のサブ画像をサポ���ト
   - 画像の表示順序を管理

5. housework_histories（家事履歴）
   - 家事の実行履歴を記録
   - 実行者と完了状態を管理
   - タイムスタンプで実行時刻を記録

## リレーションシップ説明

1. users - houseworks
   - ユーザーは0以上の家事を作成できる（1:N）

2. users - housework_histories
   - ユーザーは0以上の家事履歴を持つ（1:N）

3. houseworks - housework_schedules
   - 家事は0または1つのスケジュールを持つ（1:0..1）

4. houseworks - housework_images
   - 家事は1以上の画像を持つ（1:N）

5. houseworks - housework_histories
   - 家事は0以上の実行履歴を持つ（1:N） 