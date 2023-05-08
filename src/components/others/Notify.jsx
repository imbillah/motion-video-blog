import { Alert, AlertTitle } from "@chakra-ui/react";

const Notify = ({ status, icon, text }) => {
  return (
    <Alert
      status={`${status ? status : "info"}`}
      color={"black"}
      borderRadius={"5px"}
    >
      {icon}
      <AlertTitle ml={10}>{text}</AlertTitle>
    </Alert>
  );
};

export default Notify;
