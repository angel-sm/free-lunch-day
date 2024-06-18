import styled from "styled-components";
import { Flex } from "../../styled-components/grid";
import useFetch from "../../hooks/useFetch";
import { TitleH1 } from "../../styled-components/titles";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import { IOrder } from "../../interfaces/Orders";
import { getOrders } from "../../services/get-orders";
import { format } from "date-fns";

interface Props {
  refresh: boolean;
}

const Orders: React.FC<Props> = ({ refresh }) => {
  const { data: orders } = useFetch<IOrder[]>(getOrders, refresh);

  const columns = useMemo<MRT_ColumnDef<IOrder>[]>(
    () => [
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
      {
        accessorKey: "recipe",
        header: "Recipe",
        size: 300,
      },
      {
        accessorKey: "createdAt",
        header: "Created at",
        size: 200,
        Cell: ({ cell }) => {
          return (
            <span>
              {format(new Date(cell.getValue() as Date), "dd/MM/yyy hh:mm aa")}
            </span>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Last update",
        size: 200,
        Cell: ({ cell }) => {
          return (
            <span>
              {format(new Date(cell.getValue() as Date), "dd/MM/yyy hh:mm aa")}
            </span>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    enableTopToolbar: false,
    enableColumnOrdering: false,
    columns,
    data: orders ? (orders as IOrder[]) : [],
  });

  return (
    <MainContainer id="orders">
      <ContainerControl direction="column">
        <Flex content="center" items="center">
          <SectionTitle>Orders history</SectionTitle>
        </Flex>
        <MaterialReactTable table={table} />{" "}
      </ContainerControl>
    </MainContainer>
  );
};

const MainContainer = styled(Flex)`
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const ContainerControl = styled(Flex)``;

const SectionTitle = styled(TitleH1)`
  font-size: 3em;
  margin: 1em 0;
`;

export default Orders;
