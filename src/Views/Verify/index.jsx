import { useEffect } from "react";
import { Digital } from "react-activity";
import { useHistory, useLocation } from "react-router";
import { toast } from "react-toastify";
import { onVerify } from "../../api";

const Verify = () => {
  const location = useLocation();
  const router = useHistory();
  useEffect(() => {
    if (location?.search) {
      const data = new FormData();
      data.append("code", location.search.slice(6, location?.search?.length));
      const onUserVerify = async () => {
          try {
              let res = await onVerify(data);
              if (res?.data?.statusCode === 1) {
                  toast.success("Successfully Verified");
                  setTimeout(() => {
                        router.push("/");
                    }, 1000);
                } else {
                    toast.warning(res?.data?.message);
                }
            } catch (error) {
                toast.warning(error?.message);
            }
        };
        onUserVerify();
    }
  }, []);
  return (
    <div
      className="d-flex justify-content-center align-items-center mt-5"
      style={{ minHeight: "60vh" }}
    >
      <Digital color="#727981" size={40} animating={true} />
    </div>
  );
};

export default Verify;
