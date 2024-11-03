import { Box } from "@mui/material";
import React, { useEffect } from "react";
import PostCard from "../../components/Card/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/actions/postsAction";
import Loader from "../../utils/Loader/Loader";

const Home = ({ drawerWidth }) => {
  // console.log(drawerWidth);

  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Box
      sx={{
        ml: { xs: 0, md: `${drawerWidth}px` },
        mt: { xs: "56px", sm: "64px" },
        py: 3,
        pl: 2,
        pr: 2,
        minHeight: {
          xs: "calc(100vh - 56px - 56px)",
          sm: "calc(100vh - 60px - 64px)",
        },
      }}
    >
      {loading === true ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: {
              xs: "calc(100vh - 160px)",
              sm: "calc(100vh - 172px)",
            },
          }}
        >
          <Loader />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {posts?.map((post, index) => (
            <PostCard key={index} post={post} index={index} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Home;
