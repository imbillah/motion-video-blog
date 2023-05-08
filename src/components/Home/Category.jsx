import React, { createElement } from "react";
import { IoGameController, IoMusicalNote } from "react-icons/io5";
import { FaSmileWink, FaFilm } from "react-icons/fa";
import { GiAngelOutfit } from "react-icons/gi";
import { MdEmojiNature } from "react-icons/md";
import { Link } from "react-router-dom";
import { Box, Tooltip } from "@chakra-ui/react";
const Category = ({ icon, label }) => {
  const renderIcon = (iconName) => {
    const IconComponent = eval(iconName);
    return createElement(IconComponent);
  };
  return (
    <Box color={"red"} cursor={"pointer"}>
      <Tooltip
        hasArrow
        label={label}
        bg={"red.500"}
        closeDelay={250}
        arrowSize={5}
        placement="right"
      >
        <Box fontSize={25}>{renderIcon(icon)}</Box>
      </Tooltip>
    </Box>
  );
};

export default Category;
