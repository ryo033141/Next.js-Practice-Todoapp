// Next.jsでレスポンスを返すための機能をインポート
import { NextResponse } from "next/server";
/* PrismaClientをインポート
   Prismaを使ってDB操作をするためのクラス */
import { PrismaClient } from "@prisma/client";

// PrismaClientのインスタンスを生成
const prisma = new PrismaClient();

// Todo一覧取得
export async function GET() {
   try {
         // Todoテーブルから全件取得
         const todos = await prisma.todo.findMany({
            include: {
               status: true,
            },
         });
         // JSONとして返却
         return NextResponse.json(todos);
   } catch(error) {
      console.log(error);

      return NextResponse.json(
         {message: "To doの取得に失敗しました"},
         {status: 500}
      );
   };
}

// POSTリクエストを受け取る関数
// fetch('/api/tasks', { method: 'POST' }) が来ると実行される
export async function POST(request: Request) {
   try {
      // リクエストボディのJSONデータを取得
      const body = await request.json();

      // タイトルが空白の時
      if (!body.title || body.title.trim() === '') {
         return NextResponse.json(
            {
               message: 'タイトルを入力して下さい',
            },
            {
               status: 400,
            }
         );
      }

      // Prismaを使ってTodoテーブルにデータを登録
      const todo = await prisma.todo.create({
         // 登録するデータ
         data: {
            // titleカラムへ入力値を保存
            // body.title はフロントから送られてきた値
            status_id: Number(body.status_id),
            title: body.title,
            content: body.content,
         },
      });

      // JSON形式でレスポンスを返す
      return NextResponse.json(
         // 登録したデータを返す
         {
            ...todo,
            id: todo.id.toString(),
         },
         // HTTPステータスコードv
         // 201は「作成成功」
         {
            status: 201,
         }
      );
   } catch(error) {
      // サーバー側ログ確認用
      console.error(error);
      
      // エラーレスポンスを返す
      return NextResponse.json(
         // エラーメッセージ
         {
            message: '登録失敗',
         },
         // HTTPステータスコード
         // 500 はサーバーエラー
         {
            status: 500,
         }
      );
   }
}