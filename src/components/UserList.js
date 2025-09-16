import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Avatar,
  Badge,
  Spinner,
  Center,
  Icon,
  useColorModeValue,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, EmailIcon } from '@chakra-ui/icons';
import { FaUsers, FaBirthdayCake } from 'react-icons/fa';

const UserList = ({ users, onEdit, onDelete, loading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userToDelete, setUserToDelete] = React.useState(null);
  const cancelRef = React.useRef();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  if (loading) {
    return (
      <Card>
        <CardBody>
          <Center py={10}>
            <VStack spacing={4}>
              <Spinner size="xl" color="brand.500" thickness="4px" />
              <Text fontSize="lg" color={textColor}>
                Carregando usuários...
              </Text>
            </VStack>
          </Center>
        </CardBody>
      </Card>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Card>
        <CardBody>
          <Center py={10}>
            <VStack spacing={4}>
              <Icon as={FaUsers} boxSize={16} color="gray.400" />
              <Text fontSize="lg" color={textColor} textAlign="center">
                Nenhum usuário encontrado.
                <br />
                Adicione o primeiro usuário!
              </Text>
            </VStack>
          </Center>
        </CardBody>
      </Card>
    );
  }

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    onOpen();
  };

  const confirmDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete.id);
      setUserToDelete(null);
      onClose();
    }
  };

  return (
    <>
      <Card>
        <CardHeader 
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
          color="white"
          borderTopRadius="xl"
        >
          <Heading size="md" display="flex" alignItems="center" gap={2}>
            <Icon as={FaUsers} />
            Lista de Usuários ({users.length})
          </Heading>
        </CardHeader>
        
        <CardBody>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {users.map((user) => (
              <Card
                key={user.id}
                bg={cardBg}
                shadow="md"
                borderRadius="lg"
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'xl',
                }}
              >
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <HStack spacing={3}>
                      <Avatar
                        name={user.nome}
                        bg="brand.500"
                        color="white"
                        size="md"
                      />
                      <Box flex="1">
                        <Heading size="sm" mb={1}>
                          {user.nome}
                        </Heading>
                        <Badge colorScheme="gray" fontSize="xs">
                          ID: {user.id}
                        </Badge>
                      </Box>
                    </HStack>

                    <VStack spacing={2} align="stretch">
                      <HStack spacing={2}>
                        <Icon as={EmailIcon} color="gray.500" />
                        <Text fontSize="sm" color={textColor}>
                          {user.email}
                        </Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FaBirthdayCake} color="gray.500" />
                        <Text fontSize="sm" color={textColor}>
                          {user.idade} anos
                        </Text>
                      </HStack>
                    </VStack>

                    <HStack spacing={2} pt={2}>
                      <Button
                        size="sm"
                        colorScheme="orange"
                        leftIcon={<EditIcon />}
                        onClick={() => onEdit(user)}
                        flex="1"
                        _hover={{
                          transform: 'translateY(-1px)',
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        leftIcon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(user)}
                        flex="1"
                        _hover={{
                          transform: 'translateY(-1px)',
                        }}
                      >
                        Excluir
                      </Button>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Usuário
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir o usuário{' '}
              <Text as="span" fontWeight="bold">
                "{userToDelete?.nome}"
              </Text>
              ? Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default UserList;
