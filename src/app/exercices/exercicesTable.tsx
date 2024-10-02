"use client"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];
type numberedData={
    key: number;
    name: string;
    musclesTargeted: string;
    muscleGroup: string;
    equipment: string;
}[]

export default function ExercicesTable({columns, numberedData}: {columns: {key: string, label: string}[], numberedData: numberedData}) {
  return (
    <Table color={"default"}
    selectionMode="single" 
    defaultSelectedKeys={["2"]} 
    aria-label="Example static collection table"
     className="w-1/2 mx-auto h-[90vh] overflow-x-hidden"
     layout="fixed"
     radius="sm"
     isStriped={true}
     isHeaderSticky={true}
     shadow="lg"
     >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={numberedData}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}