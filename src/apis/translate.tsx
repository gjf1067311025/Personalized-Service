const T = (
  starling: string
) => {
  // const [translation, setTranslation] = useState<string>();
  
  // useEffect(() => {
  //   const fetchData = async () => {  
  //     const lang = localStorage.getItem('lang');          
  //     const res = await GetItemByKey({
  //       key: [starling],
  //       lang: lang,
  //     }); 
  //     setTranslation(res?.[`${starling}`]  || '');
  // }
  //   fetchData();
  // }, []);
  // return translation || starling;
  const lang = localStorage.getItem('lang'); 
  const res = localStorage.getItem('starling');
  const final = JSON.parse(res || '[]')?.filter((item: any) => {
    return item?.key === starling;
  })
  // if(starling==='const_add') console.log(final[0]);
  if(!final?.length) return starling;
  if(lang==='en')
    return final?.[0].english_text;
  return final?.[0].chinese_text;
}

export default T;


// export const storeTranslation = async (key: string) => {
//   const interface_input = {
//     page_num: 1,
//     page_size: 10,
//   }
//   const res1 = await GetStarlingList({...interface_input});
//   const res2 = await GetStarlingList({page_num:1, page_size:res1.total});
//   console.log(res2);
// }

// export const t = (key: string) => {
//   const items = JSON.parse(localStorage.getItem("starling") || '{}');
//   if (!items[`${key}`]) {
//     storeTranslation(key);
//   }
//   else {
//     return items[`${key}`];
//   }
// }