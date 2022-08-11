import { HttpException } from '@nestjs/common';
import { RESPONSE } from 'config/response.utils';
import { getManager } from 'typeorm';

/**
 * description : response를 만들어 주는 함수, result에 들어갈 것이 없다면 undefined 입력해야함
 * @param response
 * @param data
 * @returns object
 */
export function makeResponse(response: any, data: any | any[] | undefined) {
  response.result = data;
  return response;
}

/**
 * description : 권한 체크 함수
 * @param authority
 * @param list
 * @returns boolean
 */
export function ApiAuthorityCheck(authority: string, list: string[]) {
  if (list.indexOf(authority) === -1) {
    return false;
  }
  return true;
}

/**
 * description : ApiCallHistory에 로그 저장하는 함수
 * historyType : HistoryType ENUM에서 C, R, U, D에 맞게 넣으면 됩니다.
 * userType : UserType ENUM에서 유저에 맞게 넣으면 됩니다.
 * apiName : 각 도메인+controller에 작성되어있는 Swagger의 API명을 넣으면 됩니다.
 * req : request 객체를 넣으면 됩니다.
 * res : makeResponse()를 통해 만들어진 response를 넣으면 됩니다.
 */
export async function saveApiCallHistory(
  historyType: string,
  userType: string,
  apiName: string,
  req: any,
  res: any,
) {
  let id = 0;
  let queryString = null;
  let pathVariable = null;
  let body = null;
  try {
    // 유저의 아이디가 있는지 검사하는 로직
    if (req.user != undefined) {
      id = req.user.id;
    }
    // query string이 있는지 검사하는 로직
    if (req.query != undefined) {
      queryString = req.query;
    }
    // path variable이 있는지 검사하는 로직
    if (req.params != undefined) {
      pathVariable = req.params;
    }
    // body가 있는지 검사하는 로직
    if (req.body != undefined) {
      body = req.body;
    }
    const query = `
      INSERT INTO ApiCallHistory(historyType, userType, savedId, apiUri, apiName, apiMethod,
      requestQuery, requestBody, requestParams, response, status, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '활성화', CURRENT_TIMESTAMP)
    `;
    const param = [
      historyType,
      userType,
      id,
      req.url,
      apiName,
      req.method,
      JSON.stringify(queryString),
      JSON.stringify(body),
      JSON.stringify(pathVariable),
      JSON.stringify(res),
    ];
    const entityManager = getManager();
    await entityManager.query(query, param);
  } catch (error) {
    throw new HttpException(RESPONSE.ERROR, 201);
  }
}
