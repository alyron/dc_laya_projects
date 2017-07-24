module dc
{
    /**
     * 游戏主逻辑
     * @author hannibal
     * @time 2017-7-9
     */
    export class Procedure extends Singleton
    {
        private static instance:Procedure = null;
        public static get Instance():Procedure
        {
            if(!this.instance)this.instance = new Procedure();
            return this.instance;
        }
        /**
         * 初始化
        */
        public Setup():void
        {
            UIID.DEFAULT_WIDTH = 640;
            UIID.DEFAULT_HEIGHT = 960;
            Laya.init(UIID.DEFAULT_WIDTH,UIID.DEFAULT_HEIGHT, Laya.WebGL);
            
            Log.Info("Procedure::setup");
            this.InitGameManager();
            Laya.timer.frameLoop(1, this, this.MainLoop);
        }
        /**
         * 销毁
        */
        public Destroy():void
        {
            Laya.timer.clearAll(this);
            this.ReleaseGameManager();
        }
        /**
         * 开始游戏，逻辑开始执行
        */
        public StartGame():void
        {
            GameApp.Instance.StartGame();    
        }
        /**
         * 游戏主循环
        */
        private MainLoop():void
        {
            this.Tick(Time.deltaTime,Time.frameCount);
        }

        private InitGameManager():void
        {
            Framework.Instance.Setup(Laya.stage);
            GameApp.Instance.Setup();
            ConfigManger.Instance.Setup();
            LangManager.Instance.Setup();
            DataManager.Instance.Setup();
            SceneManager.Instance.Setup();
            UILoaderRegister.Setup();
            //add here
            
        }
        private ReleaseGameManager():void
        {
            ConfigManger.Instance.Destroy();
            LangManager.Instance.Destroy();
            DataManager.Instance.Destroy();
            SceneManager.Instance.Destroy();
            UILoaderRegister.Destroy();
            //add here

            GameApp.Instance.Destroy();
            Framework.Instance.Destroy();
        }

        private Tick(elapse:number, game_frame:number):void
        {
            Framework.Instance.Tick(elapse, game_frame);

            GameApp.Instance.Tick(elapse, game_frame);
            SceneManager.Instance.Tick(elapse, game_frame);
        }
    }
}