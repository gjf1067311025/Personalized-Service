import React, { useEffect, useState } from 'react';
import '../index.css';

const MyList = ({ config,testData, }: { config: any; testData: any }) => {
	const [deltaHeight, setDeltaHeight] = useState<any>(0);
	useEffect(() => {
		
		const myList = document.getElementById('my-list')
		const listFather = myList?.parentElement
		if(myList && listFather && listFather?.offsetHeight-myList?.offsetHeight>0) {
			setDeltaHeight(listFather?.offsetHeight-myList?.offsetHeight)
		}
		else setDeltaHeight(0)
	},[config.height])

  if (config?.text !== "List") {
    const str = config?.text
    const finalList = testData?.[str as keyof typeof testData]
    if (typeof finalList === "string") {
			return (
				<div
					id="my-list"
					className="my-list"
					style={{ 
						wordBreak: 'break-all', 
						...config?.style, 
						marginTop:config?.TopBottom === 'Bottom'? deltaHeight :'unset' 
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
			// 			marginTop:config?.TopBottom === 'Bottom'? deltaHeight :'unset' 
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
            marginTop:config?.TopBottom === 'Bottom'? deltaHeight :'unset' 
          }}
        >
          <div>Data1</div>
          <div>Data2</div>
          <div>Data3</div>
          <div>Data4</div>
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
					marginTop:config?.TopBottom === 'Bottom'? deltaHeight :'unset' 
				}}
			>
				{/* <div style={{bottom:0, position:'absolute'}}> */}
				{finalList.map((val: any) => {
						return <div>{val}</div>
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
        marginTop:config?.TopBottom === 'Bottom'? deltaHeight :'unset' 
      }}
    >
      <div>Data1</div>
      <div>Data2</div>
      <div>Data3</div>
      <div>Data4</div>
    </div>
  )
};

export default MyList;
