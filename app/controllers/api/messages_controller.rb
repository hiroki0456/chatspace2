class Api::MessagesController < ApplicationController

  def index
    # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    @group_messages = []
    params[:group_ids].each do | groupId|
      group_info = Group.find(groupId)
      @group_messages.push(group_info.messages.last)
    end
  end

end
