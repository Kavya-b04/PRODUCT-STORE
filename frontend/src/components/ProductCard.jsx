import { 
    Box, 
    useColorModeValue, 
    Image, 
    Heading, 
    Text, 
    HStack, 
    IconButton, 
    useToast, 
    Modal, 
    ModalOverlay, 
    useDisclosure, 
    ModalBody, 
    ModalHeader, 
    ModalCloseButton, 
    ModalContent, 
    Input, 
    ModalFooter, 
    Button
} from '@chakra-ui/react';

import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
    if (!product) return null;

    const textColor = useColorModeValue("gray.600", "white");
    const bg = useColorModeValue("white", "gray.800");
    
    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // ✅ State for updating product details
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name || "",
        price: product.price || "",  // ✅ Added missing price field
        image: product.image || ""
    });

    // ✅ Handle product deletion
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        toast({
            title: success ? "Success" : "Error",
            description: message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    // ✅ Handle product update
    const handleUpdateProduct = async () => {
        const { success, message } = await updateProduct(product._id, updatedProduct);
        if (success) onClose();
        toast({
            title: success ? "Success" : "Error",
            description: success ? "Product updated successfully" : message,
            status: success ? "success" : "error",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w="full" objectFit="cover" />
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<CiEdit />} colorScheme="blue" onClick={onOpen} />
                    <IconButton icon={<MdDeleteOutline />} colorScheme="red" onClick={() => handleDeleteProduct(product._id)} />
                </HStack>
            </Box>

            {/* ✅ Product Update Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            mb={3}
                        />
                        <Input
                            placeholder="Price"
                            name="price"
                            type="number"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            mb={3}
                        />
                        <Input
                            placeholder="Image URL"
                            name="image"
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>Update</Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;
