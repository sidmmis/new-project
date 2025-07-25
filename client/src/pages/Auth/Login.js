import React from "react";
import Layout from "./../../components/Layout/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

//dropdown of login as ........
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(role);
      let res;
      if (role == 0)
        res = await axios.post("/api/v1/auth/userlogin", {
          email,
          password,
          role,
        });
      else
        res = await axios.post("/api/v1/auth/adminlogin", {
          email,
          password,
          role,
        });

      //checking email and password
      //if ok then fill the auth with user data and token

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        // Store data in a cookie
        Cookies.set("auth", JSON.stringify(res.data), { expires: 7 });

        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Layout>
        <div className="form2-container">
          <form onSubmit={handleSubmit}>
            <h4 className="title">LOGIN FORM</h4>

            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form2-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email "
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form2-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>

            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Login As</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={role}
                  label="Login As"
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={0}>Student</MenuItem>
                  <MenuItem value={1}>Warden</MenuItem>
                  <MenuItem value={2}>Accountant</MenuItem>
                  <MenuItem value={3}>Manager</MenuItem>
                </Select>
              </FormControl>
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
            {role === 0 && (
              <div className="mb-3">
                <Link to="/forgot-password" className="forgot-btn">
                  Forgot Password ?
                </Link>
              </div>
            )}
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
