module dc
{
	/**
     * 多语言
     * @author hannibal
     * @time 20174-7-9
     */
	export class LangManager extends Singleton
	{
        private static instance:LangManager = null;
        public static get Instance():LangManager
        {
            if(!this.instance)this.instance = new LangManager();
            return this.instance;
        }
    
        /**在这做数据初始化*/
		public Setup():void
        {

        }
        /**在这清空数据，尤其是列表等保存的数据*/
        public Destroy():void
        {

        }
	}
}