module dc
{
    /**
     * 登陆界面
     * @author hannibal
     * @time 20174-7-19
     */
	export class LoginView extends client.gui.login.LoginViewUI
	{
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～重写基类方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**初始化，和onDestroy是一对*/
        protected OnCreate():void
        {
            super.OnCreate();
        }
        /**销毁*/
        protected OnDestroy():void
        {
            super.OnDestroy();
        }
        /**每帧循环*/
        public Update():void
        {
            super.Update();
        }
        protected OnEnable():void
        {
            this.RegisterEvent();
            super.OnEnable();
        }
        protected OnDisable():void
        {
            super.OnDisable();
            this.UnRegisterEvent();
        }
        /**资源加载结束*/
        public OnLoadComplete():void
        {
            super.OnLoadComplete();
        }

        /**多语言;初始化，或语音设定改变时触发*/
        protected OnLangChange():void
        {
            super.OnLangChange();
        }

        /**需要提前加载的资源*/
        protected PreLoaderRes():Array<any>
        {
            return [
                ["res/image/1.png", Laya.Loader.IMAGE],
                ["res/image/2.png", Laya.Loader.IMAGE],
                ["res/image/3.png", Laya.Loader.IMAGE],
            ];
        }

        /**UI按钮等注册事件列表，内部会在界面销毁时，自动反注册*/
        protected RegisterGUIEventMap():Array<any>
        {
            return [
                [this.btnLogin, laya.events.Event.CLICK, this.OnPressLogin],
                [this.btnRegister, laya.events.Event.CLICK, this.OnPressRegister],
                [this.panelServer, laya.events.Event.CLICK, this.OnPressSelectServer],
            ];
        }
        /**自定义事件注册，用于EventController派发的事件*/
        protected RegisterEvent():void
        {
            super.RegisterEvent();
        }
        protected UnRegisterEvent():void
        {
            super.UnRegisterEvent();
        }

        /**是否显示加载界面*/
        protected IsShowLoading():boolean
        {
            return false;
        }
        /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～内部方法～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**点击登录*/
        private OnPressLogin(event: LayaEvent)
        {
            Log.Debug("OnPressLogin");
            let target = event.target;
            
            let account: string = this.txtAccount.text;
            let password: string = this.txtPassword.text; 
            Log.Debug("请求登陆 account:" + account);
        }
        /**点击注册*/
        private OnPressRegister(event: LayaEvent)
        {
            Log.Debug("OnPressRegist");
        }
        /**点击选服*/
        private OnPressSelectServer(event: LayaEvent)
        {
            Log.Debug("OnPressSelectServer");
            //UIManager.Instance.Close(GUIID.ID_LOGIN);
            UIManager.Instance.Show(GUIID.ID_SELECT_SERVER);
        }
	}
}