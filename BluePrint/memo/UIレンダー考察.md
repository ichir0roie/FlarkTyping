# レンダー

## UI構成

ログイン機能とゲーム部分が表示される部分を一致させるとすると、
問題点としてはログインボタン押下時のレンダー実行、画面更新

## UIリスト

+ メイン
  + ヘッダー
  + ゲーム
    + ボディ
    + メニュー
  + ログイン

## UI詳細

### メイン

全体のUIを含む。
グローバルや受け渡しの値はここでやれば良いのでは？

+ params
  + loginInfo
  + quesId
+ method
  + update

### ヘッダー

基本的に固定

### ゲーム

ゲームプレイを扱う

+ params
  + quesId
  + loginInfo

### ボディ

ゲームプレイに関するUIを設定

### メニュー

問題の変更やログインなどを調整

+ params
  + quesIds
+ returns
  + quesId

### ログイン

ログイン

+ return
  + loginInfo
