import { Table as ChakraTable } from "@chakra-ui/react/table";
import { Heading } from "@chakra-ui/react/heading";

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];

const Table = () => {
  return (
    <>
      <Heading size="2xl">Products</Heading>
      <ChakraTable.Root size="lg" mt={"2"} variant="outline" striped>
        <ChakraTable.Header>
          <ChakraTable.Row>
            <ChakraTable.ColumnHeader>Product</ChakraTable.ColumnHeader>
            <ChakraTable.ColumnHeader>Category</ChakraTable.ColumnHeader>
            <ChakraTable.ColumnHeader textAlign="end">
              Price
            </ChakraTable.ColumnHeader>
          </ChakraTable.Row>
        </ChakraTable.Header>
        <ChakraTable.Body>
          {items.map((item) => (
            <ChakraTable.Row key={item.id}>
              <ChakraTable.Cell fontSize={"2xl"} p={"4"}>
                {item.name}
              </ChakraTable.Cell>
              <ChakraTable.Cell>{item.category}</ChakraTable.Cell>
              <ChakraTable.Cell textAlign="end">{item.price}</ChakraTable.Cell>
            </ChakraTable.Row>
          ))}
        </ChakraTable.Body>
      </ChakraTable.Root>
    </>
  );
};

export default Table;
