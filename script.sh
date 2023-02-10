# Windows等でのgitのCRLF<->LF変換の設定
git config --global core.autocrlf input

# もしまだNode.jsがインストールされていなかったらNode.jsのインストールが必要
# voltaで行う手順を参考に示しておきます。既に別の方法でインストール済等の場合はこの操作は不要です。(もしvoltaを試したい場合は、既にインストール済のNode.jsをきれいにアンインストールしてから試しましょう。)
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

# .prettierrc.jsonを作成して以下のように(内容は一例。お好みで。)
{
  "printWidth": 120,
  "singleQuote": true,
}

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

# ESLintがAngularのJasmine向けのtsconfig.spec.jsonを認識できていないようで、AngularのJasmineのspec.tsファイル内のexpect等がESLintを通じてJasmineではなくCypressのChaiのexpectとして型推論されてしまう問題がある
# projects/admin, projects/lp, projects/webの各ディレクトリのtsconfig.spec.jsonをコピーしてtsconfig.jsonファイルを作り、
# そのファイルのextends元を同ディレクトリのtsconfig.app.jsonにしてやることでESLintが適切なAngularのbuild, (Jasmineを使った)test双方に有効な型推論を行えるようにする

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

# 各プロジェクト毎に生成されたcypressディレクトリ直下のtsconfigの参照先tsconfigファイルのファイル名を正しいものに修正

# Cypressのデフォルトのコードで以下のLintエラーが出るので
# Linting "admin"...
# C:\Users\yasun\src\github.com\nemtus\web-app-hands-on\projects\admin\cypress\support\component.ts
#   29:3  error  ES2015 module syntax is preferred over namespaces  @typescript-eslint/no-namespace
# 各プロジェクトのcypressのディレクトリに`.eslintrc.json`を作成し、以下のように記述
{
  "extends": "../../../.eslintrc.json",
  "rules": {
    "@typescript-eslint/no-namespace": "off"
  }
}

# .gitignoreにCypress向けに以下を追記
# Cypress
cypress/videos/*
cypress/screenshots/*

# package.jsonのnpm scriptsに以下を追加
"start:web": "ng serve --project=web",
"build:web": "ng build --project=web --configuration=production",
"watch:web": "ng build --project=web --watch --configuration development",
"test:web": "ng test --project=web --code-coverage",
"test:web:ci": "ng test --project=web --browsers=ChromeHeadless --no-watch --no-progress --code-coverage",
"e2e:web": "ng run web:cypress-open",
"e2e:web:ci": "ng run web:cypress-run",
"lint:web": "ng lint --project=web",
"start:admin": "ng serve --project=admin",
"build:admin": "ng build --project=admin --configuration=production",
"watch:admin": "ng build --project=admin --watch --configuration development",
"test:admin": "ng test --project=admin",
"test:admin:ci": "ng test --project=admin --browsers=ChromeHeadless --no-watch --no-progress --code-coverage",
"e2e:admin": "ng run admin:cypress-open",
"e2e:admin:ci": "ng run admin:cypress-run",
"lint:admin": "ng lint --project=admin",
"start:lp": "ng serve --project=lp",
"build:lp": "ng build --project=lp --configuration=production",
"watch:lp": "ng build --project=lp --watch --configuration development",
"test:lp": "ng test --project=lp",
"test:lp:ci": "ng test --project=lp --browsers=ChromeHeadless --no-watch --no-progress --code-coverage",
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

# project=webのCI/CDを一通り試す

# admin, lpのサイトのデプロイのためのCDや設定( 参考リンク: https://qiita.com/zaburo/items/f0fc863d1eb24cfe5cca )
# FirebaseのWeb ConsoleのFirebase Hostingの画面(下の方)からlp, admin用の別サイトを登録し、ターミナルからCLIでtargetを指定
testnet
既に登録済のWebアプリ web-app-hands-on-<自由な名前>-test
新たに登録する管理者用Webアプリ admin-web-app-hands-on-<自由な名前>-test
新たに登録するLP用Webアプリ lp-web-app-hands-on-<自由な名前>-test

以下コマンド実行
npx firebase use testnet
npx firebase target:apply hosting web web-app-hands-on-<自由な名前>-test
npx firebase target:apply hosting admin admin-web-app-hands-on-<自由な名前>-test
npx firebase target:apply hosting lp lp-web-app-hands-on-<自由な名前>-test

mainnet
既に登録済のWebアプリ web-app-hands-on-<自由な名前>
新たに登録する管理者用Webアプリ admin-web-app-hands-on-<自由な名前>
新たに登録するLP用Webアプリ lp-web-app-hands-on-<自由な名前>

以下コマンド実行
npx firebase use mainnet
npx firebase target:apply hosting web web-app-hands-on-<自由な名前>
npx firebase target:apply hosting admin admin-web-app-hands-on-<自由な名前>
npx firebase target:apply hosting lp lp-web-app-hands-on-<自由な名前>

# .firebasercのprojectとtargetの対応関係が意図通り設定されているか確認し、不適切な場合は修正

# firebase.jsonのhostingに設定したtargetに関する設定を追加 ... この手動対応が必要だが忘れやすいので注意。

# CI追加 ... GitHub Actionsのymlファイルを追加して、testnet, mainnetそれぞれのweb, admin, lpそれぞれのwebアプリのビルド、ユニットテスト、E2Eテスト

# Testing Library
# https://testing-library.com/docs/angular-testing-library/intro
npm i -D @testing-library/angular

# rootコンポーネントをStandalone component化
# routingをapp.routes.tsに集約
# Standalone componentにあわせたmain.tsでのアプリケーションのbootstrap

# /projects/admin/src/app/pages/home/home.component.ts, home.component.spec.tsファイルの生成
ng generate component pages/home --project=admin --prefix=app-page --standalone --inline-template --inline-style
# 他プロジェクトでも同様に

# /projects/admin/src/app/app/app.component.spec.tsをtesting-libraryを使用して簡略化
# /projects/admin/src/app/pages/home/home.component.spec.tsをtesting-libraryを使用して簡略化

# 実装
ng generate component views/home --project=web --prefix=app-view --standalone --inline-template --inline-style
ng generate component pages/users/user --project=web --prefix=app-page --standalone --inline-template --inline-style
ng generate component views/users/user --project=web --prefix=app-view --standalone --inline-template --inline-style
ng generate class services/user/user --project=web --type=model
ng generate service services/user/user --project=web
ng generate service services/user/user-infrastructure --project=web
# 手動でprojects/web/src/app/services/user/user.mock.tsを作成
