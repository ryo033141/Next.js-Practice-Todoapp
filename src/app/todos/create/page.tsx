// レビュー依頼
'use client';

import { useState } from "react";
// 画面遷移を行うための機能をNext.jsのパッケージから読み込む
import { useRouter } from "next/navigation";
// toastをインポート
import { toast } from "sonner";

export default function Page() {
  // 入力値を管理するstateを定義
  const [title,setTitle] = useState('');
  // 内容を管理するstateを定義
  const [content,setContent] = useState('');
  // ステータスを管理するstateを定義
  const [statusId,setStatusId] = useState('1');

  // 画面遷移を実行するための「ルーターオブジェクト」を作成
  const router = useRouter();  

  // 作成ボタン押下時の処理
  const handleCreate = async () => {
    // タイトルが空白の時
    if(title.trim() === '') {
      // エラーメッセージを表示
      toast.error('タイトルを入力して下さい');
      return;
    }

    // APIを呼び出す
    const response = await fetch('/api/todo',{
      // HTTPメソッド
      method: 'POST',
      // JSONデータを送る設定
      headers: {
        'Content-Type': 'application/json',
      },

      // サーバーへ送るデータ
      body: JSON.stringify({
        // 入力値
        title: title,
        content: content,
        status_id: statusId,
      }),
    });

    // APIレスポンスを取得
    const data = await response.json();
    // コンソール確認用
    console.log(data);
    // 入力欄を初期化
    setTitle('');
    setContent('');
    setStatusId('1');

    // レスポンスがOKじゃない時
    if(!response.ok) {
      alert("登録失敗");
      return;
    }

    // ホーム画面に遷移
    router.push('/todos');
  }

  // ホームへ戻るボタンが押された時に実行する処理
  const handleClickBack = () => {
    // 指定したいURLに画面を切り替える
    router.push('/todos');
  }

  return (
    <>
      <h1 className="font-bold text-2xl ml-25 mt-8">
        新規作成
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
            name="status_id"
            value={statusId}
            onChange={(e) => setStatusId(e.target.value)}
          >
            <option 
              value="1" 
              className="text-center">
                未着手
            </option>
            <option 
              value="2"
              className="text-center">
                途中
            </option>
            <option 
              value="3"
              className="text-center">
                完了
            </option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-blue-600 text-white px-18 py-4 rounded-xl font-bold text-base cursor-pointer"
        onClick={handleCreate}>
          作成
        </button>
      </div>

      <div className="flex justify-center mt-5 mr-270">
        <button className="text-2xl cursor-pointer" onClick={handleClickBack}>◀︎ ホームへ戻る</button>
      </div>
    </>
  )
}