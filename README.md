# pramana-prototype

## これは

web開発向け量子計算フレームワーク「pramana」の試験実装です。

## 本ライブラリについて

試験実装版です。公開に含まれるべきでないコメント・URLなどが含まれていないことを確認した後に公開版を作成してください。

## ビルド方法

本ライブラリは[jsqubits.d.ts](https://github.com/m-qgame/jsqubits.d.ts)に依存しています。
jsqubits.d.tsを `git clone` し、ビルドした後、 `npm link` を実行してください。
その後、jsqubits.d.tsディレクトリの階層で以下のコマンドを実行してください。

```
git clone git@github.com:m-qgame/pramana-prototype.git
npm link jsqubits.d.ts
npm install
npm run build
```

## 支援

本リポジトリの開発は、以下の組織の支援を受けています。

[2018年度未踏ターゲット事業（ゲート式量子コンピュータ部門）](https://www.ipa.go.jp/jinzai/target/2018/koubo2_index.html)

This software is supported by IPA Mitou Target Project 2018 (Category: quantum logic gate).
See the abstract [here](https://www.ipa.go.jp/jinzai/target/2018/koubo2_index.html) (written in Japanese).
