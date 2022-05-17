import React, { useEffect, useState } from 'react';
import '../index.css';

const MyList = ({ config,testData, }: { config: any; testData: any }) => {
	// const [getDeltaHeight(), setDeltaHeight] = useState<any>(0);
  const getTextWidth = (str: any,fontSize: any) =>{
		let result = 10;

		let ele = document.createElement('span')
		//字符串中带有换行符时，会被自动转换成<br/>标签，若需要考虑这种情况，可以替换成空格，以获取正确的宽度
        //str = str.replace(/\\n/g,' ').replace(/\\r/g,' ');
		ele.innerText = str;
		//不同的大小和不同的字体都会导致渲染出来的字符串宽度变化，可以传入尽可能完备的样式信息
		ele.style.fontSize = fontSize; 
		
		//由于父节点的样式会影响子节点，这里可按需添加到指定节点上
		document.documentElement.append(ele);

		result =  ele.offsetWidth;

		document.documentElement.removeChild(ele);
		return result;
	}
	const getDeltaHeight = () => {
		
		const myList = document.getElementById('my-list')
		const listChild = document.getElementById('list-child')
		const listFather = myList?.parentElement
    let text = config?.text
    let str = ''
    if (text?.includes('&{') && text?.includes('}&')) {
      // str = text?.slice(text?.indexOf('&{') + 2).split('}&')?.[0]
      text = text?.slice(text?.indexOf('&{') + 2);
      str += text?.split('}&')?.[0]
      text = text?.slice(text?.indexOf('}&') + 2);
    };
    const finalList = testData?.[str as keyof typeof testData] || []
    
		if(myList && listFather && listChild && listFather?.offsetHeight-myList?.offsetHeight>0) {
			return listFather?.offsetHeight-listChild?.offsetHeight*(finalList?.length || 4)
		}
		else return 0
	}

  if (config?.text !== "List") {
    let text = config?.text
    let str = ''
    if (text?.includes('&{') && text?.includes('}&')) {
      // str = text?.slice(text?.indexOf('&{') + 2).split('}&')?.[0]
      text = text?.slice(text?.indexOf('&{') + 2);
      str += text?.split('}&')?.[0]
      text = text?.slice(text?.indexOf('}&') + 2);
    };
    if (text?.includes('&{') && text?.includes('}&')) {
      return (
        <div
					id="my-list"
					className="my-list"
					style={{ 
						wordBreak: 'break-all', 
						...config?.style, 
						marginTop:config?.TopBottom === 'Bottom'? getDeltaHeight() :'unset',
            whiteSpace:'nowrap',
					}}
				>
					<div>List</div>
					只可以包含一个数组字段名
				</div>
			)
    }
    const finalList = testData?.[str as keyof typeof testData]
    if (typeof finalList === "string") {
			return (
				<div
					id="my-list"
					className="my-list"
					style={{ 
						wordBreak: 'break-all', 
						...config?.style, 
						marginTop:config?.TopBottom === 'Bottom'? getDeltaHeight() :'unset',
            whiteSpace:'nowrap',
					}}
				>
					<div>List</div>
					该字段为非数组字段
				</div>
			)
    }
		if (!finalList) {
			// return (
			// 	<div
			// 		id="my-list"
			// 		className="my-list"
			// 		style={{ 
			// 			wordBreak: 'break-all', 
			// 			...config?.style, 
			// 			marginTop:config?.TopBottom === 'Bottom'? getDeltaHeight() :'unset' 
			// 		}}
			// 	>
			// 		<div>List</div>
			// 		该字段不存在
			// 	</div>
			// )
      return (
        <div
          id="my-list"
          className="my-list"
          style={{ 
            wordBreak: 'break-all', 
            ...config?.style, 
            marginTop:config?.TopBottom === 'Bottom'? getDeltaHeight() :'unset',
            whiteSpace:'nowrap',
        }}
        >
          {[1,2,3,4].map((val: any)=>{
            const rate = config?.width?.split('px')?.[0] / getTextWidth(`Data${val}`,config?.style?.fontSize+'px')
            // const rate = document.getElementById(`Data${val}`)?.style.width
            // console.log(getTextWidth(`Data${val}`,config?.style?.fontSize+'px'),rate,config?.width?.split('px')?.[0])
            const finalRate = rate < 1 ? rate : 1
            const transparent = (1-finalRate) * config?.width?.split('px')?.[0] / 2
            return <div id='list-child' style={{transform:`matrix(${finalRate},0,0,1,-${transparent},0)`}}><span>Data{val}</span></div>
          })}
        </div>
      );
		}
    return (
      <div
				id="my-list"
				className="my-list"
				style={{ 
					wordBreak: 'break-all', 
					...config?.style, 
					marginTop:config?.TopBottom === 'Bottom'? getDeltaHeight() :'unset' ,
          whiteSpace:'nowrap',
				}}
			>
				{/* <div style={{bottom:0, position:'absolute'}}> */}
				{finalList.map((val: any) => {
          // console.log(getDeltaHeight())
          let text = config?.text;
          let finalText = '';
          if (text?.includes('&{') && text?.includes('}&')) {
            finalText += text?.split('&{')?.[0];
            text = text?.slice(text?.indexOf('&{') + 2);
            finalText += val
            text = text?.slice(text?.indexOf('}&') + 2);
          }
          finalText += text;
					const rate = config?.width?.split('px')?.[0] / getTextWidth(`${finalText}`,config?.style?.fontSize+'px')
          const finalRate = rate < 1 ? rate : 1
          const transparent = (1-finalRate) * config?.width?.split('px')?.[0] / 2
          return <div id='list-child' style={{transform:`matrix(${finalRate},0,0,1,-${transparent},0)`}}><span>{finalText}</span></div>
				})}
				{/* </div> */}
      </div>
    );
    
  }
  return (
    <div
      id="my-list"
      className="my-list"
      style={{ 
        wordBreak: 'break-all', 
        ...config?.style, 
        marginTop:config?.TopBottom === 'Bottom'? getDeltaHeight() :'unset',
        whiteSpace:'nowrap' 
      }}
    >
      {[1,2,3,4].map((val: any)=>{
        const rate = config?.width?.split('px')?.[0] / getTextWidth(`Data${val}`,config?.style?.fontSize+'px')
        // const rate = document.getElementById(`Data${val}`)?.style.width
        // console.log(getTextWidth(`Data${val}`,config?.style?.fontSize+'px'),rate,config?.width?.split('px')?.[0])
        const finalRate = rate < 1 ? rate : 1
        const transparent = (1-finalRate) * config?.width?.split('px')?.[0] / 2
        return <div id='list-child' style={{transform:`matrix(${finalRate},0,0,1,-${transparent},0)`}}><span>Data{val}</span></div>
      })}
    </div>
  )
};

export default MyList;
