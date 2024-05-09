import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, Input, List, ListItem, ListIcon, IconButton, useToast } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex direction="column" gap={4}>
        <Heading mb={6}>Todo App</Heading>
        <Flex as="nav">
          <Button mr={2} onClick={() => {}}>Home</Button>
          {/* Future navigation buttons can be added here */}
        </Flex>
        <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button colorScheme="blue" onClick={addTask}>Add Task</Button>
        <List spacing={3}>
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <ListIcon as={FaCheckCircle} color={task.isCompleted ? 'green.500' : 'gray.300'} onClick={() => toggleTaskCompletion(task.id)} cursor="pointer" />
                <Box as="span" ml={2} textDecoration={task.isCompleted ? 'line-through' : 'none'}>
                  {task.text}
                </Box>
              </Flex>
              <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => deleteTask(task.id)} />
            </ListItem>
          ))}
        </List>
      </Flex>
    </Container>
  );
};

export default Index;