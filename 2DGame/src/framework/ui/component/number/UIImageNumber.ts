module dc
{
    /**
     * 数字排列组件
     * @author hannibal
     * @time 2017-7-20
     * 例:
        let num:UIImageNumber = new UIImageNumber("ui/main/clip_num.png", 29, 33);
        num.pos(100 ,300);
        num.SetNum(11222);
        this.addChild(num);
     */	
	export class UIImageNumber extends LayaBox
	{
		private path: string;
        private clipWidth: number;
        private clipHeight: number;
        private clipContainer = [];
        private box: LayaBox;
        private totalClip: number;
        public constructor(path: string, clipWidth: number, clipHeight: number, totalClip:number = 10) 
		{
            super();
            this.path = path;
            this.clipWidth = clipWidth;
            this.clipHeight = clipHeight;
            this.totalClip = totalClip;
            this.box = new LayaBox();
            this.addChild(this.box);
        }
        /**设置值*/
        public SetNum(num: number) 
		{
            let count = 1;
            let nums = [];
            let bNegative = false;
            if (num < 0) {
                num = -num;
                bNegative = true;
            } 

            let divTen = Math.floor(num / 10);
            nums[nums.length] = num % 10;
            while (divTen > 0) 
			{
                ++count;
                nums[nums.length] = divTen % 10;
                divTen = Math.floor(divTen / 10);
            }

            if (bNegative) 
			{
                ++count;
                nums[nums.length] = 10;
            }

            let newCount = count - this.clipContainer.length;
            if (newCount > 0) 
			{              
                for (let i = 1; i <= newCount; ++i) 
				{
                    let clip = new LayaClip(this.path, this.totalClip);
                    this.addChild(clip);
                    clip.clipWidth = this.clipWidth;
                    clip.clipHeight = this.clipHeight;
                    clip.size(this.clipWidth, this.clipHeight);
                    this.clipContainer[this.clipContainer.length] = clip;
                }
            }

            for (let i = (nums.length - 1), j = 0; i >= 0; --i, ++j) 
			{
                let clip: LayaClip = this.clipContainer[i];
                clip.index = nums[i];
                clip.pos(j * this.clipWidth, 0);
                clip.visible = true;
            }

            for (let i = nums.length ; i < this.clipContainer.length; ++i)
			{
                let clip: LayaClip = this.clipContainer[i];
                clip.visible = false;
            }

            this.box.size(count * this.clipWidth, this.clipHeight);
            this.size(count * this.clipWidth, this.clipHeight);
        }
	}
}