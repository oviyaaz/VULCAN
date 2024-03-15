import {useFormik} from "formik";
import * as yup from "yup";
import {AlchemyResponse, SERVER_URL} from "@/service/ServerDetail";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context";
import ToastMessage from "../ErrorToast/ToastMessage";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function LandingService(props: { router: AppRouterInstance }) {
    const validationSchema = yup.object().shape({
        name: yup.string().required("Enter Name"),
        company: yup.string().required("Enter Company Name"),
        email: yup.string().required("Enter Email"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            company: "",
            email: "",
            phoneNumber: "",
            comments: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            return fetch(SERVER_URL + "auth/lead", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    let jsonBody: Promise<AlchemyResponse> = response.json();
                    return jsonBody.then((value) => {
                        if (value.success) {
                            props.router.push("/vulcan/login");
                        } else {
                            ToastMessage(value.errorMsg, "error")
                        }
                    });
                } else {
                    //Toast msg
                    // return {};
                    // ToastMessage(response.errorMsg,"")
                }
            }); //TODO handle exception
        },
    });

    const handleChange = (e: any, str: string) => {
        let inputValue = e.target.value;
        const regex = /^[A-Za-z]+$/;
        const regexNum = /^\d{0,10}$/;
        if (str === "phoneNumber") {
            if (regexNum.test(inputValue)) {
                formik.setFieldValue("phoneNumber", inputValue);
            } else if (inputValue == "") {
                formik.setFieldValue("phoneNumber", "");
            }
        } else if (str == "name") {
            if (regex.test(inputValue)) {
                formik.setFieldValue("name", inputValue);
            } else if (inputValue == "") {
                formik.setFieldValue("name", "");
            }
        }
    };

    return (
        <div
            style={{
                // backgroundImage: `url(${getImageBasedOnResolution()})`,
                backgroundImage: `url('https://intics.ai/wp-content/uploads/2023/06/1920-LP.webp')`,
                // backgroundImage: `url(${require('./landingbg.png')})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
            }}
        >
            <div style={{width: "50vw", padding: "2% 0 0 2%"}}>
                <img
                    className="logo__login"
                    src={"/intics-logo.webp"}
                    alt="logo login"
                    style={{width: "20%", height: "30%", marginTop: "4%"}}
                />
                <Typography
                    sx={{fontWeight: "bold", fontSize: "36px", color: "white"}}
                >
                    Effortlessly Transform Your Document Processing with Intelligent
                    Automation
                </Typography>
                <Typography sx={{fontSize: "24px", color: "white"}}>
                    Reduce Manual Data Entry by 80%
                </Typography>
                <form
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                    style={{paddingTop: "1%"}}
                >
                    <Grid
                        md={12}
                        sx={{
                            width: "90%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: "2%",
                        }}
                    >
                        <Grid md={6}>
                            <Typography sx={{marginBottom: "5%", color: "white"}}>
                                Your Name*
                            </Typography>
                            <TextField
                                className="input__field"
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
                                name="name"
                                value={formik.values.name}
                                onChange={(e) => handleChange(e, "name")}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                    style: {
                                        color: "white",
                                    },
                                }}
                            />
                            <p
                                className={
                                    formik.touched.name && formik.errors.name
                                        ? "displayBlock"
                                        : "displayNone"
                                }
                                style={{margin: 0}}
                            >
                                {formik.errors.name}
                            </p>
                        </Grid>
                        <Grid md={6}>
                            <Typography sx={{marginBottom: "5%", color: "white"}}>
                                Company Name*
                            </Typography>
                            <TextField
                                className="input__field"
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
                                name="company"
                                value={formik.values.company}
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
                                    formik.touched.company && formik.errors.company
                                        ? "displayBlock"
                                        : "displayNone"
                                }
                                style={{margin: 0}}
                            >
                                {formik.errors.company}
                            </p>
                        </Grid>
                    </Grid>
                    <Grid
                        md={12}
                        sx={{
                            width: "90%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: "2%",
                        }}
                    >
                        <Grid md={6}>
                            <Typography sx={{marginBottom: "5%", color: "white"}}>
                                Email*
                            </Typography>
                            <TextField
                                className="input__field"
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
                                value={formik.values.email}
                                name="email"
                                type="email"
                                // onChange={(e) => handleChange(e,"email")}
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
                                    formik.touched.email && formik.errors.email
                                        ? "displayBlock"
                                        : "displayNone"
                                }
                                style={{margin: 0}}
                            >
                                {formik.errors.email}
                            </p>
                        </Grid>
                        <Grid md={6}>
                            <Typography sx={{marginBottom: "5%", color: "white"}}>
                                Password
                            </Typography>
                            <TextField
                                className="input__field"
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
                        </Grid>
                    </Grid>
                    <Grid
                        md={12}
                        sx={{
                            width: "90%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: "2%",
                        }}
                    >
                        <Grid md={6}>
                            <Typography sx={{marginBottom: "5%", color: "white"}}>
                                Phone Number
                            </Typography>
                            <TextField
                                className="input__field"
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
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={(e) => handleChange(e, "phoneNumber")}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                    style: {
                                        color: "white",
                                    },
                                }}
                            />
                        </Grid>
                        <Grid md={6}>
                            <Typography sx={{marginBottom: "5%", color: "white"}}>
                                Comments
                            </Typography>
                            <TextField
                                className="input__field"
                                multiline
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
                                name="comments"
                                value={formik.values.comments}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                    style: {
                                        color: "white",
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid md={12} sx={{
                        width: "90%",
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
                                marginTop: "5%",
                                height: "45px",
                            }}
                        >
                            Let's Talk
                        </Button>
                    </Grid>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}
