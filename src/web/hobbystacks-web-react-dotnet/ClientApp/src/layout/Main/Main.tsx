import { Container } from "@mui/material";
import { ReactNode } from "react";

interface IMainProps {
  children: ReactNode;
}

const Main = (props: IMainProps) => {
  const { children } = props;

  return (
    <Container component="main" sx={{ marginY: 4 }}>
      {children}
    </Container>
  );
};

export default Main;
