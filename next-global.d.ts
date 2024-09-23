interface FormData {
  // Define your form fields here
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}

interface SignupProps {
  onSubmit: SubmitHandler<FormData>;
}

interface LoginProps {
  onSubmit: SubmitHandler<LoginFormData>;
}

interface LoginFormData {
  phone: string;
  password: string;
}

interface UserSearch {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}

interface Chat {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
}
