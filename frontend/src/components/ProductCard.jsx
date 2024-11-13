import { MdDelete, MdEdit } from "react-icons/md";
import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  IconButton,
  Image,
  Input,
  DialogRoot,
  DialogTrigger,
  DialogCloseTrigger,
  DialogActionTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogFooter,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { toaster } from "../components/ui/toaster";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        title: "Error",
        type: "error",
        description: message,
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        type: "success",
        description: message,
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        type: "error",
        description: message,
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        type: "success",
        description: "Product updated successfully",
        duration: 3000,
        isClosable: true,
      });
    }
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
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack gap={2}>
          <DialogRoot>
            <DialogTrigger asChild>
              <IconButton colorPalette="purple" variant={"subtle"}>
                <MdEdit />
              </IconButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Product</DialogTitle>
                <DialogCloseTrigger />
              </DialogHeader>
              <DialogBody>
                <VStack gap={4}>
                  <Input
                    placeholder="Product Name"
                    name="name"
                    value={updatedProduct.name}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                  <Input
                    placeholder="Image URL"
                    name="image"
                    value={updatedProduct.image}
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        image: e.target.value,
                      })
                    }
                  />
                </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button
                    colorPalette="purple"
                    variant={"subtle"}
                    mr={3}
                    onClick={() =>
                      handleUpdateProduct(product._id, updatedProduct)
                    }
                  >
                    Update
                  </Button>
                </DialogActionTrigger>
                <DialogActionTrigger asChild>
                  <Button colorPalette="red" variant="subtle">
                    Cancel
                  </Button>
                </DialogActionTrigger>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>

          <IconButton
            onClick={() => handleDeleteProduct(product._id)}
            colorPalette="red"
            variant={"subtle"}
          >
            <MdDelete />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};
export default ProductCard;
