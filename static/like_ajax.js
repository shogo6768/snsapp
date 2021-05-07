$(document).ready(function (event) {
  // like-btnを押した時の挙動を定義
  $('.like-btn').on('click', function (event) {

    // like-btnはaタグで、そのデフォルトの挙動（リダイレクト）を阻止しておく（like-detailとlike-homeを分けない対策）
    event.preventDefault();

    // 後で使うので変数化
    var article_id = $(this).attr('name');
    var prev_likes = parseInt($(this).attr('value'));

    // 非同期処理を定義
    $.ajax({
      type: 'GET',                      // GETで処理を実行
      url: '/like-home/' + article_id,  // like-homeのメソッドを実行　⇨　裏では押すたびに処理が走る
      // リダイレクト先が異なるだけだから、簡略化のためにlike-detailでもこちらを使用

      // フロントエンドだけ辻褄が合う様に変更しておく
      success: function () {
        // クリックされたlike-btnセレクタを取得
        selector = $(`.like-btn[name=${article_id}]`);

        // もしlikeが存在していたら、ボタンエフェクトをlike解除
        if (selector.children().hasClass('add-color')) {
          $(selector).html("<i class='fas fa-heart'></i>");           // アイコン変更
          $(selector).append(prev_likes - 1);                         // いいね数更新
          $(selector).attr('value', prev_likes - 1);                  // DOMに埋め込むいいね数の更新
        }

        // もしlikeが存在していなかったら、ボタンエフェクトをlike登録
        else {
          $(selector).html("<i class='fas fa-heart add-color'></i>"); // アイコン変更
          $(selector).append(prev_likes + 1);                         // いいね数更新
          $(selector).attr('value', prev_likes + 1);                  // DOMに埋め込むいいね数の更新
        }
      }
    });
  });
});
