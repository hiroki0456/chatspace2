# json.array! @messages do |message|
#   json.content message.content
#   json.image message.image.url
#   json.created_at message.created_at.strftime("%Y年%m月%d日 %H時%M分")
#   json.user_name message.user.name
#   json.id message.id
# end

json.array! @group_messages do |group_message|
  json.content group_message.content
  json.image group_message.image.url
  json.created_at group_message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.id group_message.id
  json.user_name group_message.user.name
  json.groupId group_message.group_id
  json.currentUserId current_user.id
end
