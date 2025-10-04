
// import { useState } from "react";

// export default function Validation() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const errors = {};

//     if (formData.name.trim().length < 3) {
//       errors.name = "Nom trop court";
//     }

//     const emailRegex = /\S+@\S+\.\S+/;
//     if (!emailRegex.test(formData.email)) {
//       errors.email = "Email invalide";
//     }

//     if (formData.password.length < 6) {
//       errors.password = "Mot de passe trop court";
//     }

//     setErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       console.log("✅ Formulaire soumis avec succès");
//       // Tu peux ajouter ici une logique d’envoi ou de redirection
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="name"
//         placeholder="Nom"
//         value={formData.name}
//         onChange={handleChange}
//       />
//       {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//       />
//       {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

//       <input
//         type="password"
//         name="password"
//         placeholder="Mot de passe"
//         value={formData.password}
//         onChange={handleChange}
//       />
//       {errors.password && (
//         <span style={{ color: "red" }}>{errors.password}</span>
//       )}

//       <button type="submit">S’inscrire</button>
//     </form>
//   );
// }
