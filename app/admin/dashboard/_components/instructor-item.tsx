import { Table } from "@chakra-ui/react/table";
import { IInstructor } from "@/types";

const InstructorItem = ({ instructor }: { instructor: IInstructor }) => {
  return (
    <Table.Row key={instructor.id}>
      <Table.Cell>{instructor.firstName}</Table.Cell>
      <Table.Cell>{instructor.lastName}</Table.Cell>
      <Table.Cell>{instructor.role}</Table.Cell>
    </Table.Row>
  );
};

export default InstructorItem;
