import { Formik, Field } from "formik";
import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
    useToast
} from "@chakra-ui/react";
import { login as login_api } from '../../api/api';
import { AuthContext } from "../../providers/auth_provider";
import { useContext } from "react";

const Login = () => {
    const { authenticate } = useContext(AuthContext);
    const toast = useToast();

    const login = async (username: string, password: string) => {
        const person = await login_api(username, password);
        if (person) {
            localStorage.setItem("username", person.username);
            localStorage.setItem("password", person.password);
            localStorage.setItem("id", person.id.toString());
            localStorage.setItem("token", person.token);
            authenticate(person);
            return;
        }
        toast({
            title: 'Wrong Credentials',
            description: "Wrong username or password",
            status: 'error',
            duration: 2000,
            isClosable: true,
        });

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
