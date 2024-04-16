import { FC, useState } from 'react'
import { Card, Dialog, Flex, Spinner, Table, Text } from '@radix-ui/themes'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosResponse } from 'axios'

import { PageHeader } from '../../components/molecules/pageHeader'
import { User } from '../../services/types/users.type'
import { space } from '../../styles/const'
import {
  deleteUserById,
  getAllUsers,
} from '../../services/routes/users/users.services'
import { Button } from '../../components/atoms/button'

export const UsersApp: FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  const closeDialog = () => {
    setIsDialogOpen(false)
    setSelectedUser(undefined)
  }

  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
    select: (data) => data.data,
  })

  const users = data?.data || []

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (id: string | undefined) => {
      return deleteUserById(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users')

      setSelectedUser(undefined)
      setIsDialogOpen(false)
      setIsDeleteLoading(false)
    },
    onError: () => {
      setIsDeleteLoading(false)
    },
  })

  const onDeleteUser = async (id: string | undefined) => {
    setIsDeleteLoading(true)
    mutate(id)
  }

  return (
    <Dialog.Root open={isDialogOpen}>
      <PageHeader title="Users" />
      <Table.Root variant="ghost">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>First name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Last name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone number</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>City</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((user: User, index: number) => (
            <Table.Row key={index}>
              <Table.Cell>{user.firstName}</Table.Cell>
              <Table.Cell>{user.lastName}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.phoneNumber || '❌'}</Table.Cell>
              <Table.Cell>{user.city || '❌'}</Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => {
                    setSelectedUser(user)
                    setIsDialogOpen(true)
                  }}
                  color="red"
                >
                  Delete
                </Button>
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
                email
              </Text>
              <Text size="3">{selectedUser?.email}</Text>
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
            onClick={() => onDeleteUser(selectedUser?.uid)}
          >
            Delete
          </Button>
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
