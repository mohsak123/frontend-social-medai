import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Divider, useTheme } from "@mui/material";
import { Box, Button } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toggleLike } from "../../redux/actions/postsAction";
import { notifyWarning } from "../../utils/Toastify/Toastify";
import "./Card.css";

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

const PostCardProfile = ({ post, user }) => {
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes.length || 0);
  const [isBouncing, setIsBouncing] = useState(false);
  const userId = localStorage.getItem("user-id-social-media");

  useEffect(() => {
    const likedByUser = post?.likes.includes(userId);
    setIsLiked(likedByUser);
  }, [post, userId]);

  useEffect(() => {
    // Assuming the presence of user-id in localStorage means the user is authenticated
    setIsAuthenticated(!!userId);
  }, [userId]);

  const toggleLikeHandler = (id) => {
    const isconnected = navigator.onLine;

    if (isconnected) {
      if (isAuthenticated) {
        setIsBouncing(true); // تشغيل التأثير
        setLoading(true);

        dispatch(toggleLike(id))
          .then(() => {
            setIsLiked(!isLiked);
            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
          })
          .finally(() => {
            setLoading(false);
            setTimeout(() => setIsBouncing(false), 300); // إيقاف التأثير بعد 300 مللي ثانية
          });
      } else {
        notifyWarning("You are not authenticated");
      }
    } else {
      notifyWarning("You are not connected to internet");
    }
  };

  return (
    <Card
      sx={{
        width: { xs: "100%", lg: "70%" },
        mt: 1,
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={user?.profilePhoto}
          >
            {user.username.toUpperCase().substring(0, 1)}
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
            {user?.username}
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
        {likeCount > 0 ? (
          <Typography
            sx={{
              fontWeight: "600",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            }}
          >
            {likeCount} likes
          </Typography>
        ) : null}
        <Typography
          variant="p"
          component="p"
          sx={{
            fontSize: "24px",
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
            WebkitLineClamp: post?.postPhoto !== "" ? 2 : 5,
            ml: 1,
          }}
        >
          {post?.description}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 1,
        }}
      >
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => toggleLikeHandler(post?.id)}
            disabled={loading}
          >
            <FavoriteIcon
              sx={{
                color: isLiked ? (loading ? "#ef5350" : "red") : null,
                animation: isBouncing ? "likeBounce 0.3s ease" : null,
              }}
            />
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

export default PostCardProfile;
