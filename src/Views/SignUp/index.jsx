import { Formik, Form } from "formik";
import { AiOutlineCheck, AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

import FormikFeild from "../../Components/FormikField";
import FormikButton from "../../Components/FormikButton";
import { onRegister } from "../../api";
import "./index.css";

const SignUp = () => {
  const router = useHistory();
  const onSubmitHandler = async (values) => {
    const data = new FormData();
    data.append("user", JSON.stringify(values));
    try {
      let res = await onRegister(data);
      if (res?.data?.statusCode === 1) {
        toast.success(res?.data?.data);
        setTimeout(() => {
          router.push("/signIn");
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
            <h4 className="semi_bold">Create your new Ulla Popken account</h4>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
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
                if (!values.firstName) {
                  errors.firstName = (
                    <div className="d-flex align-items-center mt-1">
                      <AiFillCloseCircle className="mr-1" />
                      Please enter your first name.
                    </div>
                  );
                }
                if (!values.lastName) {
                  errors.lastName = (
                    <div className="d-flex align-items-center mt-1">
                      <AiFillCloseCircle className="mr-1" />
                      Please enter your last name.
                    </div>
                  );
                }
                if (!values.password) {
                  errors.password = (
                    <div className="d-flex align-items-center mt-1">
                      <AiFillCloseCircle className="mr-1" />
                      Please enter a password
                    </div>
                  );
                }

                if (values.password.length < 6) {
                  errors.password = (
                    <div className="d-flex align-items-center mt-1">
                      <AiFillCloseCircle className="mr-1" />
                      Password length should be atleast 6
                    </div>
                  );
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                onSubmitHandler(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <FormikFeild
                    error={errors.firstName && touched.firstName}
                    type="text"
                    name="firstName"
                    label={"First Name"}
                  />
                  <FormikFeild
                    error={errors.lastName && touched.lastName}
                    type="text"
                    name="lastName"
                    label={"Last Name"}
                  />
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
                  <FormikButton type={"submit"} title={"Register"} />
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

export default SignUp;
