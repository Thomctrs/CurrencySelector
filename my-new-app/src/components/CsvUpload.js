import React, { useState } from 'react';
import axios from 'axios';

const CSVUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Fichier sélectionné :", selectedFile);
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !file.name.endsWith('.csv')) {
      alert('Veuillez sélectionner un fichier CSV');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:8000/api/devise/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploadSuccess();
      alert('CSV uploadé avec succès');
    } catch (error) {
      console.error('Erreur de téléchargement:', error);
      alert(`Échec du téléchargement du CSV : ${error.response?.data || error.message}`);
    }
  };

  return (
    <div className="csv-uploader">
      <h3>Charger un fichier CSV</h3>
      <input 
        type="file" 
        accept=".csv,.xls,.xlsx" 
        onChange={handleFileChange} 
        className="csv-input"
      />
      <button 
        onClick={handleUpload} 
        disabled={!file} 
        className="upload-button"
      >
        Charger
      </button>
    </div>
  );
};

export default CSVUploader;
