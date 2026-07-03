'use client';

// 画面遷移を行うための機能をNext.jsのパッケージから読み込む
import { useRouter } from "next/navigation";
import {useEffect, useState } from "react";

// Todo型を定義
type Todo = {
  id: number;
  title: string;
  content: string;
  status: {
    id: number;
    name: string;
  };
}

export default function Page() {
  // 画面遷移を実行するための「ルーターオブジェクト」を作成
  const router = useRouter();
  // Todo一覧を保持するstateを定義
  const [todo,setTodo] = useState<Todo[]>([]);

  // コンポーネントが初回表示された時に実行
  useEffect(() => {
    // Todo一覧を取得する非同期関数を定義
    async function fetchTodos() {
      // Route HandlerへGETリクエストを送信
      const response = await fetch('api/todo');
      // レスポンスのJSONをJavaScriptオブジェクトへ変換
      const data = await response.json();
      // 取得したTodo一覧をstateへ保存
      // state更新後に再描画される
      setTodo(data);
    }

    // 関数を実行してTodo一覧を取得
    fetchTodos();
  },[]); // 空配列[]のため初回表示時のみ実行

  // 新規作成ボタンがクリックされた時に実行する処理を作成
  const handleClick_Create = () => {
    // 指定したいURLに画面を切り替える
    router.push('/todos/create');
  }

  // 詳細ボタンがクリックされた時に実行する処理を作成
  const handleClick_Detail = (id: number) => {
    // 指定したいURLに画面を切り替える
    router.push(`/todos/${id}`);
  }

  return (
    <div className="mt-5">
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-9 py-3 rounded-xl font-bold mr-20 cursor-pointer" onClick={handleClick_Create}>
          新規作成
        </button>
      </div>

      <table className="table-auto w-full ">
        <thead>
          <tr>
            <th className="text-left px-4 py-4 text-2xl font-bold pl-10">
              タイトル
            </th>
            <th className="text-left px-4 py-4 text-2xl font-bold">
              内容
            </th>
            <th className="text-left px-4 py-4 text-2xl font-bold">
              ステータス
            </th>
          </tr>
        </thead>

        <tbody>
          {todo.map((todo,index) => (
            <tr key={todo.id}
                className={index % 2 === 0 ? "bg-gray-300" : ''}
            >
              <td className="px-4 py-4 text-xl pl-10">
                {todo.title}
              </td>
              <td className="px-4 py-4 text-xl">
                {todo.content}
              </td>
              <td className="px-4 py-4 text-xl">
                {todo.status.name}
              </td>
              <td>
                <button className="bg-green-500 text-white px-9 py-2 rounded-xl font-bold cursor-pointer" onClick={() => handleClick_Detail(todo.id)}>
                  詳細
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}