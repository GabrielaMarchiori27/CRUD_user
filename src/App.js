import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Icon,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { FaUsers, FaHeart } from 'react-icons/fa';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Alert from './components/Alert';
import { userService } from './services/userService';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
  const toast = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    toast({
      title: type === 'success' ? 'Sucesso' : 'Erro',
      description: message,
      status: type === 'danger' ? 'error' : type,
      duration: 4000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const hideAlert = () => {
    setAlert({ show: false, message: '', type: 'success' });
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        showAlert('Erro ao carregar usuários', 'error');
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      showAlert('Erro ao conectar com o servidor', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const response = await userService.createUser(userData);
      if (response.success) {
        showAlert(response.message, 'success');
        await loadUsers();
      } else {
        showAlert(response.message, 'error');
      }
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const response = await userService.updateUser(editingUser.id, userData);
      if (response.success) {
        showAlert(response.message, 'success');
        setIsEditing(false);
        setEditingUser(null);
        await loadUsers();
      } else {
        showAlert(response.message, 'error');
      }
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditing(true);
    // Scroll suave para o formulário
    setTimeout(() => {
      document.getElementById('user-form')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await userService.deleteUser(userId);
      if (response.success) {
        showAlert(response.message, 'success');
        // Se estava editando este usuário, cancelar edição
        if (isEditing && editingUser && editingUser.id === userId) {
          handleCancelEdit();
        }
        await loadUsers();
      } else {
        showAlert(response.message, 'error');
      }
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  const handleRefresh = () => {
    loadUsers();
  };

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading 
              size="2xl" 
              color="white" 
              textShadow="2px 2px 4px rgba(0,0,0,0.3)"
              display="flex"
              alignItems="center"
              gap={4}
              justifyContent="center"
            >
              <Icon as={FaUsers} />
              CRUD de Usuários - Chakra UI
            </Heading>
            <Text color="whiteAlpha.800" fontSize="lg">
              Sistema completo de gerenciamento de usuários com React e Chakra UI
            </Text>
          </VStack>

          {/* Alertas */}
          <Alert
            message={alert.message}
            type={alert.type}
            show={alert.show}
            onClose={hideAlert}
          />

          {/* Formulário */}
          <Box id="user-form" maxW="2xl" mx="auto" w="full">
            <UserForm
              user={editingUser}
              onSubmit={isEditing ? handleUpdateUser : handleCreateUser}
              onCancel={handleCancelEdit}
              isEditing={isEditing}
            />
          </Box>

          {/* Header da Lista com botão de refresh */}
          <Flex justify="space-between" align="center">
            <Heading size="lg" color="white">
              <Icon as={FaUsers} mr={2} />
              Usuários Cadastrados
            </Heading>
            <Button
              leftIcon={<RepeatIcon />}
              onClick={handleRefresh}
              isLoading={loading}
              loadingText="Carregando..."
              colorScheme="whiteAlpha"
              variant="outline"
              color="white"
              borderColor="whiteAlpha.300"
              _hover={{
                bg: 'whiteAlpha.200',
                borderColor: 'whiteAlpha.500',
              }}
            >
              Atualizar
            </Button>
          </Flex>

          {/* Lista de usuários */}
          <UserList
            users={users}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            loading={loading}
          />

          {/* Footer */}
          <VStack spacing={2} pt={8}>
            <HStack spacing={2} color="whiteAlpha.700">
              <Text fontSize="sm">
                Desenvolvido com
              </Text>
              <Icon as={FaHeart} color="red.300" />
              <Text fontSize="sm">
                usando React, Chakra UI, Node.js e Express
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default App;
