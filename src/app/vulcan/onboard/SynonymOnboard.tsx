'use client'

import {
    Autocomplete,
    Button,
    FormControl,
    FormControlLabel,
    Grid,
    InputAdornment,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material"
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"
import { MdClear } from "react-icons/md"
import { TiTick } from "react-icons/ti"
import styles from "@/app/page.module.css";
// import Carousel from "react-material-ui-carousel";
import { getUser } from "@/app/vulcan/workspace/WorkspaceListLayout";
import { CurrentUser } from "../../../service/ServerDetail";
import { addSynonym, getSor, getSot } from "../../../service/onboard/OnboardService";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { SorTypes, SotTypes } from "@/service/model/OnboardingSchema";


const SynonymOnboard = () => {

    const validationSchema = yup.object().shape({
        // username: yup.string().required("Enter Username"),
        // password: yup.string().required("Enter Password"),
    });
    const formik = useFormik({
        initialValues: {
            itemId: "",
            containerId: "",
            truthEntityId: "",
            synonym: "",
            synonymCategory: "",
            priorityIdx: "",
            sor: [],
            sot: [],
            searchedSor: [],
            searchedSot: [],
            selectedSor: {
                itemId: 0,
                containerId: 0,
            },
            selectedSot: {
                documentId: 0,
                truthEntityId: 0,
            }
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            let payload = {
                itemId: formik.values.selectedSor.itemId,
                containerId: formik.values.selectedSor.containerId,
                truthEntityId: formik.values.selectedSot.truthEntityId,
                synonymName: formik.values.synonym,
                synonymCategory: formik.values.synonymCategory,
                priorityIdx: 1
            }
            user && addSynonym(user, payload, formik.values.selectedSot.documentId).then((res) => res)
        },
    });

    const [showClearIcon, setShowClearIcon] = useState("none");
    const [flag, setFlag] = useState(false)
    const [sorSearch, setsorSearch] = useState('')
    const [sotSearch, setsotSearch] = useState('')
    const [user, setUser] = useState<CurrentUser>();
    const [selectedSorValue, setSelectedSorValue] = useState('');
    const [selectedSotValue, setSelectedSotValue] = useState('');
    const [sorOnClickIndex, setSorOnClickIndex] = useState<number>()
    const [sotOnClickIndex, setSotOnClickIndex] = useState<number>()
    const searchHandlerSor = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setsorSearch(event.target.value)
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
        if (event.target.value !== "") {
            let searched = formik.values.sor?.filter((data: SorTypes) => {
                return data.itemName.toLowerCase().includes(event.target.value.toLowerCase(), 0)
            })
            formik.setFieldValue("searchedSor", searched)
        } else {
            formik.setFieldValue("searchedSor", formik.values.sor)
        }
    };
    const searchHandlerSot = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setsotSearch(event.target.value)
        setShowClearIcon(event.target.value === "" ? "none" : "flex");
        if (event.target.value !== "") {
            let searched = formik.values.sot?.filter((data: SotTypes) => {
                return data.truthEntity.toLowerCase().includes(event.target.value.toLowerCase(), 0)
            })
            formik.setFieldValue("searchedSot", searched)
        } else {
            formik.setFieldValue("searchedSot", formik.values.sot)
        }
    };
    const changeHandlerSor = (event: React.ChangeEvent<HTMLInputElement>, asset: SorTypes, index: any) => {

        setSelectedSorValue(event.target.value);
        formik.setFieldValue("selectedSor", asset)
        setSorOnClickIndex(index)
        // const selectedIndex = parseInt(formik.values.selectedSor..split('-')[1]) - 1
        // props.fetchHandler && props.fetchHandler(field[selectedIndex])

    };
    const changeHandlerSot = (event: React.ChangeEvent<HTMLInputElement>, asset: SotTypes, index: any) => {

        setSelectedSotValue(event.target.value);
        formik.setFieldValue("selectedSot", asset)
        setSotOnClickIndex(index)
        // const selectedIndex = parseInt(selectedValue.split('-')[1]) - 1
        // props.fetchHandler && props.fetchHandler(field[selectedIndex])
    };
    const clearSorSearchHandler = (): void => {
        setsorSearch("")
        formik.setFieldValue("searchedSor", formik.values.sor)
    };
    const clearSotSearchHandler = (): void => {
        setsotSearch("")
        formik.setFieldValue("searchedSot", formik.values.sot)
    };
    useEffect(() => {
        const user = getUser();
        setUser(user);
    }, [])
    useEffect(() => {
        if (user) {
            getSor(user).then(value => {
                if (value.success) {
                    let sor: any = value.payload;
                    formik.setFieldValue("sor", sor);
                    formik.setFieldValue("searchedSor", sor)
                }
            })
            getSot(user).then(value => {
                if (value.success) {
                    let sot: any = value.payload;
                    formik.setFieldValue("sot", sot);
                    formik.setFieldValue("searchedSot", sot)
                }
            })
        }
    }, [user])
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };


    return (
        <form
            onSubmit={formik.handleSubmit}
            className={styles.synonymonboard_container}>
            <Grid >
                <Typography sx={{ fontWeight: "700", paddingBottom: "1%" }}>SOR</Typography>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <FormControl>
                        <TextField
                            size="small"
                            variant="outlined"
                            value={sorSearch}
                            autoComplete='off'
                            onChange={searchHandlerSor}
                            placeholder="Search for Itemname"
                            style={{ marginBottom: "20px", backgroundColor: "white" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AiOutlineSearch />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        style={{ display: showClearIcon, cursor: "pointer" }}
                                        onClick={clearSorSearchHandler}
                                    >
                                        <MdClear />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </div>
                {formik.values.searchedSor &&
                    <Carousel
                        responsive={responsive}
                        autoPlay={false}
                        infinite={false}
                        arrows={true}
                        showDots={false}
                        draggable={false}
                        swipeable={true}
                        className={styles.carousel__view}
                    >
                        {
                            formik.values.searchedSor.map((asset: SorTypes, key: any) => {
                                const index = key
                                return (
                                    <RadioGroup
                                        id="1"
                                        value={selectedSorValue}
                                        onChange={(event) => changeHandlerSor(event, asset, index)}
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                    >
                                        <Paper variant="outlined" sx={{
                                            display: "flex",
                                            width: "17vw !important",
                                            height: "20vh",
                                            // margin: "0 2% !important",
                                            borderRadius: "30px 30px 20px 20px",
                                            background: sorOnClickIndex == index ? '#deedff' : '#ffff',
                                            border: sorOnClickIndex == index ? ' 1px solid #80b5f3' : '1px solid rgba(0, 0, 0, 0.12)'
                                        }}>
                                            <FormControlLabel
                                                sx={{ width: "100%", margin: "0 !important", display: "flex", justifyContent: "center" }} // Update this line
                                                value={`option-${index + 1}`}
                                                control={<Radio checkedIcon={<TiTick style={{ border: "1px solid blue", borderRadius: "50%" }} />} />}
                                                label={
                                                    <div >
                                                        <Typography sx={{
                                                            textAlign: "left",
                                                            fontWeight: "900"
                                                        }}>{asset.itemName}</Typography>
                                                        <Typography sx={{
                                                            textAlign: "left",
                                                            fontWeight: "500"
                                                        }}>{"Container: "}{asset.containerName}</Typography>
                                                        <Typography sx={{
                                                            textAlign: "left",
                                                            fontWeight: "500"
                                                        }}>{"Question : "}{asset.questionCount}</Typography>
                                                        <Typography sx={{
                                                            textAlign: "left",
                                                            fontWeight: "500"
                                                        }}>{"Synonym : "}{asset.synonymCount}</Typography>
                                                    </div>
                                                }
                                            />
                                        </Paper>
                                    </RadioGroup>
                                )
                            })
                        }
                    </Carousel>
                }
            </Grid>
            <Grid>
                <Typography sx={{ fontWeight: "700", paddingBottom: "1%", paddingTop: "1%" }}>SOT</Typography>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <FormControl>
                        <TextField
                            size="small"
                            variant="outlined"
                            value={sotSearch}
                            autoComplete='off'
                            onChange={searchHandlerSot}
                            placeholder="Search for TruthEntity"
                            style={{ marginBottom: "20px", backgroundColor: "white" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AiOutlineSearch />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment
                                        position="end"
                                        style={{ display: showClearIcon, cursor: "pointer" }}
                                        onClick={clearSotSearchHandler}
                                    >
                                        <MdClear />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                </div>
                {formik.values.searchedSot &&
                    <Carousel
                        responsive={responsive}
                        autoPlay={false}
                        infinite={true}
                        arrows={true}
                        showDots={false}
                        draggable={false}
                        swipeable={true}
                    >
                        {
                            formik.values.searchedSot.map((asset: any, key: any) => {
                                const index = key
                                return (
                                    <RadioGroup
                                        id="2"
                                        value={selectedSotValue}

                                        onChange={(event) => changeHandlerSot(event, asset, index)}
                                        sx={{ display: 'flex', alignItems: 'center' }}
                                    >

                                        <Paper variant="outlined" sx={{
                                            display: "flex",
                                            width: "17vw !important",
                                            height: "20vh",
                                            margin: "0 2% !important",
                                            borderRadius: "30px 30px 20px 20px",
                                            background: sotOnClickIndex == index ? '#deedff' : '#ffff',
                                            border: sotOnClickIndex == index ? ' 1px solid #80b5f3' : '1px solid rgba(0, 0, 0, 0.12)'
                                        }}>
                                            <FormControlLabel
                                                sx={{ width: "100%", margin: "0 !important", justifyContent: "center" }} // Update this line
                                                value={`option-${index + 1}`}
                                                control={<Radio checkedIcon={<TiTick style={{ border: "1px solid blue", borderRadius: "50%" }} />} />}
                                                label={
                                                    <div>
                                                        <Typography sx={{
                                                            textAlign: "left",
                                                            fontWeight: "900"
                                                        }}>{asset.truthEntity}</Typography>
                                                        <Typography
                                                            sx={{ textAlign: "left" }}>{"Document: "}{asset.documentName}</Typography>
                                                        <Typography
                                                            sx={{ textAlign: "left" }}>{"Question : "}{asset.questionCount}</Typography>
                                                        <Typography
                                                            sx={{ textAlign: "left" }}>{"Synonym : "}{asset.synonymCount}</Typography>
                                                    </div>
                                                }
                                            />
                                        </Paper>
                                    </RadioGroup>
                                )
                            })
                        }
                    </Carousel>
                }
                <Typography sx={{ fontWeight: "700", padding: "2% 0 1% 0" }}>Synonym</Typography>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <TextField
                        label="Name"
                        name="synonym"
                        size="small"
                        value={formik.values.synonym}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputProps={{ sx: { borderRadius: "20px", backgroundColor: "white" } }}
                    />
                    <Autocomplete
                        id="free-solo-with-synonym"
                        autoComplete={false}
                        options={["PRIMARY", "SECONDARY", "LOGO"]}
                        selectOnFocus
                        size='small'
                        clearOnBlur
                        handleHomeEndKeys
                        sx={{ width: "20%", backgroundColor: "white" }}
                        onInputChange={(event, newInputValue) => {
                            formik.setFieldValue("synonymCategory", newInputValue)
                        }}
                        renderInput={(params: any) => (
                            <TextField maxRows={4} {...params} label={"Category"} />
                        )}
                    />
                </div>
                <Grid className={styles.sor_button}>
                    <Button
                        variant="contained"
                        size="small"
                        // disabled={!(synonym.length > 0 && category.length > 0)}
                        sx={{
                            fontSize: "18px",
                            margin: "3% auto",
                            textTransform: "none",
                            width: "28%"
                        }}
                        // onClick={synonymSubmit}
                        type="submit"
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            fontSize: "18px",
                            margin: "3% auto",
                            textTransform: "none",
                            width: "28%"
                        }}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
export default SynonymOnboard;