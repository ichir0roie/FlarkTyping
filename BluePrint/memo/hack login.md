# login機能の場当たり的な実装

+ 参考サイト
  + [認証まとめ](https://coders-shelf.com/react-auth-problem/)

## 場当たり的な実装

+ 必要なパラメータ
  + ユーザーネーム
    + ビジブル
    + 公開
    + 自動入力
  + パスワード
    + インビジブル
    + 非公開
    + 自動入力

以上のデータをローカルストレージで扱い、データはサーバに保存する。  
→かんたんなデータベースを作成する必要くらいはあるか。

## 理想的な実装方法

外部ライブラリを使用した実装  
認証周りは外部ライブラリにまかせるべき
