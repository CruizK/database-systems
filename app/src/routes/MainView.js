import { Container } from "@mui/material";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import Navbar from "../components/Navbar";
import UserContext from "../userContext";

function MainView() {
  const { role } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {

    if(role == '') {
      history.push('/');
    }
  }, []);

  if(role == '') return <div></div>

  return (
    <div>
      <Navbar />
    <Container maxWidth="sm">
      
    </Container>
    </div>
  )
}

export default MainView;