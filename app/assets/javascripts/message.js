$(function() {

  function messagebuild(message){
    if(message.image){
      var html =`<div class="side-bar__footer__group__message-name">
    画像が投稿されています
    </div>`
    }else {
      var html =`<div class="side-bar__footer__group__message-name">
    ${message.content}
    </div>`
  }
    return html
  }
  function buildHTML(message){
    if (message.content && message.image){
    var html = `<div class="main-bar__middle__box" data-message-id="${message.id}>
    <div class="main-bar__middle__box__upper-info">
    <p class="main-bar__middle__box__upper-info__name">
    ${message.user_name}
    </p>
    <p class="main-bar__middle__box__upper-info__date">
    ${message.created_at}
    </p>
    </div>
    <div class="main-bar__middle__box__text">
    ${message.content}<br>
    <img src=${message.image} class="main-bar__middle__box__image"
    </div>
    </div>`
  }else if (message.content){
    var html = `<div class="main-bar__middle__box" data-message-id="${message.id}>
    <div class="main-bar__middle__box__upper-info">
    <p class="main-bar__middle__box__upper-info__name">
    ${message.user_name}
    </p>
    <p class="main-bar__middle__box__upper-info__date">
    ${message.created_at}
    </p>
    </div>
    <div class="main-bar__middle__box__text">
    ${message.content}
    </div>
    </div>`
  } else if (message.image){
    var html = `<div class="main-bar__middle__box" data-message-id="${message.id}>
    <div class="main-bar__middle__box__upper-info">
    <p class="main-bar__middle__box__upper-info__name">
    ${message.user_name}
    </p>
    <p class="main-bar__middle__box__upper-info__date">
    ${message.created_at}
    </p>
    </div>
    <div class="main-bar__middle__box__text">
    <img src=${message.image} class="main-bar__middle__box__image"
    </div>
    </div>`
  };
  return html;
  }

  $("#new_message").on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      let message = messagebuild(data);
      $(".side-bar__footer__group__message-name").remove();
      $("#message").after(message);
      $('.main-bar__middle').append(html);
      $('form')[0].reset();
      $('.main-bar__middle').animate({ scrollTop: $('.main-bar__middle')[0].scrollHeight});
    })
    .always(function(){
      $(".main-bar__footer__form-input__submit").prop('disabled', false);
    })
    .fail(function(){
      alert('送信に失敗しました');
    })
  });
  let reloadMessages = function(){
    let last_message_id = $('.main-bar__middle__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if (messages.length !== 0) {
      let insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-bar__middle').append(insertHTML);
      $('.main-bar__middle').animate({ scrollTop: $('.main-bar__middle')[0].scrollHeight});
    }
    })
    .fail(function(){
      alert('更新に失敗しました')
    })
  }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});