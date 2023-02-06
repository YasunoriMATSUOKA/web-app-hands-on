# Windows等でのgitのCRLF<->LF変換の設定
git config --global core.autocrlf input

# Node.jsのインストールをvoltaで行う
curl https://get.volta.sh | bash
volta install node@18
node -v
npm -v

# Angular CLIインストール
npm i -g @angular/cli

# Angularプロジェクト作成(空)
ng new web-app-hands-on --create-application=false --inline-style=true --inline-template=true --routing=true --strict=true --style=scss
cd web-app-hands-on

# ESLint
ng add @angular-eslint/schematics

# web(ユーザー向けWebアプリ), admin(管理者向けWebアプリ), lp(ランディングページ)の3種類のアプリのひな形を作成
ng generate application web --routing=true --style=scss --inline-style --inline-template
ng generate application admin --routing=true --style=scss --inline-style --inline-template
ng generate application lp --routing=true --style=scss --inline-style --inline-template

# prettier
npm i -D prettier eslint-config-prettier @typescript-eslint/eslint-plugin

# .vscode/settings.jsonを作成して以下のように
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.workingDirectories": [{ "mode": "auto" }]
}

# .vscode/extensions.jsonへ追記して以下のように
{
  "recommendations": [
    "angular.ng-template",
    "editorconfig.editorconfig",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode"
  ]
}
# もしこれらのVSCodeの拡張機能を未インストールの場合はインストールしておく。

# Cypress
ng add @cypress/schematic

# angular.jsonのcypress.config.jsをcypress.config.tsに変更

# projects/web/cypress.config.tsのe2eに以下を追加
supportFile: 'projects/web/cypress/support/e2e.ts',
specPattern: 'projects/web/cypress/e2e/**/*.cy.ts',

# projects/admin/cypress.config.tsのe2eに以下を追加
supportFile: 'projects/admin/cypress/support/e2e.ts',
specPattern: 'projects/admin/cypress/e2e/**/*.cy.ts',

# projects/lp/cypress.config.tsのe2eに以下を追加
supportFile: 'projects/lp/cypress/support/e2e.ts',
specPattern: 'projects/lp/cypress/e2e/**/*.cy.ts',

# .gitignoreにCypress向けに以下を追記
# Cypress
cypress/videos/*
cypress/screenshots/*

# package.jsonのnpm scriptsに以下を追加
"start:web": "ng serve --project=web",
"build:web": "ng build --project=web --configuration=production",
"watch:web": "ng build --project=web --watch --configuration development",
"test:web": "ng test --project=web",
"e2e:web": "ng run web:cypress-open",
"e2e:web:ci": "ng run web:cypress-run",
"lint:web": "ng lint --project=web",
"start:admin": "ng serve --project=admin",
"build:admin": "ng build --project=admin --configuration=production",
"watch:admin": "ng build --project=admin --watch --configuration development",
"test:admin": "ng test --project=admin",
"e2e:admin": "ng run admin:cypress-open",
"e2e:admin:ci": "ng run admin:cypress-run",
"lint:admin": "ng lint --project=admin",
"start:lp": "ng serve --project=lp",
"build:lp": "ng build --project=lp --configuration=production",
"watch:lp": "ng build --project=lp --watch --configuration development",
"test:lp": "ng test --project=lp",
"e2e:lp": "ng run lp:cypress-open",
"e2e:lp:ci": "ng run lp:cypress-run",
"lint:lp": "ng lint --project=lp"

# GitHubにレポジトリを作成してGitHubの表示内容に沿って初期コードをプッシュ
# 最低限のセキュリティ設定としてブランチプロテクションルールを設定する

# Firebaseのプロジェクトを作成(web-app-hands-on-<自由な名前>-test, web-app-hands-on-<自由な名前>)
# Blazeプランにアップグレード
# Storageをセキュリティルールを本番環境ルールでasia-northeast1ではじめる
# FirestoreをDatastoreモードからネイティブモードに切り替えて(セキュリティルールを本番環境ルールで)はじめる

# Firebase CLIのインストール
npm i -D firebase-tools
npx firebase --version

# Firebase CLIでログイン
npx firebase login

# プロジェクト初期化 ... Realtime Database以外すべて選択
npx firebase init

# Firebase Functions
# index.ts内のコメントアウトされた実装箇所を有効化
# ESLintのルールを整備
cd ./functions
npm uninstall eslint-config-google
npm i -D eslint-config-prettier
# .eslintrc.json
extendsから`"google"`を削除してextendsの最後に`,"prettier"`を追加
`quotes: ["error", "double"],`を`quotes: ["error", "single"],`に変更
# functions/tsconfig.jsonのcompilerOptionsに以下を追加
"skipLibCheck": true,

# functionsのテストをJestで環境構築
cd ./functions
npm i -D ts-jest @types/jest jest
`./functions/src/index.spec.ts`ファイルにダミーのテストコードを書いて`npx jest`を実行してテストが走るか確認しておく

# web-app-hands-on-<自由な名前>-test, web-app-hands-on-<自由な名前>というプロジェクトそれぞれにtestnet, mainnetというalias名をプロジェクトの名前として設定する
npx firebase use --add
# コマンドを実行後、インタラクティブにプロジェクトの選択と、alias名の入力を求められるのでそれぞれ実行する

# CI/CD構築 GitHub Actionsのymlファイルを作成

# GitHub ActionsのEnvironmentsにtestnet, mainnetの2種類のEnvironmentを作成

# FIREBASE_TOKENを取得してGitHubのEnvironmentのSecretsに登録
npx firebase use testnet
npx firebase login:ci
# 生成されたトークンをGitHubのEnvironmentがtestnetのSecretsに登録

npx firebase use mainnet
npx firebase login:ci
# 生成されたトークンをGitHubのEnvironmentがmainnetのSecretsに登録
