import React from "react";
import { IoGameController, IoMusicalNote } from "react-icons/io5";
import { FaSmileWink, FaFilm, FaQq } from "react-icons/fa";
import { GiAngelOutfit } from "react-icons/gi";
import { MdEmojiNature } from "react-icons/md";
import { Link } from "react-router-dom";
import { Box, Tooltip } from "@chakra-ui/react";
const Category = ({ catData }) => {
  const Icon = eval(catData.icon);
  return (
    <Box color={"red"}>
      <Link to={`/category/${catData.name}`}>
        <Tooltip
          hasArrow
          label={catData.name}
          bg={"red.500"}
          closeDelay={250}
          arrowSize={5}
          placement="right"
        >
          <Box>{<Icon fontSize={30} />}</Box>
        </Tooltip>
      </Link>
    </Box>
  );
};

export default Category;
