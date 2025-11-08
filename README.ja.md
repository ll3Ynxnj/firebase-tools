# Firebase Tools

[🇺🇸 English](./README.md)

Firebase/Firestoreの管理・閲覧ツール集

## セットアップ

```bash
# 依存関係のインストール
npm install

# システムへインストール
./deploy.sh
```

インストール方法: `npm link`（グローバルシンボリックリンク）

**注意**: npmのグローバルbinディレクトリがPATHに含まれていることを確認してください。

## 使用方法

### browse-firestore

任意のFirestoreコレクションを閲覧するツール

```bash
# 基本的な使い方
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json \
  browse-firestore [collection] [limit]

# 例：productsコレクションから10件取得
GOOGLE_APPLICATION_CREDENTIALS=~/.firebase_keys/lipass-dev-*.json \
  browse-firestore products 10

# 例：metadataコレクション全体を取得
browse-firestore metadata 1

# 例：insurersコレクションから5件取得
browse-firestore insurers 5

# ヘルプ表示
browse-firestore --help
```

**引数：**
- `collection` - コレクションパス（デフォルト: products）
- `limit` - 取得件数（デフォルト: 10）

## 環境変数

### GOOGLE_APPLICATION_CREDENTIALS

Firebaseサービスアカウントキーファイルへのパスを指定します。

**設定例（direnv使用）：**
```bash
# .envrc
export GOOGLE_APPLICATION_CREDENTIALS="${HOME}/.firebase_keys/lipass-dev-firebase-adminsdk-*.json"
```

**コマンドライン指定：**
```bash
GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json browse-firestore products
```

## 開発

このツールは完全に汎用的で、任意のFirebaseプロジェクトで使用できます。
異なるプロジェクトを参照する場合は、該当するサービスアカウントキーを指定してください。

### ディレクトリ構成

```
~/03_Projects/900_Tools/01_Firebase/
├── src/                    # ソースコード（開発用）
│   └── browse-firestore.js
├── node_modules/           # 依存関係
├── deploy.sh               # システムへのデプロイスクリプト
├── package.json
├── README.md               # 英語版ドキュメント
├── README.ja.md            # 日本語版ドキュメント
└── .gitignore
```

### リリースプロセス

バージョンアップとデプロイは自動化されています：

```bash
# パッチバージョンアップ（1.0.0 → 1.0.1）
npm version patch -m "Release v%s"

# マイナーバージョンアップ（1.0.0 → 1.1.0）
npm version minor -m "Release v%s"

# メジャーバージョンアップ（1.0.0 → 2.0.0）
npm version major -m "Release v%s"
```

**自動で実行されること**：
1. package.jsonのバージョン更新
2. gitコミット作成
3. gitタグ作成
4. リモートリポジトリへプッシュ（コミット＋タグ）
5. `npm link`によるグローバルインストール

## ライセンス

MIT
