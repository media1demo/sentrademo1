import { onRequest as __api_webhooks_dodo_ts_onRequest } from "C:\\Users\\tej\\Desktop\\dodoonesecondreport\\sentrademo\\functions\\api\\webhooks\\dodo.ts"
import { onRequest as __api_checkout_session_ts_onRequest } from "C:\\Users\\tej\\Desktop\\dodoonesecondreport\\sentrademo\\functions\\api\\checkout-session.ts"
import { onRequest as __api_login_ts_onRequest } from "C:\\Users\\tej\\Desktop\\dodoonesecondreport\\sentrademo\\functions\\api\\login.ts"
import { onRequest as __api_logout_ts_onRequest } from "C:\\Users\\tej\\Desktop\\dodoonesecondreport\\sentrademo\\functions\\api\\logout.ts"
import { onRequest as __api_me_ts_onRequest } from "C:\\Users\\tej\\Desktop\\dodoonesecondreport\\sentrademo\\functions\\api\\me.ts"
import { onRequest as __api_signup_ts_onRequest } from "C:\\Users\\tej\\Desktop\\dodoonesecondreport\\sentrademo\\functions\\api\\signup.ts"
import { onRequest as __api_verify_payment_ts_onRequest } from "C:\\Users\\tej\\Desktop\\dodoonesecondreport\\sentrademo\\functions\\api\\verify-payment.ts"
import { onRequest as __track_ts_onRequest } from "C:\\Users\\tej\\Desktop\\dodoonesecondreport\\sentrademo\\functions\\track.ts"

export const routes = [
    {
      routePath: "/api/webhooks/dodo",
      mountPath: "/api/webhooks",
      method: "",
      middlewares: [],
      modules: [__api_webhooks_dodo_ts_onRequest],
    },
  {
      routePath: "/api/checkout-session",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_checkout_session_ts_onRequest],
    },
  {
      routePath: "/api/login",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_login_ts_onRequest],
    },
  {
      routePath: "/api/logout",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_logout_ts_onRequest],
    },
  {
      routePath: "/api/me",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_me_ts_onRequest],
    },
  {
      routePath: "/api/signup",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_signup_ts_onRequest],
    },
  {
      routePath: "/api/verify-payment",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_verify_payment_ts_onRequest],
    },
  {
      routePath: "/track",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__track_ts_onRequest],
    },
  ]