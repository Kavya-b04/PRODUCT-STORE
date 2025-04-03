import React, { useEffect } from 'react';
import { Link } from "react-router-dom"; 
import { Container, Text, VStack ,SimpleGrid} from '@chakra-ui/react'; // ✅ Import Text properly
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard'
const HomePage = () => {
  const {fetchProducts,products}=useProductStore();
  useEffect(()=>{
    fetchProducts();

  },[fetchProducts]);
  console.log("products",products);
  return (
    <Container maxW='container.xl' py={12}>  {/* ✅ Fixed formatting */}
      <VStack spacing={8}>
        <Text
          fontSize={"30px"}  // ✅ Fixed typo (fontSize instead of fontsize)
          fontWeight={"bold"} // ✅ Fixed typo (fontWeight instead of fontweight)
          bgGradient={"linear(to-r, cyan.400, blue.500)"} // ✅ Fixed missing parenthesis
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
         columns={{
          base:1,
          md:2,
          lg:3
         }}
         spacing={10}
         w={"full"}
        >
        {products.map((product)=>(
          <ProductCard key={product._id} product={product}/>
        ))}

        </SimpleGrid>

       {products.length === 0 && (
        <Text fontSize="xl" textAlign={"center"} fontWeight="bold" color="gray.500"> {/* ✅ Fixed fontSize */}
        No products found{" "}
        <Link to={"/create"}>
          <Text as="span" color="blue.500" _hover={{ textDecoration: "underline" }}>
            Create a product
          </Text>
        </Link>
      </Text>
       )}
        

      </VStack>
    </Container>
  );
};

export default HomePage;
