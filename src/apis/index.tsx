import { get, post, del, put } from "../utils/request";

const baseUrl = 'http://127.0.0.1:8000'


export const GetStarlingList = async (params: any) =>
  await get(baseUrl+`/api/starling/search_key`, params /* 获取语言列表 */);

export const AddStarlingItems = async (params: any) =>
  await post(baseUrl+'/api/starling/batch', params /* 批量添加条目 */);

export const AddStarlingItem = async (params: any) =>
  await post(baseUrl+`/api/starling`, params /* 单条添加条目 */);

export const EditStarlingItem = async (params: any) =>
  await put(baseUrl+`/api/starling`, params /* 单条编辑条目 */);

export const DeleteStarlingItem = async (itemId: any) =>
  await del(baseUrl+`/api/starling/${itemId}`, {} /* 单条删除条目 */);

export const GetTranslation = async (text: any) =>
  await get(baseUrl+`/api/starling/translate?text=${text}`, {} /* 获得机器翻译 */);
  // export const GetTranslation = async (text: any) => {
  //   const res = await translate('Ik spreek Engels', {to: 'en'})
  //   return res;
  // }

export const GetItemByKey = async (params: any) =>
  await post(baseUrl+`/api/starling/key_lang`, params /* 通过key获得翻译 */);

export const JudgeExist = async (params: any) =>
  await get(baseUrl+`/api/starling/key`, params /* 判断是否有重复key */);

export const GetNewData = async (url: string) =>
  await get(url, {} /* 用外部url */)