$(function() {
  groupIds = []
  function buildHTML(message){
    if (message.content && message.image){
    var html = `<div class="main-bar__middle__box" data-message-id="${message.id}">
    <div class="main-bar__middle__box__upper-info">
    <p class="main-bar__middle__box__upper-info__name">
    ${message.user_name}
    </p>
    <p class="main-bar__middle__box__upper-info__date">
    ${message.created_at}
    </p>
    </div>
    <div class="main-bar__middle__box__text"></div>
    ${message.content}
    <br>
    <img class="main-bar__middle__box__image" src="${message.image}" alt="Test image">
    </div>`
  }else if (message.content){
    var html = 
    `<div class="main-bar__middle__box" data-message-id="${message.id}">
    <div class="main-bar__middle__box__upper-info">
    <p class="main-bar__middle__box__upper-info__name">
    ${message.user_name}
    </p>
    <p class="main-bar__middle__box__upper-info__date">
    ${message.created_at}
    </p>
    </div>
    <div class="main-bar__middle__box__text"></div>
    ${message.content}
    <br>
    </div>`
  } else if (message.image){
    var html = `<div class="main-bar__middle__box" data-message-id="${message.id}">
    <div class="main-bar__middle__box__upper-info">
    <p class="main-bar__middle__box__upper-info__name">
    ${message.user_name}
    </p>
    <p class="main-bar__middle__box__upper-info__date">
    ${message.created_at}
    </p>
    </div>
    <div class="main-bar__middle__box__text"></div>
    <img class="main-bar__middle__box__image" src="${message.image}" alt="Test image">
    <br>
    </div>`
  };
  return html;
  }

  $("#new_message").on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
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
      $('.main-bar__middle').append(html);
      $('form')[0].reset();
      $('.main-bar__middle').animate({ scrollTop: $('.main-bar__middle')[0].scrollHeight});
      $('#' + data.groupId).html(data.content);
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
    groupIds.length = 0;
    $(".side-bar__footer__group__message-name").each(function(){
      groupIds.push($(this).attr('id'));
    });
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id,group_ids: groupIds}
    })
    .done(function(messages){
      if (messages.length !== 0) {
      let insertHTML = '';
      let path = location.pathname ;
      $.each(messages, function(i, message) {
        if(`/groups/${message.groupId}/messages` == path ){
          if(message.id !== last_message_id){
        insertHTML += buildHTML(message)
      $('.main-bar__middle').append(insertHTML);
      $('#' + message.groupId).html(message.content);
      $('.main-bar__middle').animate({ scrollTop: $('.main-bar__middle')[0].scrollHeight});
    }
       }else if (`/groups/${message.groupId}/messages` !== path ){
        $('#' + message.groupId).html(message.content);
  }
  });
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