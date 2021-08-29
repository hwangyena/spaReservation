import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { initializeApollo } from "src/apis/client";
import { VARIABLES } from "src/common";

/** apollo초기화, cookie삭제 후 로그인페이지로 이동 */
export default function useLogout() {
  const router = useRouter();
  const client = initializeApollo();
  const onLogout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      client.resetStore().then(async () => {
        Cookies.remove(VARIABLES.ACCESS_TOKEN);
        Cookies.remove(VARIABLES.REFRESH_TOKEN);
        await router.push("/sign");
      });
    }
  };

  return [onLogout];
}
