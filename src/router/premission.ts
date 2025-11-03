/**
 * @author shihw
 * @date 2024/12/2 15:52
 * @description
 */
import router from "@/router/index";

const whiteList = ["/","/login","/register","/reset"]

router.beforeEach(async (to, from, next) => {
    const path = to.path;

    const login_user = localStorage.getItem("login_user");
    if (login_user!==null && login_user!==undefined) {
        if (to.path === "/login" || to.path === "/register" || to.path === "/" || to.path === "/reset") {
            next({
                path: '/main/index'
            });
        }else {
            next();
        }
    }else{
        if (whiteList.indexOf(path) !== -1) {
            next();
        }else {
            next({
                path: '/login'
            });
        }
    }
})