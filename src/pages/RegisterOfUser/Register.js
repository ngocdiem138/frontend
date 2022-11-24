import * as React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { API_BASE_URL } from "../../utils/constants/url";

/** Presentation */
import ErrorMessage from "../../component/ErrorMessage";
/** Custom Hooks */
import useErrorHandler from "../../utils/custom-hooks/ErrorHandler";
/** Utils */
import {
  apiRequest,
  validateRegisterForm,
  printError,
  removeError,
} from "../../utils/Helpers";
import Editor from "../Home/widgets/Editor";
import SignupHeader from "./SignupHeader";
import axios from "axios";

const Register = (props) => {
  const [userFirstName, setFirstName] = React.useState("");
  const [userLastName, setLastName] = React.useState("");
  const [recruitmentEmail, setRecruitmentEmail] = React.useState("");
  const [educationLevel, setEducationLevel] = React.useState("");
  const [introduction, setIntroduction] = React.useState("");
  const [recruitmentPhone, setRecruitmentPhone] = React.useState("");
  const [userEntity, setUserEntity] = React.useState("Candidate");
  const [loading, setLoading] = React.useState(false);
  const { error, showError } = useErrorHandler(null);
  const isUserEntityCandidate = userEntity === "Candidate" ? true : false;
  const url = userEntity === "Candidate" ? "register-candidate" : "register-employer";
  const navigate = useHistory();

  const updateIntroduction = (value) => {
    setEducationLevel({ introduction: value });
  };

  const registerHandler = async () => {
    setLoading(true);
    removeError();

    try {
      const options = {
        method: "POST",
        url: `${API_BASE_URL}/user/${url}`,
        data: {
          firstname: userFirstName,
          lastname: userLastName,
          recruitmentEmail: recruitmentEmail,
          educationLevel: educationLevel,
          introduction: introduction,
          recruitmentPhone: recruitmentPhone,
          entity: userEntity,
        },
      };

      const data = await axios({
        method: "POST",
        url: `${API_BASE_URL}/user/${url}`,
        data: {
          firstname: userFirstName,
          lastname: userLastName,
          recruitmentEmail: recruitmentEmail,
          educationLevel: educationLevel,
          introduction: introduction,
          recruitmentPhone: recruitmentPhone,
          entity: userEntity,
        },
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.resp === 1) {
            setFirstName("");
            setLastName("");
            setRecruitmentEmail("");
            setEducationLevel("");
            setIntroduction("");
            setRecruitmentPhone("");
            alert(response.data.message);
          } else {
            showError(response.data.message);
          }
        })
        .catch((err) => {
          if (err.response) {
            const { data, status } = err.response;

            if (status === 422) {
              alert("Please correct highlighted erros");
              printError(data);
            }
          }
        });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    if(isUserEntityCandidate) {
      localStorage.setItem("userRole", "CANDIDATE");
    } else {
      localStorage.setItem("userRole", "EMPLOYER");
    }
    navigate.push('/login');
  };

  return (
    <div className="login-container">
      <div className="content-wrapper border mt-5">
        <SignupHeader
          action="Register"
          isUserEntityCandidate={isUserEntityCandidate}
          setUserEntity={setUserEntity}
        />

        <div className="login-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if(isUserEntityCandidate){
                if (
                  validateRegisterForm(
                    userFirstName,
                    userLastName,
                    "candidate",
                    "candidate",
                    showError
                  )
                ) {
                  registerHandler();
                }
              } else {
                if (
                  validateRegisterForm(
                    userFirstName,
                    userLastName,
                    recruitmentEmail,
                    recruitmentPhone,
                    showError
                  )
                ) {
                  registerHandler();
                }
              }
            }}
          >
            {error && <ErrorMessage errorMessage={error} />}
            <div className="row my-30">
              <div className="col-lg-6" style={{ "paddingLeft": "0px" }}>
                <div className="form-group m-lg-0 mb-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control p-4"
                    name="first_name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={userFirstName}
                  />
                </div>
              </div>
              <div className="col-lg-6 " style={{ "paddingRight": "0px" }}>
                <div className="form-group m-0">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control  p-4"
                    name="last_name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={userLastName}
                  />
                </div>
              </div>
            </div>
            {isUserEntityCandidate ?
              (
                <>
                  <div className="form-group my-30">
                    <input
                      type="text"
                      name="educationLevel"
                      placeholder="Education Level"
                      className="form-control p-4"
                      onChange={(e) => setEducationLevel(e.target.value)}
                      value={educationLevel}
                    />
                  </div>

                  <div className="form-group my-30">
                    <Editor
                      placeholder="Write about yourself ....."
                      handleChange={() => updateIntroduction || ""}
                      editorHtml={introduction}
                    />
                  </div>
                </>

              ) : (
                <>
                  <div className="form-group my-30">
                    <input
                      type="text"
                      name="recruitmentEmail"
                      placeholder="Recruitment Email"
                      className="form-control p-4"
                      onChange={(e) => setRecruitmentEmail(e.target.value)}
                      value={recruitmentEmail}
                    />
                  </div>
                  <div className="form-group my-30">
                    <input
                      type="text"
                      placeholder="Recruitment Phone"
                      className="form-control  p-4"
                      name="recruitmentPhone"
                      onChange={(e) => setRecruitmentPhone(e.target.value)}
                      value={recruitmentPhone}
                    />
                  </div>
                </>
              )}
            <div className="form-submit text-center mt-30 mb-3">
              <button className="primary submit" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>

            <div className="here text-center">
              Already have an account? Login{" "}
              <Link to="/login">
                <u>here</u>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
