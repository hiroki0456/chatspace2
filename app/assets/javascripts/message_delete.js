$(function(){
  $(document).on('click','.fa-trash-alt', function(){
    lastTextelement = $('.main-bar__middle__box:last').children()[1];
    groupId = $(".main-bar__header__group__group-name").attr('id');
    let result = window.confirm('このメッセージを削除しますか');

    if(result){
      //クリックされたメッセージを取得
      let clickElement = $(this).parents()[2];
      let rmMessageId = $(clickElement).attr("data-message-id");
      let userId = $(clickElement).attr("id");

      $.ajax({
        url: `messages/${rmMessageId}`,
        type: "delete",
        data: {message_id: rmMessageId, user_id: userId},
        dataType: 'json'
      })

      .done(function(){
        //messageの削除
        $(clickElement).remove();
        lastTextElement = $('.main-bar__middle__box:last').children()[1];
        if(lastTextelement != lastTextElement){
        lastText = $(lastTextElement).text();
        $('#' + groupId).html(lastText);
        }
        window.alert('削除に成功しました。');
      });
    }else{
    }
  })
})