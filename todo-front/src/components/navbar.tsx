import { ReactNode, useContext } from 'react';
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AuthContext } from '../providers/auth_provider';
import { FcTodoList } from 'react-icons/fc';


export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, logout } = useContext(AuthContext);

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <FcTodoList size="40"/>
                        <Box fontWeight="bold" fontStyle={'italic'} color="brown">TODO-APP</Box>
                        <Box fontWeight="bold" color="gray.700">hello {user!.username}</Box>
                        <Link
                            px={2}
                            py={1}
                            rounded={'md'}
                            _hover={{
                                textDecoration: 'none',
                                bg: useColorModeValue('blue.200', 'blue.700'),
                            }}
                            href={'https://github.com/krmali/todo-app'}>
                            github
                        </Link>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            colorScheme={'orange'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<CloseIcon />}
                            onClick={() => logout()}
                        >
                            logout
                        </Button>
                    </Flex>
                </Flex>

            </Box>

        </>
    );
}
