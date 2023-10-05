import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Modal,
} from "@mui/material";

const WarehouseDetailsModal = ({ isOpen, onClose, warehouse, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWarehouse, setEditedWarehouse] = useState({ ...warehouse });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Update the warehouse data here (e.g., send a request to update the data)
    setIsEditing(false);
    onEdit(editedWarehouse);
    onClose();
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedWarehouse({ ...warehouse });
    onClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedWarehouse({ ...editedWarehouse, [name]: value });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <Card>
          <CardContent>
            <Typography variant="h6">{editedWarehouse.name}</Typography>
            <Typography variant="body2">
              <b>City:</b> {editedWarehouse.city}
            </Typography>
            <Typography variant="body2">
              <b>Cluster:</b> {editedWarehouse.cluster}
            </Typography>
            <Typography variant="body2">
              <b>Space Available:</b>{" "}
              {isEditing ? (
                <TextField
                  name="space_available"
                  value={editedWarehouse.space_available}
                  onChange={handleInputChange}
                />
              ) : (
                editedWarehouse.space_available
              )}
            </Typography>
            {isEditing ? (
              <div>
                <Button variant="contained" onClick={handleSaveClick}>
                  Save
                </Button>
                <Button variant="contained" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="contained" onClick={handleEditClick}>
                Edit
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
};

export default WarehouseDetailsModal;