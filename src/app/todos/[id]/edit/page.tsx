'use client';

import { handleBuildComplete } from "next/dist/build/adapter/build-complete";
// 画面遷移とURLパラメータ取得を読み込む
import { useRouter,useParams } from "next/navigation";
import { useEffect,useState } from "react";
// toastをインポート
import { toast } from "sonner";

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
  // URLからidを取得
  const params = useParams<{id: string}>();

  // タイトル入力欄用State
  const [title,setTitle] = useState("");
  // 内容入力欄用State
  const [content,setContent] = useState("");
  // ステータス用State
  const [statusId,setStatusId] = useState(1);

  // 初回表示時に実行
  useEffect(() => {
    // Todoを取得する関数を定義
    const fetchTodo = async () => {
      // APIを呼び出す
      const response = await fetch(`/api/todo/${params.id}`);
      // JSON形式で受け取る
      const data: Todo = await response.json();

      // 取得した値をStateへ設定
      setTitle(data.title);
      setContent(data.content);
      setStatusId(data.status.id);
    }

    // 関数実行
    fetchTodo();
  },[params.id]);

  // 更新ボタン押下時に実行される関数
  const handlClickUpdate = async () => {
    // タイトルが空白の時
    if(title.trim() === '') {
      // エラーメッセージを表示
      toast.error('タイトルを入力して下さい');
      return;
    }

    // APIへPUT送信
    const response = await fetch(`/api/todo/${params.id}`,{
      method: "PUT",
      // JSONを送ることを宣言
      headers: {
        "Content-Type": "application/json",
      },

      // 更新データを送信
      body: JSON.stringify({
        title,
        content,
        status_id: statusId,
      })
    })

    // JSON形式のデータを取得
    const data = await response.json();

    // 更新後はホーム画面に遷移
    router.push('/todos')
  }

  // キャンセルボタン押下時に実行される関数
  const handleClickBack = () => {
    // 詳細画面へ戻る
    router.push(`/todos/${params.id}`);
  }

  return (
    <>
      <h1 className="font-bold text-2xl ml-25 mt-8">
        タスク編集
      </h1>

      <div className="mt-10 flex flex-col items-center gap-10">
        <div className="flex items-center">
          <label
            className="text-2xl w-40 text-right"
            htmlFor="title"
          >
            タイトル
          </label>

          <input
            className="border border-black rounded-sm ml-8 w-80 h-12 px-3"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex items-start">
          <label
            className="text-2xl w-40 text-right mt-3"
            htmlFor="content"
          >
            内容
          </label>
          <textarea
            className="border border-black rounded-sm ml-8 w-80 h-20 p-3"
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="flex items-center">
          <label
            className="text-2xl w-40 text-right"
            htmlFor="status"
          >
            ステータス
          </label>
          <select
            className="border border-black rounded-sm ml-8 w-80 h-12 px-3"
            id="status"
            name="status"
            value={statusId}
            onChange={(e) => setStatusId(Number(e.target.value))}
          >
            <option 
              value={1} 
              className="text-center">
                未着手
            </option>
            <option 
              value={2}
              className="text-center">
                途中
            </option>
            <option 
              value={3}
              className="text-center">
                完了
            </option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button 
          className="bg-blue-600 text-white px-18 py-4 rounded-xl font-bold text-base cursor-pointer"
          onClick={handlClickUpdate}
        >
          保存
        </button>
      </div>

      <div className="flex justify-center mt-5 mr-240">
        <button className="text-2xl cursor-pointer" onClick={handleClickBack}>◀︎ タスク詳細画面に戻る</button>
      </div>
    </>
  )
}