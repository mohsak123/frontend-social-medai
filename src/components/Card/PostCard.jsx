import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCard = ({ post, index }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: { xs: "100%", lg: "70%" },
        mt: index !== 0 ? 2 : 0,
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], cursor: "pointer" }}
            aria-label="recipe"
            src={post?.user?.profilePhoto?.url}
            onClick={() => navigate(`/userprofile/${post?.user?.id}`)}
          >
            {post?.user?.username.toUpperCase().substring(0, 1)}
          </Avatar>
        }
        title={
          <Typography
            variant="p"
            component="p"
            sx={{
              fontStyle: "italic",
              fontSize: { xs: "20px", sm: "25px" },
            }}
          >
            {post?.user?.username}
          </Typography>
        }
        subheader={moment(post?.createdAt).fromNow()}
      />
      {post?.postPhoto !== "" ? (
        <div>
          <Divider sx={{ borderColor: "gray" }} variant="middle" />
          <CardMedia
            component="img"
            image={post?.postPhoto}
            alt="Paella dish"
            sx={{
              height: { xs: "auto", sm: "300px" },
              objectFit: "contain",
            }}
          />
          <Divider sx={{ borderColor: "gray" }} variant="middle" />
        </div>
      ) : null}

      <CardContent>
        <Typography
          variant="p"
          component="p"
          sx={{
            fontSize: { xs: "17px", sm: "24px" },
            fontWeight: "500",
            mb: 0.5,
          }}
        >
          {post?.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: post?.postPhoto?.url !== "" ? 2 : 5,
            ml: 1,
          }}
        >
          {post?.description}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 1,
        }}
      >
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <Box>
          <Button
            sx={{
              textTransform: "capitalize",
              color: "white",
              backgroundColor: theme.palette.success.main,
              fontSize: { xs: "14px", sm: "18px" },
              padding: "2px 0px",
              width: { xs: "60px", sm: "80px" },
              "&:hover": {
                backgroundColor: theme.palette.success.dark,
              },
            }}
            onClick={() => navigate(`/post/${post._id}`)}
          >
            More
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default PostCard;
