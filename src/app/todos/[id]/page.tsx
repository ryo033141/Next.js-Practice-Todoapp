// レビュー依頼
'use client';

// 画面遷移を行うための機能をNext.jsのパッケージから読み込む
import { useRouter } from "next/navigation";
// Next.jsのApp RouterからuseParamsを読み込む
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";

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
  // URL のパラメータを取得する
  const params = useParams<{id: string}>();
  // APIから取得したTodoを保存するState
  const [todo,setTodo] = useState<Todo | null>(null);

  // 画面表示時に実行
  useEffect(() => {
    // Todoを1件取得する関数
    const fetchTodo = async () => {
      // APIを呼び出す
      const response = await fetch(`/api/todo/${params.id}`);
      // JSON形式で受け取る
      const data = await response.json();
      console.log(data);
      // useSateに保存
      setTodo(data);
    }

    // Todoを1件取得する関数を呼び出す
    fetchTodo();
  },[params.id]);

  // 編集ボタンがクリックされた時に実行する処理を作成
  const handleClick_Update = (id: number) => {
    // 指定したいURLに画面を切り替える
    router.push(`/todos/${id}/edit`);
  }

  // 削除ボタンが押された時に実行
  const handleClickDelete = async () => {
    // 本当に削除するか確認する
    const result = confirm("このタスクを削除しますか？");
    // キャンセルが押された場合
    if(!result) {
      return;
    }

    // DELETE APIを呼び出す
    const response = await fetch(`/api/todo/${params.id}`, {
      method: "DELETE",
    });

    // APIが失敗した場合
    if(!response.ok) {
      alert("削除に失敗しました");
      return;
    }

    // 一覧画面へ戻る
    router.push("/todos");
  }

  // ホームへ戻るボタンが押された時に実行する処理
  const handleClickBack = () => {
    // 指定したいURLに画面を切り替える
    router.push('/todos');
  }

  // データ取得後
  if(!todo) {
    return <div>読み込み中...</div>
  }

  return (
    <>
      <h1 className="font-bold text-2xl ml-25 mt-8">
        タスク詳細
      </h1>

      <div className="mt-10 flex flex-col items-center gap-10">
        <div className="flex items-center">
          <label
            className="text-2xl w-40 text-right"
          >
            タイトル
          </label>
          <p className="ml-8 w-80 h-12 px-3 text-2xl flex items-center">
            {todo.title}
         </p>
        </div>

        <div className="flex items-start">
          <label
            className="text-2xl w-40 text-right mt-6"
          >
            内容
          </label>
          <p className="ml-8 w-80 h-20 p-3 text-2xl flex items-center">
            {todo.content}</p>
        </div>

        <div className="flex items-center">
          <label
            className="text-2xl w-40 text-right mt-0.5"
          >
            ステータス
          </label>
          <p className="ml-8 w-80 h-12 px-3 text-2xl flex items-center">{todo.status.name}</p>
        </div>
      </div>

      <div className="flex justify-center mt-10 gap-10">
        <button className="bg-green-500 text-white px-18 py-4 rounded-xl font-bold text-base cursor-pointer"
        onClick={() => handleClick_Update(todo.id)}>
          編集
        </button>
        <button className="bg-red-600 text-white px-18 py-4 rounded-xl font-bold ltext-base cursor-pointer" onClick={handleClickDelete}>
          削除
        </button>
      </div>

      <div className="flex justify-center mt-5 mr-270">
        <button className="text-2xl cursor-pointer" onClick={handleClickBack}>
          ◀︎ ホームへ戻る
        </button>
      </div>
    </>
  );
}