import React from 'react';
import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from '@chakra-ui/react';

const Alert = ({ message, type = 'success', show, onClose, autoClose = true }) => {
  React.useEffect(() => {
    if (show && autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [show, autoClose, onClose]);

  if (!show || !message) {
    return null;
  }

  const getStatus = () => {
    switch (type) {
      case 'danger':
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      case 'success':
      default:
        return 'success';
    }
  };

  return (
    <ChakraAlert 
      status={getStatus()} 
      borderRadius="lg"
      boxShadow="md"
      mb={4}
    >
      <AlertIcon />
      <Box flex="1">
        <AlertDescription>{message}</AlertDescription>
      </Box>
      {onClose && (
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      )}
    </ChakraAlert>
  );
};

export default Alert;
