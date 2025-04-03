import React from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box w="100vw" > {/* Make sure Box is full width */}
      <Flex
        w="100%"
        h="60px"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        // border="3px solid red" // Debugging border
      >
        {/* Left Side */}
        <Text
          fontSize="24px"
          fontWeight="bold"
          textTransform="uppercase"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Product Store</Link>
        </Text>

        {/* Right Side */}
        <HStack spacing={6}>
          <Link to="/create">
            <Button>
              <FaPlus />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
