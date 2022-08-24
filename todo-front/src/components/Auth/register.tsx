import { Formik, Field } from "formik";
import {
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    VStack,
    useToast
} from "@chakra-ui/react";
import { useContext } from "react";
import { register as register_api } from '../../api/api';
import { AuthContext } from "../../providers/auth_provider";

const Register = () => {
    const toast = useToast();
    let { user, authenticate } = useContext(AuthContext);

    const register= async (username: string, password: string, confirmPassword: string) => {
        if(password !== confirmPassword){
            toast({
                title: 'Registration failed',
                description: "password and confirm password should be equal.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            return;
        }
        let person = await register_api(username, password);
        if (person) {
            authenticate(person);
            return;
        }
        user = null;
    };

    return (
        <Formik
        initialValues={{
            username: "",
                password: "",
                confirmPassword: "",
        }}
        onSubmit={(values) => {
            register(values.username, values.password, values.confirmPassword);
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
        validate={(value : string) => {
            let error;
            if (value.length < 5) {
                error = "Password must contain at least 6 characters";
            }

            return error;
        }}
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
    </FormControl>
    <FormControl isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
        <Field
        as={Input}
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        variant="filled"
        validate={(value : string) => {
            let error;

            if (value.length < 5) {
                error = "Password must contain at least 5 characters";
            }

            return error;
        }}
        />
        <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
    </FormControl>
    <Button type="submit" colorScheme="purple" width="full">
        Register
    </Button>
</VStack>
                </form>
    )}
</Formik>
      );
}


export default Register;
