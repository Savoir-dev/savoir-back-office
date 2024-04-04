import { useState } from "react";
import { Card, Dialog, Flex, Spinner, Table, Text } from "@radix-ui/themes";
import { useMutation, useQuery } from "react-query";
import { AxiosResponse } from "axios";

import { PageHeader } from "../../components/molecules/pageHeader";
import { User } from "../../services/types/users/users.type";
import { space } from "../../styles/const";
import {
  deleteUserById,
  getAllUsers,
} from "../../services/users/users.services";
import { Button } from "../../components/atoms/button";

const users = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "123456789",
    city: "New York",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    phoneNumber: "987654321",
    city: "Los Angeles",
  },
];

export const UsersApp = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedUser(undefined);
  };

  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
    select: (data: AxiosResponse<User[]>) => data,
  });
  console.log(data);

  const deleteUser = useMutation({
    mutationFn: (id: string | undefined) => {
      return deleteUserById(id);
    },
    onSuccess: () => {
      setSelectedUser(undefined);
      setIsDialogOpen(false);
      setIsDeleteLoading(false);
    },
    onError: () => {
      setIsDeleteLoading(false);
    },
  });

  const onDeleteUser = async (id: string | undefined) => {
    setIsDeleteLoading(true);
    deleteUser.mutate(id);
  };

  return (
    <Dialog.Root open={isDialogOpen}>
      <PageHeader title="Users" />
      <Table.Root variant="ghost">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>First name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>City</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user, index) => (
            <Table.Row key={index}>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.phoneNumber}</Table.Cell>
              <Table.Cell>{user.city}</Table.Cell>
              <Table.Cell>
                <Dialog.Trigger>
                  <Button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDialogOpen(true);
                    }}
                    color="red"
                  >
                    Delete
                  </Button>
                </Dialog.Trigger>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Dialog.Content onPointerDownOutside={closeDialog}>
        <Dialog.Title>Delete user</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this user?
        </Dialog.Description>
        <Card style={{ margin: `${space[4]} 0` }}>
          <Flex justify="between">
            <Flex direction="column">
              <Text size="3" weight="bold">
                Name
              </Text>
              <Text size="3">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </Text>
            </Flex>
            <Flex direction="column">
              <Text size="3" weight="bold">
                Phone number
              </Text>
              <Text size="3">{selectedUser?.phoneNumber}</Text>
            </Flex>
            <Flex direction="column">
              <Text size="3" weight="bold">
                City
              </Text>
              <Text size="3">{selectedUser?.city}</Text>
            </Flex>
          </Flex>
        </Card>
        <Flex gap="2" justify="end" align="center">
          {isDeleteLoading && <Spinner />}
          <Button
            disabled={isDeleteLoading}
            color="red"
            onClick={() => onDeleteUser(selectedUser?.id)}
          >
            Delete
          </Button>
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
