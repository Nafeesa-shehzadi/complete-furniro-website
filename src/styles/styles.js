import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  footerContainer: {
    color: theme.palette.common.black,
    padding: theme.spacing(4, 10),
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    backgroundColor: "#f5f5f5",
    minHeight: "250px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      flex: "1 1 100%",
    },
  },
  footerTitle: {
    fontSize: "17px",
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  footerLink: {
    color: theme.palette.common.black,
    marginBottom: theme.spacing(1),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    fontFamily: "poppins",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left",
    fontWeight: "bold",
  },
  newsletterInput: {
    marginBottom: theme.spacing(1),
    width: "70%",
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.common.black,
    },
  },
  footerButton: {
    paddingTop: "3rem",
    paddingRight: "5rem",
    textDecoration: "underline",
    "&:hover": {
      textDecoration: "underline",
    },
    fontFamily: "poppins",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left",
    fontWeight: "bold",
  },
  divider: {
    width: "100%",
    margin: theme.spacing(2, 0),
  },
  copyright: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
}));

export default useStyles;
