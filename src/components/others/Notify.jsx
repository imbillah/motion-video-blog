import { Alert, AlertTitle } from "@chakra-ui/react";

const Notify = ({ status, icon, text }) => {
  return (
    <Alert status={`${status ? status : "info"}`}>
      {icon}
      <AlertTitle ml={10}>{text}</AlertTitle>
    </Alert>
  );
};

export default Notify;
