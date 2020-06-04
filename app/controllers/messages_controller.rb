class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  def edit
    @message = Message.find(params[:message_id])
  end

  def update
    @message = Message.find(params[:id])
    if @message.update(message_params)
      respond_to do |format|
        format.json
      end
    end

  end

  def destroy
      @message = Message.find(params[:message_id])
      @message.destroy
  end
  
  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
