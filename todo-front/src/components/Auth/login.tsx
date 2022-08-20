import { Formik, Field } from "formik";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack
} from "@chakra-ui/react";
import { login as login_api } from '../../api/api';
import { useQuery } from "react-query";
import { AuthContext } from "../../providers/auth_provider";
import { useContext } from "react";

const Login = () => {
    let { user, authenticate } = useContext(AuthContext);
    const login = async (username: string, password: string) => {
        const token = await login_api(username, password);
        if (token) {
            const user1 = { username: username, token: token };
            authenticate(user1);
            return;
        }
        user = null;
    };

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
            }}
            onSubmit={(values) => {
                login(values.username, values.password);
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Field
                                as={Input}
                                id="username"
                                name="username"
                                type="text"
                                variant="filled"
                            />
                        </FormControl>
                        <FormControl isInvalid={!!errors.password && touched.password}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Field
                                as={Input}
                                id="password"
                                name="password"
                                type="password"
                                variant="filled"
                                validate={(value: string) => {
                                    let error;

                                    if (value.length < 5) {
                                        error = "Password must contain at least 5 characters";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                        </FormControl>
                        <Button type="submit" colorScheme="purple" width="full">
                            Login
                        </Button>
                    </VStack>
                </form>
            )}
        </Formik>
    );
}

const RememberMe = () => {
    return (
        <Field
            as={Checkbox}
            id="rememberMe"
            name="rememberMe"
            colorScheme="purple"
        >
            Remember me?
        </Field>
    );
}


export default Login;