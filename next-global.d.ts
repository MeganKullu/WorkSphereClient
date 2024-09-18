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