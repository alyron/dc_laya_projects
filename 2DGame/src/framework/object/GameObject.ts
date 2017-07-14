module dc
{
    /**
     * 游戏对象基类
     * @author hannibal
     * @time 20174-7-6
     */
    export class GameObject
    {
        protected m_Active:boolean        //是否激活中
        protected m_ObjectType:string;    //对象类型
        protected m_ObjectGUID:number;    //对象唯一ID
        protected m_ObjectServerID:string;//服务器id在客户端的备份

        protected m_Observer:EventDispatcher;

        constructor()
        {
             this.m_ObjectGUID = 0; 
             this.m_Observer = new EventDispatcher(); 
        }

        public Init():void
        {
             this.m_Active = true;
             this.m_ObjectType = "";
             this.m_ObjectServerID = ""; 
        }

        public Setup(info:any):void
        {
            this.RegisterEvent();
        }

        public Destroy():void
        {
            this.m_Active = false;
            this.UnRegisterEvent();
        }

        public Update(elapse:number, game_frame:number):boolean
        {
            return true;     
        }
        /**注册事件*/
        protected RegisterEvent():void
        {
        }
        protected UnRegisterEvent():void
        {
        }

        public SetActive(b:boolean)
        {
            this.m_Active = b;
        }

        get Active():boolean
        {
            return this.m_Active;
        }
        get ObjectGUID():number
        {
            return this.m_ObjectGUID;
        }
        get ObjectServerID():string
        {
            return this.m_ObjectServerID;
        }
        get ObjectType():string
        {
            return this.m_ObjectType;
        }
        set ObjectType(type:string)
        {
            this.ObjectType = type;
        }
        get Observer():EventDispatcher
        {
            return this.m_Observer;
        }
    }
}