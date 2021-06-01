import { Formik, Form } from "formik";
import { AiOutlineCheck, AiFillCloseCircle } from "react-icons/ai";
import { useHistory } from "react-router";

import FormikFeild from "../../Components/FormikField";
import FormikButton from "../../Components/FormikButton";
import "./index.css";
import { onLogin } from "../../api";
import { toast } from "react-toastify";
const SignIn = () => {
  const router = useHistory();
  const onSubmitHandler = async (values) => {
    try {
      let res = await onLogin(values);
      if (res?.data?.statusCode === 1) {
        toast.success("SignIn Successfull");
        setTimeout(() => {
          // router.push("/signIn");
        }, 1000);
      }
      else{
        toast.warning(res?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    }
  };
  return (
    <div className="mt-4">
      <div className="container d-flex justify-content-center align-items-center w-full signUp_Wrapper">
        <div className="row d-flex justify-content-center align-items-center w-full">
          <div className="col-md-6">
            <h4 className="semi_bold">Login With Your Ulla Popken account</h4>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = (
                    <div className="d-flex align-items-center mt-1">
                      <AiFillCloseCircle className="mr-1" />
                      Please enter your email address.
                    </div>
                  );
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (!values.password) {
                  errors.password = (
                    <div className="d-flex align-items-center mt-1">
                      <AiFillCloseCircle className="mr-1" />
                      Please enter a password
                    </div>
                  );
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                onSubmitHandler(values);
                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2));
                  // setSubmitting(false);
                }, 400);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <FormikFeild
                    error={errors.email && touched.email}
                    type="email"
                    name="email"
                    label={"Email"}
                  />
                  <FormikFeild
                    error={errors.password && touched.password}
                    type="password"
                    name="password"
                    label={"Password"}
                  />
                  <FormikButton type={"submit"} title={"Login"} />
                </Form>
              )}
            </Formik>
          </div>
          <div className="col-md-6 info_side_wrapper">
            <div className="info_side">
              <h5>Benefits of your Ulla Popken online account</h5>
              <div className="ml-3 pt-3">
                <div className="d-flex align-items-center">
                  <AiOutlineCheck className="mr-2 text-success" />
                  Your order is just a few clicks away
                </div>
                <div className="d-flex align-items-center">
                  <AiOutlineCheck className="mr-2 text-success" />
                  Discounts and special promotions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
