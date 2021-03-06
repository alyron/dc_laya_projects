module dc
{
    /**
     * 地图对象
     * @author hannibal
     * @time 2017-7-12
     */
	export class MapObject3D extends RenderObject3D
	{
		protected m_Direction:Vector3;	//移动方向
		protected m_MoveSpeed:number;	//移动速度

		protected m_RowIndex:number;	//所在地图的行
		protected m_ColIndex:number;	//所在地图的列

		protected m_PathGrid:PathGrid = null;	//对象所在的格子

        constructor()
        {
			super();
        }

        public Init():void
        {
			super.Init();

			this.m_Direction = new Vector3();
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
			if(this.m_RootNode)
			{
				this.m_RootNode.removeSelf();
				this.m_RootNode = null;
			}
			super.Destroy();
        }

        public Update():boolean
        {
            return super.Update();     
        }
		/**位置*/
		public SetPosition(x:number, y:number, z:number):void
		{
			super.SetPosition(x, y, z);
			EventController.DispatchEvent(GameObjectEvent.MAP_POSITION, this.m_ObjectGUID, this.x, this.y, this.z);

			let map_col:number = PathGridMap.Instance.getNodeColByPos(this.x);
			let map_row:number = PathGridMap.Instance.getNodeRowByPos(this.z);
			if(map_col != this.m_ColIndex || map_row != this.m_RowIndex)
			{//节点改变
				this.OnMapGridChangle(map_row, map_col);
			}
		}
		public SetDirection(x:number, y:number, z:number)
		{
			Vec3Set(this.m_Direction, x, y, z);
		}
		public SetSpeed(s:number)
		{
			this.m_MoveSpeed = s;
		}
		/**格子改变*/
		protected OnMapGridChangle(new_row:number, new_col:number):void
		{
			if(this.m_PathGrid)
			{
				this.m_PathGrid.removeObject(this);
				this.m_PathGrid = null;
			}
			
			this.m_ColIndex = new_col;
			this.m_RowIndex = new_row;
			EventController.DispatchEvent(GameObjectEvent.MAP_GRID, this.m_ObjectGUID, this.m_RowIndex, this.m_ColIndex);
			
			this.m_PathGrid = PathGridMap.Instance.getNode(this.m_ColIndex, this.m_RowIndex);
			if(this.m_PathGrid)
			{
				this.m_PathGrid.addObject(this);
			}
		}
		public get Direction():Vector3
		{
			return this.m_Direction;
		}
		protected get MoveSpeed():number
		{
			return this.m_MoveSpeed;
		}
	}
}