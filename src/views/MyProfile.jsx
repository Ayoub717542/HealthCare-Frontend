import { useEffect, useState } from "react";
import api from "../service/api";
import { getUserRole } from "../utils/auth";


function MyProfile() {
  
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    api.get("/patients/me").then((response) => {
      setFormData(response.data);
    });
  }, []);

  function handleChange(e) {
    setFormData(
        {...formData,[e.target.name]: e.target.value,});
  }

  function handleSubmit(e) {
    e.preventDefault();
    api.put("/patients/me", formData).then((response) => {
      setFormData(response.data);
      setIsEditing(false);
      alert("Profile updated!");
    });
  }
  return (
    <div className="patients">
      <div className="table-header">
        <h2>My Profile</h2>
        {!isEditing && (
          <button className="add-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <input name="prenom" value={formData.prenom} onChange={handleChange} />

            <label>Last Name</label>
            <input name="nom" value={formData.nom} onChange={handleChange} />

            <label>Email</label>
            <input name="email" value={formData.email} disabled />

            <label>Phone</label>
            <input name="telephone" value={formData.telephone} onChange={handleChange} />

            <label>Date of Birth</label>
            <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} />

            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <div className="profile-view">
        <h2>{formData.nom} {formData.prenom} </h2>
        
        <div className="profile-info">
            <p>
            <strong>First Name: </strong>
            <span>{formData.prenom}</span>
            </p>

            <p>
            <strong>Last Name: </strong>
            <span>{formData.nom}</span>
            </p>

            <p>
            <strong>Email: </strong>
            <span>{formData.email}</span>
            </p>

            <p>
            <strong>Phone: </strong>
            <span>{formData.telephone}</span>
            </p>

            <p>
            <strong>Date of Birth: </strong>
            <span>{formData.dateNaissance}</span>
            </p>
        </div>
</div>
      )}
    </div>
  );
}

export default MyProfile;