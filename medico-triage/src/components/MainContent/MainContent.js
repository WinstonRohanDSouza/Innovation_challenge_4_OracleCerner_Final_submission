import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import UserForm from "../UserForm/UserForm";
export default function MainContent(props) {
  return (
    <Container style={{ height: "90vh" }}>
      <Box my={2}>
        <UserForm />
      </Box>
    </Container>
  );
}
