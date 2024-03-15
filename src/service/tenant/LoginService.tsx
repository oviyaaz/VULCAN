import {useFormik} from "formik";
import * as yup from "yup";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import {AlchemyResponse, SERVER_URL} from "@/service/ServerDetail";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastMessage from "../ErrorToast/ToastMessage";

export function LoginService(props: { router: AppRouterInstance }) {

    const validationSchema = yup.object().shape({
        username: yup.string().required("Enter Username"),
        password: yup.string().required("Enter Password"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            loginButtonHandler().then((r) => r);
        },
    });

    const loginButtonHandler = async () => {
        let request = {
            username: formik.values.username,
            password: formik.values.password,
        };

        let response: AlchemyResponse = await postLoginRequest(request);

        if (response.success) {
            localStorage.setItem("user", JSON.stringify(response.payload));
            props.router.push("/vulcan/workspace");
        } else {
            ToastMessage(response.errorMsg, "error")
        }

    };

    async function postLoginRequest(body: LoginRequest): Promise<any> {
        return fetch(SERVER_URL + "auth/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(response => {
            let jsonBody: Promise<AlchemyResponse> = response.json();
            return jsonBody
        });
    }

    return (<div
        style={{
            backgroundImage: `url('https://intics.ai/wp-content/uploads/2023/06/1920-LP.webp')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
        }}
    >
        <div
            style={{
                display: "flex",
                width: "50vw",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                style={{paddingTop: "1%", marginTop: "14%"}}
            >
                <img
                    src={"/intics-logo.webp"}
                    alt="logo login"
                    style={{width: "50%", height: "20%", marginBottom: "1%", marginTop: "20%"}}
                />

                <Grid md={6}>
                    <Typography sx={{marginBottom: "2%", color: "white", marginTop: "5%"}}>
                        Username
                    </Typography>
                    <TextField
                        sx={{
                            width: "20vw",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#FFA500",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#FFA500",
                                },
                            },
                        }}
                        size="small"
                        variant="outlined"
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}

                    />
                    <p
                        className={
                            formik.touched.username && formik.errors.username
                                ? "displayBlock"
                                : "displayNone"
                        }
                        style={{marginTop: "7%"}}
                    >
                        {formik.errors.username}
                    </p>
                </Grid>
                <Grid md={6}>
                    <Typography sx={{marginBottom: "2%", color: "white", marginTop: "7%"}}>
                        Password
                    </Typography>
                    <TextField
                        sx={{
                            width: "20vw",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "white",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#FFA500",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#FFA500",
                                },
                            },
                        }}
                        size="small"
                        variant="outlined"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                    />
                    <p
                        className={
                            formik.touched.password && formik.errors.password
                                ? "displayBlock"
                                : "displayNone"
                        }
                        style={{margin: "3%"}}
                    >
                        {formik.errors.password}
                    </p>
                </Grid>
                <Grid sx={{
                    marginTop: "3%", width: "100%",
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#FFA500",
                            borderRadius: "25px",
                            color: "black",
                            height: "45px",
                            marginTop: "7%",
                        }}
                    >
                        Login
                    </Button>
                </Grid>
            </form>
        </div>
        <ToastContainer/>
    </div>);

}

