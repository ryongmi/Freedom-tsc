// 홈페이지 URL
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3050/api"
    : "https://korgeobug.com/api";
// : "http://43.203.13.19:8000/api";

// 트위치 관련
const twitchState = "c3ab8aa609ea11e793ae92361f002671";
export const TWITCH_LOGIN_API = `http://id.twitch.tv/oauth2/authorize?response_type=code&client_id=tymp4f3nwou50k5wgrameksysbthdk&redirect_uri=${BASE_URL}/userState/login&scope=user:read:email&state=${twitchState}`;

// 유저 및 로그인 관련
export const USER_INFO = `${BASE_URL}/userState/userInfo`;
export const LOGOUT = `${BASE_URL}/userState/logout`;
export const MANAGE_USER = `${BASE_URL}/admin/user/manageUser`;
export const MANAGE_WARN_USER = `${BASE_URL}/admin/user/manageWarnUser`;
export const MANAGE_BAN_USER = `${BASE_URL}/admin/user/manageBanUser`;
export const WARN_USER = `${BASE_URL}/admin/user/warnUser`;
export const UN_WARN_USER = `${BASE_URL}/admin/user/unWarnUser`;
export const BAN_USER = `${BASE_URL}/admin/user/banUser`;
export const UN_BAN_USER = `${BASE_URL}/admin/user/unBanUser`;

// 메뉴 관련
export const MENU_INFO = `${BASE_URL}/useInfo/getMenu`;
export const ADMIN_MENU_INFO = `${BASE_URL}/useInfo/getAdminMenu`;
export const MANAGE_MENU = `${BASE_URL}/admin/menu/manageMenu`;
export const DETAIL_MENU = `${BASE_URL}/admin/menu/detailMenu`;

// 말머리 관련
export const BRACKET = `${BASE_URL}/admin/menu/manageBracket`;

// 공통코드 관련
export const MANAGE_COMCD = `${BASE_URL}/admin/com-cd/manageComCd`;
export const DETAIL_COMCD = `${BASE_URL}/admin/com-cd/detailComCd`;

// 권한 관련
export const MANAGE_AUTH = `${BASE_URL}/admin/auth/manageAuth`;
export const MANAGE_AUTH_LEVEL = `${BASE_URL}/admin/auth/manageAuthLevelCondition`;

// 게시글 관련
export const POST = `${BASE_URL}/post`;
export const POST_ALL = `${BASE_URL}/postAll`;
export const POST_EDIT = `${BASE_URL}/post/edit`;
export const POST_CHANGE_NOTICE = `${BASE_URL}/post/changeNotice`;
export const POST_MOVE = `${BASE_URL}/post/movePost`;

// 댓글 관련
export const COMMENT = `${BASE_URL}/comment`;
export const CREATED_COMMENT = `${BASE_URL}/comment/createdComment`;
