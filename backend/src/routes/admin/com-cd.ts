import { Router, Request } from "express";
import * as comCdController from "../../controllers/admin/com-cd";
import * as COM_CD from "../../models/com-cd";

const router = Router();

import { ExpressValidator, Meta } from "express-validator";
const { body, param } = new ExpressValidator({
  isComID: async (value: string, meta: Meta) => {
    const req = meta.req as Request;
    const comCd = await COM_CD.getComCd(req, value, 0);
    if (!comCd) {
      return Promise.reject("존재하지 않는 코드입니다.");
    }
  },
  isComValue: async (value: string, meta: Meta) => {
    const req = meta.req as Request;
    const comId = req.body.comId;
    const comCd = await COM_CD.getComCd(req, comId, value);
    if (!comCd) {
      return Promise.reject("존재하지 않는 코드입니다.");
    }
  },
  isUseFlag: async (value: string, meta: Meta) => {
    const req = meta.req as Request;
    const comcd = await COM_CD.getComCd(req, "USE_FLAG", value);
    if (!comcd) {
      return Promise.reject("존재하지 않는 코드입니다.");
    }
  },
});

/**
 * @swagger
 * paths:
 *  /api/admin/com-cd/manageComCd:
 *    get:
 *      summary: "공통코드 관리"
 *      description: "요청 경로에 값을 담아 서버에 보낸다."
 *      tags: [공통코드]
 *      parameters:
 *        - in: query
 *          name: page
 *          required: true
 *          description: 현재 페이지
 *          schema:
 *            type: string
 *          examples:
 *            Sample:
 *              value: 1
 *              summary: 기본값
 *        - in: query
 *          name: perPage
 *          required: false
 *          description: 페이지 로우 수
 *          schema:
 *            type: string
 *          examples:
 *            Sample:
 *              value: "null"
 *              summary: 기본값
 *        - in: query
 *          name: comcdOption
 *          required: false
 *          description: 코드값, 코드명 옵션 값
 *          schema:
 *            type: string
 *        - in: query
 *          name: comcdOptionValue
 *          required: false
 *          description: 코드값, 코드명 검색 값
 *          schema:
 *            type: string
 *      responses:
 *        "200":
 *          description: 부모 공통코드 조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    comCd:
 *                      type: object
 *                      example:
 *                          [
 *                            {
 *                              "key": "ADMIN_FLAG",
 *                              "comId": "ADMIN_FLAG",
 *                              "name": "관리자 페이지 유무",
 *                              "createdAt": "2023.11.02 13.28.47",
 *                              "createdUser": "테스트2",
 *                              "updatedAt": null,
 *                              "updatedUser": null,
 *                              "status": "S",
 *                            },
 *                            {
 *                              "key": "BROADCASTER_TYPE",
 *                              "comId": "BROADCASTER_TYPE",
 *                              "name": "트위치 사용자 유형",
 *                              "createdAt": "2023.11.23 13.28.47",
 *                              "createdUser": "테스트5",
 *                              "updatedAt": null,
 *                              "updatedUser": null,
 *                              "status": "S",
 *                            }
 *                           ]
 *                    totalCount:
 *                      type: int
 *                      example: 2
 *                    comboPerPage:
 *                      type: object
 *                      example:
 *                          [ "10", "15", "30", "50", "100" ]
 *                    comboComCdOption:
 *                      type: object
 *                      example:
 *                          [
 *                            { "value": "ID",   "label": "코드값" },
 *                            { "value": "NAME", "label": "코드명" }
 *                          ]
 */
router.get("/manageComCd", comCdController.getManageComCd);

/**
 * @swagger
 * paths:
 *  /api/admin/com-cd/manageComCd/{comId}:
 *    get:
 *      summary: "상세 공통코드 관리"
 *      description: "요청 경로에 값을 담아 서버에 보낸다."
 *      tags: [공통코드]
 *      parameters:
 *        - in: path
 *          name: comId
 *          required: true
 *          description: 부모 공통코드 ID
 *          schema:
 *            type: string
 *        - in: query
 *          name: page
 *          required: true
 *          description: 현재 페이지
 *          schema:
 *            type: string
 *          examples:
 *            Sample:
 *              value: 1
 *              summary: 기본값
 *        - in: query
 *          name: perPage
 *          required: false
 *          description: 페이지 로우 수
 *          schema:
 *            type: string
 *          examples:
 *            Sample:
 *              value: "null"
 *              summary: 기본값
 *        - in: query
 *          name: comcdOption
 *          required: false
 *          description: 코드값, 코드명 옵션 값
 *          schema:
 *            type: string
 *        - in: query
 *          name: comcdOptionValue
 *          required: false
 *          description: 코드값, 코드명 검색 값
 *          schema:
 *            type: string
 *        - in: query
 *          name: useFlag
 *          required: true
 *          description: 사용유무
 *          schema:
 *            type: string
 *          examples:
 *            Sample:
 *              value: "ALL"
 *              summary: 기본값
 *      responses:
 *        "200":
 *          description: 특정 부모 공통코드의 자식 공통코드 조회
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    detailComCd:
 *                      type: object
 *                      example:
 *                          [
 *                            {
 *                              "key": "N",
 *                              "value": "N",
 *                              "name": "사용자 페이지",
 *                              "createdAt": "2023.11.02 13.28.47",
 *                              "createdUser": "운영자",
 *                              "updatedAt": null,
 *                              "updatedUser": null,
 *                              "useFlag": "Y",
 *                              "sort": 1,
 *                              "status": "S",
 *                            },
 *                            {
 *                              "key": "Y",
 *                              "value": "Y",
 *                              "name": "관리자 페이지",
 *                              "createdAt": "2023.11.02 13.30.47",
 *                              "createdUser": "운영자",
 *                              "updatedAt": 2023.11.23 13.30.47",
 *                              "updatedUser": "운영자",
 *                              "useFlag": "N",
 *                              "sort": 2,
 *                              "status": "S",
 *                            }
 *                           ]
 *                    totalCount:
 *                      type: int
 *                      example: 2
 *                    comboPerPage:
 *                      type: object
 *                      example:
 *                          [ "10", "15", "30", "50", "100" ]
 *                    comboUseFlag:
 *                      type: object
 *                      example:
 *                          [
 *                            { "value": "Y", "label": "사용" },
 *                            { "value": "N", "label": "미사용" }
 *                          ]
 *                    comboComCdOption:
 *                      type: object
 *                      example:
 *                          [
 *                            { "value": "ID",   "label": "코드값" },
 *                            { "value": "NAME", "label": "코드명" }
 *                          ]
 */
router.get(
  "/manageComCd/:comId",
  param("comId").isString().isComID(),
  comCdController.getDetailComCd
);

/**
 * @swagger
 * /api/admin/com-cd/manageComCd:
 *   post:
 *    summary: "부모 공통코드 저장"
 *    description: "선택한 부모 공통코드 저장 및 변경"
 *    tags: [공통코드]
 *    requestBody:
 *      description: 선택한 부모 공통코드 저장 및 변경
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              comCd:
 *                type: object
 *                description: "공통코드 관련 데이터"
 *                example:
 *                    [
 *                       {
 *                          "comId": null,
 *                          "name": "테스트22",
 *                       },
 *                       {
 *                          "comId": 5,
 *                          "name": "테스트33",
 *                       }
 *                    ]
 *    responses:
 *      "200":
 *        description: 정상 수행 - 저장한 수만큼 메시지 보냄
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "2건 정상적으로 저장되었습니다."
 *      "400":
 *        description: 유효성 검사 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "데이터가 없습니다."
 *      "500":
 *        description: 서버 에러
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "서버에서 에러가 발생하였습니다. ( 추후 수정 가능성 있음 )"
 */
router.post(
  "/manageComCd",
  [
    body("comCd").isArray({ min: 1 }).withMessage("데이터가 없습니다."),
    body("comCd.*.comId", "코드 ID가 비정상적입니다.")
      .isString()
      .optional({ nullable: true })
      .isLength({ max: 25 })
      .isComID()
      .trim(),
    body("comCd.*.name", "이름이 비정상적입니다.")
      .isString()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .trim(),
  ],
  comCdController.postManageComCd
);

/**
 * @swagger
 * /api/admin/com-cd/detailComCd:
 *   post:
 *    summary: "자식 공통코드 저장"
 *    description: "선택한 자식 공통코드 저장 및 변경"
 *    tags: [공통코드]
 *    requestBody:
 *      description: 선택한 자식 공통코드 저장 및 변경
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              comCd:
 *                type: object
 *                description: "공통코드 관련 데이터"
 *                example:
 *                    [
 *                       {
 *                          "value": "test",
 *                          "name": "테스트22",
 *                          "useFlag": "Y",
 *                          "sort": 1
 *                       },
 *                       {
 *                          "value": "test3",
 *                          "name": "테스트33",
 *                          "useFlag": "N",
 *                          "sort": 2
 *                       },
 *                    ]
 *              comId:
 *                type: string
 *                description: "공통코드 ID"
 *                example: "comId"
 *    responses:
 *      "200":
 *        description: 정상 수행 - 저장한 수만큼 메시지 보냄
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "2건 정상적으로 저장되었습니다."
 *      "400":
 *        description: 유효성 검사 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "데이터가 없습니다."
 *      "500":
 *        description: 서버 에러
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "서버에서 에러가 발생하였습니다. ( 추후 수정 가능성 있음 )"
 */
router.post(
  "/detailComCd",
  [
    body("comCd").isArray({ min: 1 }).withMessage("데이터가 없습니다."),
    body("comCd.*.value", "값이 비정상적입니다.")
      .isString()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .isComValue()
      .trim(),
    body("comCd.*.name", "이름이 비정상적입니다.")
      .isString()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .trim(),
    body("comCd.*.useFlag", "사용유무가 비정상적입니다.")
      .isString()
      .notEmpty()
      .isUseFlag()
      .trim(),
    body("comCd.*.sort", "정렬순서가 비정상적입니다.")
      .isNumeric()
      .isLength({ min: 1, max: 999 })
      .notEmpty(),
    body("comId", "코드 ID가 비정상적입니다.")
      .isString()
      .notEmpty()
      .isComID()
      .trim(),
  ],
  comCdController.postDetailComCd
);

/**
 * @swagger
 * /api/admin/com-cd/manageComCd:
 *   patch:
 *    summary: "부모 공통코드 삭제"
 *    description: 선택한 부모 공통코드 삭제
 *    tags: [공통코드]
 *    requestBody:
 *      description: 선택한 부모 공통코드 삭제
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              comCd:
 *                type: object
 *                description: "삭제할 공통코드 ID"
 *                example:
 *                    [
 *                       {
 *                          "comId": 3
 *                       },
 *                       {
 *                          "comId": 5
 *                       }
 *                    ]
 *    responses:
 *      "200":
 *        description: 정상 수행 - 삭제한 수만큼 메시지 보냄
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "2건 정상적으로 삭제되었습니다."
 *      "400":
 *        description: 유효성 검사 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "데이터가 없습니다."
 *      "500":
 *        description: 서버 에러
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "서버에서 에러가 발생하였습니다. ( 추후 수정 가능성 있음 )"
 */
router.patch(
  "/manageComCd",
  [
    body("comCd").isArray({ min: 1 }).withMessage("데이터가 없습니다."),
    body("comCd.*.comId", "코드 ID가 비정상적입니다.")
      .isString()
      .notEmpty()
      .isLength({ min: 1, max: 25 })
      .isComID()
      .trim(),
  ],
  comCdController.deleteManageComCd
);

/**
 * @swagger
 * /api/admin/com-cd/detailComCd:
 *   patch:
 *    summary: "자식 공통코드 삭제"
 *    description: 선택한 자식 공통코드 삭제
 *    tags: [공통코드]
 *    requestBody:
 *      description: 선택한 자식 공통코드 삭제
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              comCd:
 *                type: object
 *                description: "삭제할 공통코드 value"
 *                example:
 *                    [
 *                       {
 *                          "value": "값"
 *                       },
 *                       {
 *                          "value": "값2"
 *                       }
 *                    ]
 *              comId:
 *                type: string
 *                description: "삭제할 공통코드 Id"
 *                example: "공통코드 아이디"
 *    responses:
 *      "200":
 *        description: 정상 수행 - 삭제한 수만큼 메시지 보냄
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "2건 정상적으로 삭제되었습니다."
 *      "400":
 *        description: 유효성 검사 실패
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "데이터가 없습니다."
 *      "500":
 *        description: 서버 에러
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example:
 *                    "서버에서 에러가 발생하였습니다. ( 추후 수정 가능성 있음 )"
 */
router.patch(
  "/detailComCd",
  [
    body("comCd").isArray({ min: 1 }).withMessage("데이터가 없습니다."),
    body("comCd.*.value", "값이 비정상적입니다.")
      .isString()
      .notEmpty()
      .isLength({ min: 1, max: 30 })
      .isComValue()
      .trim(),
    body("comId", "코드 ID가 비정상적입니다.")
      .isString()
      .notEmpty()
      .isComID()
      .trim(),
  ],
  comCdController.deleteDetailComCd
);

export default router;
