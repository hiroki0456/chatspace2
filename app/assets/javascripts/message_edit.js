// $(function(){

//   const InputBox = function(text, element){
//     html = `<input class="edit-input" type="text" name="message[content]" value="${text}">
//               <button class="edit-button">編集する</button>`

//     inputbox = $(element).html(html)[0];
//   }
//   $('.main-bar__middle__box__upper-info__icon__edit').on('click', function(){
//     const result = window.confirm('編集しますか')

//     if(result){
//       const EditElement = $(this).parents()[2];
//       const EditId = $(EditElement).data('message-id');
//       const EditTextElement =  $(EditElement).children()[1];
//       const EditText = $(EditTextElement).text();
//       InputBox(EditText, EditTextElement);
      
//       $(document).on('click', '.edit-button', function(){
//         const editcontent = $(this).siblings().val();

//         $.ajax({
//           url: `messages/${EditId}`,
//           type: 'put',
//           data: {edit_id: EditId, cotent: editcontent},
//           dataType: 'json'
//         })
//       })
//     }
//   })
// })