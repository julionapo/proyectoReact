import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext/UseAuthContext";


import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userForm, setUserForm] = useState({ name: "", password: "" });
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(userForm.name, userForm.password);
    if (success) {
      navigate("/admin/alta-productos");
    } else {
      alert("Credenciales incorrectas");
      setUserForm({ name: "", password: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Login Administrador</h2>
      <div>
        <label htmlFor="name">Usuario:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={userForm.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          name="password"
          value={userForm.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Ingresar</button>
    </form>
  );
};

export default Login;
