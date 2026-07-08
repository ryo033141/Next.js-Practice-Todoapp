// レビュー依頼
/* PrismaClientをインポート
   Prismaを使ってDB操作をするためのクラス */
import { PrismaClient } from "@prisma/client";
// JSONレスポンスを返すための機能
import { NextResponse } from "next/server";

// PrismaClientのインスタンスを生成
const prisma = new PrismaClient();

// GET/api/todos/9のようなリクエストを受け取る
export async function GET(
    // HTTPリクエスト情報
    request: Request,
    {params}: {params: Promise<{id: string}>}
) {
    // URLからidを取得する
    const {id} = await params;
    // idに一致するTodoを検索する
    const todo = await prisma.todo.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            status: true,
        }
    });

    // TodoをJSON形式で返す
    return NextResponse.json(todo);
}

export async function PUT(
    request: Request,
    {params}: {params: Promise<{id: string}>}
) {
    // URLからidを取得
    const {id} = await params;
    // リクエストボディ(JSON)取得
    const body = await request.json();
    // 更新
    const todo = await prisma.todo.update({
        where: {
            id: Number(id),
        },
        data: {
            title: body.title,
            content: body.content,
            status_id: body.status_id,
        },
        include: {
            status: true,
        },
    })

    // TodoをJSON形式で返す
    return NextResponse.json(todo);
}

export async function DELETE (
    // HTTPリクエスト情報
    request: Request,
    // URLの[id]部分を受け取る
    {params}: {params: Promise<{id: string}>}
) {
    // URLからidを取得する
    const {id} = await params;
    // 指定されたidのTodoを削除する
    const deletedTodo = await prisma.todo.delete({
        // 削除対象を指定する条件
        where: {
            // URLから取得したidを数値型に変換して指定
            id: Number(id),
        },
    });

    // 削除したTodo情報をJSON形式で返す
    return NextResponse.json(deletedTodo);
}

