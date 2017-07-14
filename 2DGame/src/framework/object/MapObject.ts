module dc
{
    /**
     * 地图对象
     * @author hannibal
     * @time 20174-7-12
     */
	export class MapObject extends RenderObject
	{
		protected m_Direction:Vector2;	//移动方向
		protected m_MoveSpeed:number;	//移动速度

		protected m_RowIndex:number;	//所在地图的行
		protected m_ColIndex:number;	//所在地图的列

		protected m_PathGrid:PathGrid;	//对象所在的格子

        constructor()
        {
			super();
        }

        public Init():void
        {
			super.Init();

			this.m_Direction = Vector2.zero;
			this.m_MoveSpeed = 0;
           	this.m_RowIndex = Number.MIN_VALUE;
           	this.m_ColIndex = Number.MIN_VALUE;
			this.m_PathGrid = null;
        }

        public Setup(info:any):void
        {
			super.Setup(info);
        }

        public Destroy():void
        {
			if(this.m_RootNode != null)
			{
				this.m_RootNode.removeSelf();
				this.m_RootNode = null;
			}
			super.Destroy();
        }

        public Update(elapse:number, game_frame:number):boolean
        {
            return super.Update(elapse, game_frame);     
        }
		/**位置*/
		public SetPosition(x:number, y:number):void
		{
			super.SetPosition(x, y);
			EventController.DispatchEvent(ObjectEvent.MAP_POSITION, this.m_ObjectGUID, this.x, this.y);

			let map_col:number = PathGridMap.Instance.getNodeColByPos(this.x);
			let map_row:number = PathGridMap.Instance.getNodeRowByPos(this.y);
			if(map_col != this.m_ColIndex || map_row != this.m_RowIndex)
			{//节点改变
				this.OnMapGridChangle(map_row, map_col);
			}
		}
		public SetDirection(x:number, y:number)
		{
			this.m_Direction.Set(x, y);
		}
		public SetSpeed(s:number)
		{
			this.m_MoveSpeed = s;
		}
		/**格子改变*/
		protected OnMapGridChangle(new_row:number, new_col:number):void
		{
			if(this.m_PathGrid != null)
			{
				this.m_PathGrid.removeObject(this);
				this.m_PathGrid = null;
			}
			
			this.m_ColIndex = new_col;
			this.m_RowIndex = new_row;
			EventController.DispatchEvent(ObjectEvent.MAP_GRID, this.m_ObjectGUID, this.m_RowIndex, this.m_ColIndex);
			
			this.m_PathGrid = PathGridMap.Instance.getNode(this.m_ColIndex, this.m_RowIndex);
			if(this.m_PathGrid != null)
			{
				this.m_PathGrid.addObject(this);
			}
		}
		public get Direction():Vector2
		{
			return this.m_Direction;
		}
		protected get MoveSpeed():number
		{
			return this.m_MoveSpeed;
		}
	}
}