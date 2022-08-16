import { HttpException } from '@nestjs/common';
import { RESPONSE } from 'config/response.utils';
import { getManager } from 'typeorm';

/**
 * description : Make Response Function. If There Is Nothing To Enter The Result, You Must Enter undefined
 * @param response
 * @param data
 * @returns object
 */
export function makeResponse(response: any, data: any | any[] | undefined) {
  response.result = data;
  return response;
}

/**
 * description : Authority Check Function
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
 * description : Save ApiCallHistory Table Function
 * historyType : Input HistoryType ENUM(CREATE, READ, UPDATE, DELETE)
 * userType : Input UserType ENUM
 * apiName : Input API Name
 * req : Request Object
 * res : Response Object from makeResponse Function
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
    // Check User
    if (req.user != undefined) {
      id = req.user.id;
    }
    // Check Query String
    if (req.query != undefined) {
      queryString = req.query;
    }
    // Check Path
    if (req.params != undefined) {
      pathVariable = req.params;
    }
    // Check Body
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
