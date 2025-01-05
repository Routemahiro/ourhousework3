# Docker操作手順書

## 1. 開発開始時の手順

### 1.1 初回セットアップ
以下のコマンドを順番に実行します：

    # プロジェクトのディレクトリに移動
    cd housework-manager

    # Dockerコンテナの起動
    docker-compose up -d

    # コンテナの起動確認
    docker-compose ps

### 1.2 データベースの準備
以下のコマンドを実行してデータベースを初期化します：

    # Prismaマイグレーションの実行
    npx prisma migrate dev

    # （必要な場合）初期データの投入
    npx prisma db seed

## 2. 日常的な操作

### 2.1 開発開始時
毎日の開発開始時に実行するコマンド：

    # Dockerコンテナの起動
    docker-compose up -d

    # 起動確認（STATUSがhealthyになっていることを確認）
    docker-compose ps

### 2.2 開発中のログ確認
必要に応じて以下のコマンドでログを確認できます：

    # 全てのコンテナのログを表示
    docker-compose logs -f

    # PostgreSQLのログのみ表示
    docker-compose logs -f postgres

    # Redisのログのみ表示
    docker-compose logs -f redis

### 2.3 開発終了時
開発終了時は以下のコマンドでコンテナを停止します：

    # コンテナの停止（データは保持されます）
    docker-compose down

## 3. トラブルシューティング

### 3.1 コンテナの再起動
問題が発生した場合は、以下のコマンドでコンテナを再起動できます：

    # 特定のコンテナの再起動（postgresの場合）
    docker-compose restart postgres

    # 全てのコンテナの再起動
    docker-compose restart

### 3.2 データベースのリセット
データベースをクリーンな状態に戻したい場合：

    # コンテナの停止とボリュームの削除
    docker-compose down -v

    # コンテナの再作成と起動
    docker-compose up -d

    # マイグレーションの再実行
    npx prisma migrate reset --force

### 3.3 コンテナの状態確認
コンテナの状態は以下のコマンドで確認できます：

    # コンテナの状態確認
    docker-compose ps

    # コンテナの詳細情報確認
    docker-compose ps -a

    # 使用中のポート確認
    docker-compose ports

## 4. 注意事項
- コンテナ起動後、データベースの準備が完了するまで数秒かかります
- `docker-compose down -v` を実行するとデータが全て削除されます
- ポート番号（5432, 6379）が他のアプリケーションと競合する場合は、`docker-compose.yml`で変更してください
- M1 Macの場合、必要に応じて`platform: linux/amd64`の設定を追加してください

## 5. 便利なコマンド集
データベースへの直接アクセスが必要な場合は以下のコマンドが使えます：

    # コンテナ内のPostgreSQLに接続
    docker-compose exec postgres psql -U postgres -d housework_db

    # コンテナ内のRedisに接続
    docker-compose exec redis redis-cli

    # 使用していないDockerリソースの削除
    docker system prune
</rewritten_file>