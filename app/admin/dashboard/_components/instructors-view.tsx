import { Table } from "@chakra-ui/react/table";
import { useGetAllInstructorQuery } from "@/services/admin/adminApi";
import { IInstructor } from "@/types";
import InstructorItem from "./instructor-item";

const InstructorsView = () => {
  const { data, isLoading } = useGetAllInstructorQuery();

  return (
    <Table.Root size="sm" variant={"outline"} striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data &&
          data.data.map((instructor: IInstructor) => (
            <InstructorItem key={instructor.id} instructor={instructor} />
          ))}
      </Table.Body>
    </Table.Root>
  );
};

export default InstructorsView;
