import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  VStack,
  HStack,
  FormErrorMessage,
  Icon,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const UserForm = ({ user, onSubmit, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    idade: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (user && isEditing) {
      setFormData({
        nome: user.nome || '',
        email: user.email || '',
        idade: user.idade || ''
      });
    } else {
      setFormData({
        nome: '',
        email: '',
        idade: ''
      });
    }
    setErrors({});
  }, [user, isEditing]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.idade) {
      newErrors.idade = 'Idade é obrigatória';
    } else if (formData.idade < 1 || formData.idade > 120) {
      newErrors.idade = 'Idade deve estar entre 1 e 120 anos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'idade' ? parseInt(value) || '' : value
    }));

    // Limpar erro do campo quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form if creating new user
      if (!isEditing) {
        setFormData({ nome: '', email: '', idade: '' });
      }
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao salvar usuário',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      email: '',
      idade: ''
    });
    setErrors({});
    onCancel();
  };

  return (
    <Card>
      <CardHeader 
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
        color="white"
        borderTopRadius="xl"
      >
        <Heading size="md" display="flex" alignItems="center" gap={2}>
          <Icon as={isEditing ? EditIcon : AddIcon} />
          {isEditing ? 'Editar Usuário' : 'Adicionar Usuário'}
        </Heading>
      </CardHeader>
      
      <CardBody>
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={errors.nome}>
              <FormLabel>Nome</FormLabel>
              <Input
                name="nome"
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="Digite o nome completo"
                variant="filled"
                focusBorderColor="brand.500"
              />
              <FormErrorMessage>{errors.nome}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Digite o email"
                variant="filled"
                focusBorderColor="brand.500"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.idade}>
              <FormLabel>Idade</FormLabel>
              <NumberInput
                min={1}
                max={120}
                value={formData.idade}
                onChange={(value) => handleChange('idade', value)}
              >
                <NumberInputField
                  placeholder="Digite a idade"
                  variant="filled"
                  focusBorderColor="brand.500"
                />
              </NumberInput>
              <FormErrorMessage>{errors.idade}</FormErrorMessage>
            </FormControl>

            <HStack justify="flex-end" spacing={3} pt={4}>
              {isEditing && (
                <Button
                  variant="ghost"
                  leftIcon={<CloseIcon />}
                  onClick={handleCancel}
                  isDisabled={isSubmitting}
                  colorScheme="gray"
                >
                  Cancelar
                </Button>
              )}
              <Button
                type="submit"
                colorScheme="brand"
                leftIcon={isSubmitting ? <Spinner size="sm" /> : <CheckIcon />}
                isLoading={isSubmitting}
                loadingText="Salvando..."
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                {isEditing ? 'Atualizar' : 'Salvar'}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
};

export default UserForm;
