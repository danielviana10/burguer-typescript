import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TLoginFormValues } from "../components/Form/LoginForm/loginSchema";
import { TRegisterFormValues } from "../components/Form/RegisterForm/registerSchema";
import { api } from "../services/api";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import "react-toastify/dist/ReactToastify.css";

interface IUserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  user: IUser | null;
  userLogin: (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userRegister: (
    formData: TRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  userLogout: () => void;
}

export interface IUser {
  email: string;
  name: string;
  id?: string;
}

interface IUserLoginResponse {
  accessToken: string;
  user: IUser;
}

interface IUserLoginPassword {
  email: string;
  password: string;
}

interface IUserRegisterResponse {
  accessToken: string;
  user: IUser;
}

export interface IAxiosError {
  message: string;
  response?: {
    data: string;
  };
}


export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);


  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    const userId = localStorage.getItem("@USERID");



    const userAutoLogin = async () => {
      try {
        const { data } = await api.get<IUser>(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        navigate("/shop");
      } catch (error) {
        const Ierror = error as IAxiosError;
        console.log(Ierror);
        localStorage.removeItem("@TOKEN");
        localStorage.removeItem("@USERID");
      }
    };

    if (token && userId) {
      userAutoLogin();
    }

  }, []);

  const navigate = useNavigate();


  const userLogin = async (
    formData: TLoginFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
  
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const foundUser = storedUsers.find((user: IUser) => user.email === formData.email);
  
      if (!foundUser) {
        toast.error("Usuário não encontrado!");
      } else if (!bcrypt.compareSync(formData.password, foundUser.password)) {
        toast.error("Email ou senha incorretos!");
      } else {
        localStorage.setItem("@TOKEN", "fakeToken123");
        localStorage.setItem("@USERID", JSON.stringify(foundUser.id));
        setUser(foundUser);
        navigate("/shop");
        toast.success("Login bem-sucedido!");
      }
    } catch (error) {
      toast.error("Erro ao tentar logar!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  


  const userRegister = async (
    formData: TRegisterFormValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
  
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  
      const userExists = storedUsers.some((user: IUser) => user.email === formData.email);
  
      if (userExists) {
        toast.error("Email já cadastrado!");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(formData.password, salt);
  
        const newUser = {
          id: storedUsers.length + 1,
          email: formData.email,
          password: hashedPassword,
        };
  
        storedUsers.push(newUser);
  
        localStorage.setItem("users", JSON.stringify(storedUsers));
        toast.success("Cadastro efetuado com sucesso!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Erro ao tentar cadastrar!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const userLogout = () => {
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, userLogin, userRegister, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
