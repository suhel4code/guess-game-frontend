import LanguageIcon from "@mui/icons-material/Language";
import Typography from "@mui/material/Typography";

export default function CompanyTitle() {
  return (
    <>
      <LanguageIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Globetrotter
      </Typography>
    </>
  );
}
