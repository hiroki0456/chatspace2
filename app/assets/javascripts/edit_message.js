$(function(){
  // 編集アイコンがクリックされたときにイベント発火
  $(document).on('click','.main-bar__middle__box__upper-info__icon__edit', function(){
    // クリックされた親要素とメッセージのIdを取得する
    const parent = $(this).parents()[2];
    const messageId = $(parent).data('message-id');

    $.ajax({
      url: `messages/${messageId}/edit`,
      type: 'get',
      data: {message_id: messageId},
      dataType: 'json'
    })
    .done(function(message){
      // ajaxで編集するためのメッセージデータを受け取る
      // メッセージのinputに編集メッセージを表示する
      $('.main-bar__footer__form-input__text').attr("value",`${message.content}`)
      // 送信ボタンがクリックされたときのアクション先を変更する
      $('input[value="✓"]').after('<input id="delete" type="hidden" name="_method" value="patch"></input>')
      $('#new_message').attr('action', `/groups/11/messages/${message.id}`)
    })
  })
})