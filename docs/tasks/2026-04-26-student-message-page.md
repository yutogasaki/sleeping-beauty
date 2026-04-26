# Student Message Page

## Objective

公開トップページには「意気込みを投稿する」導線を表示せず、生徒が直接アクセスできる専用投稿ページを用意する。

## Non-goals

- 投稿API、承認フロー、Supabaseスキーマは変更しない
- 生徒向け認証やパスワード制は今回追加しない
- 公開トップのメッセージ表示体験は大きく再設計しない

## Scope

- 公開トップの `MessagesSection`
- 生徒向け投稿ページ `/student`
- 投稿フォームUIの共通化

## Acceptance Criteria

- 公開トップのメッセージセクションに「意気込みを投稿する」ボタンが表示されない
- `/student` で意気込み投稿フォームを利用できる
- フォームは既存の `/api/messages` とバリデーションを使う
- 送信成功、入力エラー、APIエラーの表示が維持される
- デスクトップとモバイルで投稿ページが読みやすく操作できる

## Verification

- `npm run test`
- `npm run lint`
- `npm run build`
- 公開トップで投稿CTAが消えていることを確認
- `/student` をデスクトップ幅とモバイル幅で確認
- `/student` の必須入力バリデーションと送信中/成功表示を確認

## Risks and Assumptions

- `/student` はURLを知っている生徒向けのページとして扱う
- 認証が必要になった場合は別タスクで追加する
