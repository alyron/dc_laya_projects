module dc
{
    /**
     * 全局事件
     * @author hannibal
     * @time 20174-7-6
     */
    export class EventController extends Singleton
    {
        private m_Event:EventDispatcher = new EventDispatcher();
        private m_EvtArgs:EventArgs = new EventArgs();

        private static instance:EventController = null;
        public static get Instance():EventController
        {
            if(!this.instance)this.instance = new EventController();
            return this.instance;
        }

        public AddEventListener(type:string, fun:Function):void
        {
            this.m_Event.AddEventListener(type, fun);
        }

        public RemoveEventListener(type:string, fun:Function):void
        {
            this.m_Event.RemoveEventListener(type, fun);
        }

        public TriggerEvent(type:string, ...args:any[]):void
        {
            this.m_EvtArgs.Init(args);
            this.m_Event.TriggerEvent(type, this.m_EvtArgs);
        }
        
        public Clear():void
        {
            this.m_Event.Clear();
        }
    }
}