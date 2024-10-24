interface FormData {
  // Define your form fields here
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  adminCode?: string,
}

interface SignupProps {
  onSubmit: SubmitHandler<FormData>;
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

interface Message {
  fileType: any;
  id?: string;
  senderId: string | null;
  receiverId: string | null;
  content: string;
  sendAt: string;
  cohortId: string | null;
  delivered: boolean;
  read: boolean;
  fileType?: string,
  filePath?: string,
 
}

