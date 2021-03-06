module dc
{
    /**
     * 对象管理
     * @author hannibal
     * @time 2017-7-6
     */
    export class ObjectManager extends Singleton
    {
        private m_shareObjID:number = 0;
        private m_DicObject:Object = {};
        private m_DicServerObject:Object = {};
        private m_ListReleaseObject:GameObject[] = [];

        private static instance:ObjectManager = null;
        public static get Instance():ObjectManager
        {
            if(!this.instance)this.instance = new ObjectManager();
            return this.instance;
        }

        public Setup():void
        {

        }

        public Destroy():void
        {
            this.RemoveAll();
        }

        public Tick():void
        {
            let obj:GameObject = null;
            for(let key in this.m_DicObject)
            {
                obj = this.m_DicObject[key];
                if(obj && obj.Active && obj.Update())
                {
                    
                }
                else
                {//结束后删除
                    this.m_ListReleaseObject.push(obj);
                }
            }

            this.ProcessReleaseObject();
        }

	    /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～对象集合～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        /**移除对象*/
        public RemoveObject(obj:GameObject, force:boolean):void
        {
            if(!obj)return;
            if(force)
            {
                this.ReleaseObject(obj);
            }
            else
            {
                obj.SetActive(false);
            }
        }
        /**移除所有对象*/
        public RemoveAll():void
        {
            for(let key in this.m_DicObject)
            {
                this.ReleaseObject(this.m_DicObject[key]);
            }
            this.m_ListReleaseObject.length = 0;
        }
        /**释放对象*/
        private ReleaseObject(obj:GameObject):void
        {
            if(!obj)return;

            this.DetachObject(obj);
            obj.Destroy();
            obj = null;
        }
        /**加入对象管理器*/
        public AttachObject(obj:GameObject):void
        {
            if(!obj)return;
            if(this.m_DicObject[obj.ObjectGUID])return;

            this.m_DicObject[obj.ObjectGUID] = obj;
            if(obj.ObjectServerID !== "")
            {
			    this.m_DicServerObject[obj.ObjectServerID] = obj;
            }
        }

        public DetachObject(obj:GameObject):void
        {
            if(!obj)return;

            if(this.m_DicObject[obj.ObjectGUID])delete this.m_DicObject[obj.ObjectGUID];
            if(this.m_DicServerObject[obj.ObjectServerID])delete this.m_DicServerObject[obj.ObjectServerID];
        }

        public ProcessReleaseObject():void
        {
            if(this.m_ListReleaseObject.length == 0)return;

            for(let obj of this.m_ListReleaseObject)
            {
                this.ReleaseObject(obj);
            }

            this.m_ListReleaseObject.length = 0;
        }
        
        /**暂停游戏*/
        public PauseGame():void
        {
            let obj:GameObject = null;
            for(let key in this.m_DicObject)
            {
                obj.OnPauseEnter();
            }
        }
		/**结束暂停*/
		public ResumeGame():void
        {
            let obj:GameObject = null;
            for(let key in this.m_DicObject)
            {
                obj.OnPauseExit();
            }
        }
        
	    /*～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～get/set～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～*/
        public GetObjectByID(id:number):GameObject
        {
            return this.m_DicObject[id];
        }
        public GetServerObjectByID(id:string):GameObject
        {
            return this.m_DicServerObject[id];
        }

        public ShareObjectGUID():number
        {
            return ++this.m_shareObjID;
        }
    }
}