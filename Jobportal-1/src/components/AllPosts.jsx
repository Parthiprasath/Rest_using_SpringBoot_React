import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Card,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Search = () => {
  const [post, setPost] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/jobPosts`);
        console.log(response.data); // Ensure response data is as expected
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchInitialPosts();
  }, []);

  return (
    <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" align='center' component="div" sx={{ flexGrow: 1 }}>
              Job Portal
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid item xs={12}>
        {/* Placeholder for layout if needed */}
      </Grid>
      {post.length > 0 ? (
        post.map((p) => (
          <Grid key={p.postId} item xs={12} md={6} lg={4}> {/* Use p.postId */}
            <Card sx={{ padding: "3%", overflow: "hidden", width: "84%" }}>
              <Typography variant="h5" sx={{ fontSize: "2rem", fontWeight: "600" }}>
                {p.postProfile}
              </Typography>
              <Typography sx={{ color: "#585858", marginTop: "2%" }} variant="body1">
                Description: {p.postDesc}
              </Typography>
              <br />
              <br />
              <Typography variant="h6">
                Years of Experience: {p.reqExperience} years
              </Typography>
              <Typography gutterBottom variant="body1">
                Skills:
              </Typography>
              {p.postTechStack && p.postTechStack.length > 0 ? (
                p.postTechStack.map((s, i) => (
                  <Typography variant="body1" gutterBottom key={`${p.postId}-${i}`}> {/* Use p.postId */}
                    {s}{i < p.postTechStack.length - 1 && ', '}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1">No skills listed</Typography>
              )}
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="body1">No posts available</Typography>
      )}
    </Grid>
  );
};

export default Search;




